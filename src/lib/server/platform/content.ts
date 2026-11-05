import { database } from '#lib/server/launch/db.js';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
export const kinds = ['courses', 'challenges', 'projects'];
export type Lesson = { title: string; body: string; video?: string };
export type Content = {
	id: string;
	slug: string;
	kind: string;
	title: string;
	description: string;
	body: string;
	track: string;
	level: string;
	author_id: string | null;
	author_name: string;
	link: string;
	lessons: Lesson[];
	created_at: string;
	votes?: number;
};
export function validSection(section: string) {
	if (!kinds.includes(section)) error(404, 'This section does not exist.');
	return section;
}
export function userRequired(event: RequestEvent) {
	if (!event.locals.user) redirect(303, '/auth/login');
	return event.locals.user;
}
export function safeLink(value: string) {
	if (!value.trim()) return '';
	try {
		const url = new URL(value);
		return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
	} catch {
		return null;
	}
}
export async function limited(event: RequestEvent) {
	const user = userRequired(event);
	const rows =
		await database()`INSERT INTO colearn.rate_limits(key,hits,expires_at) VALUES (${`write:${user.id}`},1,now()+interval '1 hour') ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN colearn.rate_limits.expires_at<now() THEN 1 ELSE colearn.rate_limits.hits+1 END,expires_at=CASE WHEN colearn.rate_limits.expires_at<now() THEN now()+interval '1 hour' ELSE colearn.rate_limits.expires_at END RETURNING hits`;
	if (rows[0].hits > 60) error(429, 'Please try again in an hour.');
	return user;
}
export async function browse(kind?: string, search = '') {
	const sql = database();
	const rows =
		await sql`SELECT c.*,(SELECT count(*)::int FROM colearn.votes v WHERE v.content_id=c.id) AS votes FROM colearn.content c WHERE (${kind || ''}='' OR c.kind=${kind || ''}) AND (${search}='' OR c.title ILIKE ${'%' + search + '%'} OR c.description ILIKE ${'%' + search + '%'}) ORDER BY c.created_at DESC LIMIT 60`;
	return rows as Content[];
}
