import { database } from '#lib/server/launch/db.js';
import { userRequired, type Content } from '#lib/server/platform/content.js';
export const load = async (event) => {
	const user = userRequired(event);
	const sql = database();
	const [mine, progress] = await Promise.all([
		sql`SELECT * FROM colearn.content WHERE author_id=${user.id} ORDER BY created_at DESC`,
		sql`SELECT c.*,p.completed FROM colearn.progress p JOIN colearn.content c ON c.id=p.content_id WHERE p.user_id=${user.id} ORDER BY p.updated_at DESC`
	]);
	return { mine: mine as Content[], progress: progress as (Content & { completed: number[] })[] };
};
