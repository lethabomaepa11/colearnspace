import { error } from '@sveltejs/kit';
import { timingSafeEqual } from 'node:crypto';
import { env } from '#lib/server/env.js';
import { database } from '#lib/server/launch/db.js';
export const load = async ({
	request,
	setHeaders
}: {
	request: Request;
	setHeaders: (headers: Record<string, string>) => void;
}) => {
	setHeaders({ 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' });
	const supplied = request.headers.get('authorization') || '';
	const expected = env.ADMIN_PASSWORD
		? 'Basic ' + Buffer.from('owner:' + env.ADMIN_PASSWORD).toString('base64')
		: '';
	if (
		!expected ||
		Buffer.byteLength(supplied) !== Buffer.byteLength(expected) ||
		!timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
	)
		error(401, 'Owner sign-in required.');
	const sql = database();
	const [totals, plans, tracks] = await Promise.all([
		sql`SELECT count(*)::int AS total,count(*)::int AS pro,count(*) FILTER (WHERE created_at>now()-interval '7 days')::int AS recent FROM colearn.waitlist WHERE plan='pro'`,
		sql`SELECT plan,count(*)::int AS total FROM colearn.waitlist WHERE plan='pro' GROUP BY plan ORDER BY total DESC`,
		sql`SELECT track,count(*)::int AS total FROM colearn.waitlist WHERE plan='pro' GROUP BY track ORDER BY total DESC`
	]);
	return { totals: totals[0], plans, tracks };
};
