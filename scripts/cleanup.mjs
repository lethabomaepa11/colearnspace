import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { neon } from '@neondatabase/serverless';
const env = { ...parseEnv(readFileSync('.env', 'utf8')), ...process.env };
const sql = neon(env.DATABASE_URL);
await sql`DELETE FROM colearn.rate_limits WHERE expires_at<now()`;
await sql`DELETE FROM colearn.waitlist WHERE created_at<now()-interval '12 months'`;
console.log('Expired abuse limits and waitlist entries removed.');
