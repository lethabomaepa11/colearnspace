import { error } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';



export const GET = async({ locals: { supabase } }) =>{
	const origin = 'https://colearnspace.netlify.app';

	const data = {
		projectIds: [],
		courseSlugs: [],
		moduleSlugs: [],
		courseModulePairs: [],
		challengeSlugs: [],
		submissionIds: [],
		challengeSubmissionPairs: [],
		topicIds: [],
		challengeTopicPairs: [],
	};

	const { data: projects, error: projError } = await supabase
		.from('project')
		.select('id')
		.order('created_at', { ascending: false });
	if (projError) return error(500, projError.message);

	const { data: challenges, error: chalError } = await supabase
		.from('challenges')
		.select('slug, challenge_submission(id), challenge_topics(id)')
		.order('created_at', { ascending: false });
	if (chalError) return error(500, chalError.message);

	const { data: courses, error: courseError } = await supabase
		.from('course')
		.select('slug, module(slug)')
		.order('created_at', { ascending: false });
	if (courseError) return error(500, courseError.message);

	data.projectIds = projects?.map((entry) => entry.id);

	courses?.forEach((course) => {
		data.courseSlugs.push(course.slug);
		course?.module?.forEach((module) => {
			data.moduleSlugs.push(module.slug);
			data.courseModulePairs.push([course.slug, module.slug]);
		});
	});

	challenges?.forEach((challenge) => {
		data.challengeSlugs.push(challenge.slug);

		challenge.challenge_submission?.forEach((submission) => {
			data.submissionIds.push(submission.id);
			data.challengeSubmissionPairs.push([challenge.slug, submission.id]);
		});

		challenge.challenge_topics?.forEach((topic) => {
			data.topicIds.push(topic.id);
			data.challengeTopicPairs.push([challenge.slug, topic.id]);
		});
	});

	return await sitemap.response({
		origin,
		paramValues: {
			'/portal/projects/[project_id]': data.projectIds,
			'/portal/courses/[slug]': data.courseSlugs,
			'/portal/courses/[slug]/module/[module_slug]': data.courseModulePairs,
			'/portal/challenges/[challenge_slug]': data.challengeSlugs,
			'/portal/challenges/[challenge_slug]/submissions': data.challengeSlugs,
			'/portal/challenges/[challenge_slug]/submissions/new': data.challengeSlugs,
			'/portal/challenges/[challenge_slug]/submissions/[id]': data.challengeSubmissionPairs,
			'/portal/challenges/[challenge_slug]/community': data.challengeSlugs,
			'/portal/challenges/[challenge_slug]/community/new': data.challengeSlugs,
			'/portal/challenges/[challenge_slug]/community/[topic_id]': data.challengeTopicPairs,
		},
	});
}
