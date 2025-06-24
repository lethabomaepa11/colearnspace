import { getCountCommentsForFeature } from "../comments/main";
import { getUpvotesForFeature } from "../upvotes/main";

// lib/server/projects/recalculateRanks.ts
export async function recalculateRanks(supabase) {
	const { data: projects, error } = await supabase
		.from('project')
		.select('id');

	if (error) throw new Error(error.message);

	const scoredProjects = [];

	for (const project of projects) {
		const comments = await getCountCommentsForFeature({ id: project.id, name: "project" }, supabase);
		const upvotes = await getUpvotesForFeature({ id: project.id, name: "project" }, supabase);

		const commentCount = comments.count || 0;
		const upvoteCount = upvotes.data?.length || 0;

		const score = commentCount * 2 + upvoteCount; // random formula
		scoredProjects.push({ id: project.id, commentCount, upvoteCount, score });
	}

	// sort by score descending and assign ranks
	scoredProjects.sort((a, b) => b.score - a.score);
	scoredProjects.forEach((p, index) => {
		p.rank = index + 1;
	});

	// batch update projects
	for (const p of scoredProjects) {
		await supabase.from('project').update({
			rank: p.rank,
			score: p.score,
		}).eq('id', p.id);
	}
}
