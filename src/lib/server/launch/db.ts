import { neon } from '@neondatabase/serverless';
import { env } from '#lib/server/env.js';
export function database() {
	if (!env.DATABASE_URL) throw new Error('Waitlist database is not configured');
	return neon(env.DATABASE_URL);
}
