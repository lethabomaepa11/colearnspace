import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { neon } from '@neondatabase/serverless';
const env = { ...parseEnv(readFileSync('.env', 'utf8')), ...process.env };
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is required');
const sql = neon(env.DATABASE_URL);
const statements = readFileSync('db/001-waitlist.sql', 'utf8')
	.split(';')
	.map((x) => x.trim())
	.filter(Boolean);
for (const statement of statements) await sql.query(statement);
console.log('CoLearnSpace waitlist schema is ready.');
