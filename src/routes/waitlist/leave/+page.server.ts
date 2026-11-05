import { fail } from '@sveltejs/kit';
import { createHash } from 'node:crypto';
import { database } from '#lib/server/launch/db.js';
import type { Actions } from './$types';
export const load = ({ url }: { url: URL }) => ({
	valid: /^[a-f0-9]{64}$/.test(url.searchParams.get('token') || '')
});
export const actions: Actions = {
	default: async ({ url }) => {
		const token = url.searchParams.get('token') || '';
		if (!/^[a-f0-9]{64}$/.test(token))
			return fail(400, {
				message: 'This link is incomplete. Use the link in your confirmation email or contact us.'
			});
		try {
			const hash = createHash('sha256').update(token).digest('hex');
			await database()`DELETE FROM colearn.waitlist WHERE leave_token_hash=${hash}`;
			return { success: true };
		} catch {
			return fail(503, {
				message: 'Please try again shortly or email lethabomaepa11@gmail.com to leave the list.'
			});
		}
	}
};
