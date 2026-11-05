import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { spawnSync } from 'node:child_process';
const env = parseEnv(readFileSync('.env', 'utf8'));
for (const [key, value] of Object.entries(env)) {
	if (!value) continue;
	const result = spawnSync(
		'npx.cmd',
		[
			'--yes',
			'vercel@latest',
			'env',
			'add',
			key,
			'--environment',
			'production',
			'--sensitive',
			'--force',
			'--yes',
			'--scope',
			'lethabo-maepas-projects'
		],
		{ shell: true, input: value, encoding: 'utf8' }
	);
	if (result.status !== 0) throw new Error('Could not configure ' + key);
	console.log('Configured ' + key);
}
