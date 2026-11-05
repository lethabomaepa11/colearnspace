import { env } from '#lib/server/env.js';
import { database } from '#lib/server/launch/db.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ request }) => {
	if (!env.CRON_SECRET || request.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`)
		return json({ message: 'Unauthorized' }, { status: 401 });
	const sql = database();
	await sql`DELETE FROM colearn.rate_limits WHERE expires_at<now()`;
	await sql`DELETE FROM colearn.waitlist WHERE created_at<now()-interval '12 months'`;
	return json({ ok: true });
};
