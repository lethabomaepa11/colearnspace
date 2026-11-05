import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { betterAuth } from 'better-auth';
import { getMigrations } from 'better-auth/db/migration';
import pg from 'pg';
import { neon } from '@neondatabase/serverless';
const env = parseEnv(readFileSync('.env', 'utf8'));
const pool = new pg.Pool({
	connectionString: env.DATABASE_URL,
	options: '-c search_path=colearn',
	max: 1
});
try {
	const auth = betterAuth({
		database: pool,
		secret: env.BETTER_AUTH_SECRET,
		emailAndPassword: { enabled: true },
		rateLimit: { enabled: true, storage: 'database' }
	});
	const { runMigrations } = await getMigrations(auth.options);
	await runMigrations();
	const sql = neon(env.DATABASE_URL);
	for (const statement of readFileSync('db/002-platform.sql', 'utf8')
		.split(';')
		.map((x) => x.trim())
		.filter(Boolean))
		await sql.query(statement);
	console.log('CoLearnSpace accounts and free platform schema ready.');
} finally {
	await pool.end();
}
