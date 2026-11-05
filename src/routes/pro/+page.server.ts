import { fail } from '@sveltejs/kit';

import { createHash, randomBytes } from 'node:crypto';

import { env } from '#lib/server/env.js';

import { database } from '#lib/server/launch/db.js';

import { validateWaitlist } from '#lib/server/launch/validation.js';

import { sendConfirmation } from '#lib/server/launch/mail.js';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		if (Number(request.headers.get('content-length') || 0) > 12000)
			return fail(413, { message: 'Please keep your submission short.', values: undefined });

		const data = await request.formData();
		data.set('plan', 'pro');

		if (data.get('company')) return { success: true, emailSent: false };

		const validated = validateWaitlist(data);

		if (validated.error) return fail(400, { message: validated.error, values: validated.values });

		const { email, name, track, plan } = validated.values;

		try {
			const sql = database();

			const key = createHash('sha256')
				.update(`${env.RATE_LIMIT_SECRET}:${getClientAddress()}`)
				.digest('hex');

			const limits =
				await sql`INSERT INTO colearn.rate_limits (key,hits,expires_at) VALUES (${key},1,now()+interval '1 hour') ON CONFLICT (key) DO UPDATE SET hits=CASE WHEN colearn.rate_limits.expires_at<now() THEN 1 ELSE colearn.rate_limits.hits+1 END, expires_at=CASE WHEN colearn.rate_limits.expires_at<now() THEN now()+interval '1 hour' ELSE colearn.rate_limits.expires_at END RETURNING hits`;

			if (limits[0].hits > 6)
				return fail(429, {
					message: 'A few too many attempts. Please try again in an hour.',
					values: validated.values
				});

			const token = randomBytes(32).toString('hex');

			const tokenHash = createHash('sha256').update(token).digest('hex');

			const rows =
				await sql`INSERT INTO colearn.waitlist (email,name,track,plan,leave_token_hash) VALUES (${email},${name},${track},${plan},${tokenHash}) ON CONFLICT (email) DO UPDATE SET plan='pro',price_cents=7900,track=EXCLUDED.track,name=EXCLUDED.name,consent_version=EXCLUDED.consent_version,leave_token_hash=EXCLUDED.leave_token_hash WHERE colearn.waitlist.plan<>'pro' RETURNING id`;

			// The same public response avoids disclosing whether an email was already registered.

			if (!rows.length) return { success: true, emailSent: false };

			const sent = await sendConfirmation(email, token);

			if (sent) await sql`UPDATE colearn.waitlist SET email_sent_at=now() WHERE id=${rows[0].id}`;

			return { success: true, emailSent: sent };
		} catch {
			console.error('Waitlist persistence unavailable');

			return fail(503, {
				message:
					'We couldn’t save your place just now. Please try again shortly, or email lethabomaepa11@gmail.com.',
				values: validated.values
			});
		}
	}
};
