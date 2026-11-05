import { error, fail, redirect } from '@sveltejs/kit';
import { randomBytes } from 'node:crypto';
import { database } from '#lib/server/launch/db.js';
import {
	validSection,
	userRequired,
	limited,
	safeLink,
	type Content,
	type Lesson
} from '#lib/server/platform/content.js';
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const section = validSection(event.params.section);
	const slug = event.params.slug;
	if (slug === 'create') {
		userRequired(event);
		return {
			section,
			item: null as Content | null,
			comments: [],
			submissions: [],
			completed: [] as number[],
			voted: false,
			lesson: 0
		};
	}
	const sql = database();
	const rows =
		await sql`SELECT c.*,(SELECT count(*)::int FROM colearn.votes v WHERE v.content_id=c.id) AS votes FROM colearn.content c WHERE c.slug=${slug} AND c.kind=${section}`;
	if (!rows.length) error(404, 'This item does not exist.');
	const item = rows[0] as Content;
	const comments =
		await sql`SELECT d.id,d.body,d.link,d.kind,d.created_at,u.name,d.user_id FROM colearn.discussion d JOIN colearn."user" u ON u.id=d.user_id WHERE content_id=${item.id} ORDER BY d.created_at DESC LIMIT 100`;
	const progress = event.locals.user
		? await sql`SELECT completed FROM colearn.progress WHERE user_id=${event.locals.user.id} AND content_id=${item.id}`
		: [];
	const votes = event.locals.user
		? await sql`SELECT 1 FROM colearn.votes WHERE user_id=${event.locals.user.id} AND content_id=${item.id}`
		: [];
	const lesson = Math.max(
		0,
		Math.min(item.lessons.length - 1, Math.trunc(Number(event.url.searchParams.get('lesson'))) || 0)
	);
	return {
		section,
		item,
		comments: comments.filter((x) => x.kind === 'comment'),
		submissions: comments.filter((x) => x.kind === 'submission'),
		completed: (progress[0]?.completed || []) as number[],
		voted: votes.length > 0,
		lesson
	};
};
async function target(event: Parameters<NonNullable<Actions[string]>>[0]) {
	const section = validSection(event.params.section!);
	const rows =
		await database()`SELECT * FROM colearn.content WHERE slug=${event.params.slug!} AND kind=${section}`;
	if (!rows.length) error(404);
	return rows[0] as Content;
}
export const actions: Actions = {
	create: async (event) => {
		const user = await limited(event);
		const section = validSection(event.params.section);
		if (event.params.slug !== 'create') error(400);
		const data = await event.request.formData();
		const title = String(data.get('title') || '').trim();
		const description = String(data.get('description') || '').trim();
		const body = String(data.get('body') || '').trim();
		const track = String(data.get('track') || 'Web development');
		const level = String(data.get('level') || 'Beginner');
		const link = safeLink(String(data.get('link') || ''));
		if (
			title.length < 3 ||
			title.length > 120 ||
			description.length < 20 ||
			description.length > 400 ||
			body.length < 50 ||
			body.length > 20000 ||
			link === null ||
			!['Web development', 'Data & analytics', 'UI/UX design', 'Other'].includes(track) ||
			!['Beginner', 'Intermediate', 'Advanced'].includes(level)
		)
			return fail(400, {
				message:
					'Check your title, summary (20–400 characters), details (50–20,000 characters), and website link.'
			});
		const lessons: Lesson[] = [];
		if (section === 'courses') {
			for (let i = 0; i < 12; i++) {
				const lessonTitle = String(data.get('lessonTitle' + i) || '').trim();
				const lessonBody = String(data.get('lessonBody' + i) || '').trim();
				const video = String(data.get('lessonVideo' + i) || '').trim();
				if (!lessonTitle && !lessonBody) continue;
				if (
					lessonTitle.length < 3 ||
					lessonTitle.length > 120 ||
					lessonBody.length < 30 ||
					lessonBody.length > 15000
				)
					return fail(400, {
						message:
							'Each lesson needs a title (3–120 characters) and at least 30 characters of useful guidance.'
					});
				if (
					video &&
					!/^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}([?&].*)?$/.test(
						video
					)
				)
					return fail(400, {
						message: 'Use a full YouTube video link, or leave the optional video field empty.'
					});
				lessons.push({ title: lessonTitle, body: lessonBody, video });
			}
			if (!lessons.length)
				return fail(400, { message: 'Add at least one lesson to publish a course.' });
		}
		const slug =
			title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '')
				.slice(0, 65) +
			'-' +
			randomBytes(4).toString('hex');
		await database()`INSERT INTO colearn.content(slug,kind,title,description,body,track,level,author_id,author_name,link,lessons) VALUES (${slug},${section},${title},${description},${body},${track},${level},${user.id},${user.name},${link},${JSON.stringify(lessons)}::jsonb)`;
		redirect(303, '/portal/' + section + '/' + slug);
	},
	comment: async (event) => {
		const user = await limited(event);
		const item = await target(event);
		const form = await event.request.formData();
		const body = String(form.get('body') || '').trim();
		if (body.length < 3 || body.length > 3000)
			return fail(400, { message: 'Write between 3 and 3,000 characters.' });
		await database()`INSERT INTO colearn.discussion(content_id,user_id,body,kind) VALUES (${item.id},${user.id},${body},'comment')`;
		return { message: 'Your feedback has been shared.' };
	},
	submission: async (event) => {
		const user = await limited(event);
		const item = await target(event);
		if (item.kind !== 'challenges') error(400);
		const form = await event.request.formData();
		const body = String(form.get('body') || '').trim();
		const link = safeLink(String(form.get('link') || ''));
		if (body.length < 20 || body.length > 3000 || !link)
			return fail(400, {
				message: 'Add a public project link and explain your approach in 20–3,000 characters.'
			});
		await database()`INSERT INTO colearn.discussion(content_id,user_id,body,kind,link) VALUES (${item.id},${user.id},${body},'submission',${link})`;
		return { message: 'Your submission is live. Nice work!' };
	},
	complete: async (event) => {
		const user = await limited(event);
		const item = await target(event);
		const form = await event.request.formData();
		const index = Number(form.get('lesson'));
		if (
			item.kind !== 'courses' ||
			!Number.isInteger(index) ||
			index < 0 ||
			index >= item.lessons.length
		)
			error(400);
		await database()`INSERT INTO colearn.progress(user_id,content_id,completed) VALUES (${user.id},${item.id},ARRAY[${index}]::integer[]) ON CONFLICT(user_id,content_id) DO UPDATE SET completed=CASE WHEN ${index}=ANY(colearn.progress.completed) THEN array_remove(colearn.progress.completed,${index}) ELSE array_append(colearn.progress.completed,${index}) END,updated_at=now()`;
		return { message: 'Progress saved.' };
	},
	vote: async (event) => {
		const user = await limited(event);
		const item = await target(event);
		const sql = database();
		const deleted =
			await sql`DELETE FROM colearn.votes WHERE user_id=${user.id} AND content_id=${item.id} RETURNING user_id`;
		if (!deleted.length)
			await sql`INSERT INTO colearn.votes(user_id,content_id) VALUES (${user.id},${item.id}) ON CONFLICT DO NOTHING`;
		return { message: deleted.length ? 'Appreciation removed.' : 'Appreciation shared.' };
	},
	remove: async (event) => {
		const user = userRequired(event);
		const item = await target(event);
		if (item.author_id !== user.id) error(403);
		await database()`DELETE FROM colearn.content WHERE id=${item.id} AND author_id=${user.id}`;
		redirect(303, '/portal/' + item.kind);
	},
	removeComment: async (event) => {
		const user = userRequired(event);
		const item = await target(event);
		const form = await event.request.formData();
		const id = String(form.get('id') || '');
		if (!/^[a-f0-9-]{36}$/.test(id)) error(400);
		await database()`DELETE FROM colearn.discussion WHERE id=${id} AND user_id=${user.id} AND content_id=${item.id}`;
		return { message: 'Your post was deleted.' };
	}
};
