import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { database } from '#lib/server/launch/db.js';
import { env } from '#lib/server/env.js';
function createAuth() {
	return betterAuth({
		appName: 'CoLearnSpace',
		baseURL: env.BETTER_AUTH_URL || 'http://127.0.0.1:5174',
		secret: env.BETTER_AUTH_SECRET,
		database: new Pool({
			connectionString: env.DATABASE_URL,
			options: '-c search_path=colearn',
			max: 3,
			connectionTimeoutMillis: 10000
		}),
		advanced: { cookiePrefix: 'colearn', ipAddress: { ipAddressHeaders: ['x-colearn-client-ip'] } },
		user: {
			deleteUser: {
				enabled: true,
				beforeDelete: async (user) => {
					await database()`UPDATE colearn.content SET author_name='Deleted member' WHERE author_id=${user.id}`;
				}
			}
		},
		emailAndPassword: { enabled: true, minPasswordLength: 10, maxPasswordLength: 128 },
		rateLimit: { enabled: true, storage: 'database' }
	});
}

let instance: ReturnType<typeof createAuth> | undefined;
export function getAuth() {
	return (instance ??= createAuth());
}
