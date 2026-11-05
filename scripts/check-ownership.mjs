import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { neon } from '@neondatabase/serverless';
import assert from 'node:assert/strict';
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:5180';
const env = parseEnv(readFileSync('.env', 'utf8'));
const sql = neon(env.DATABASE_URL);
const browser = await chromium.launch();
const emails = [
	`colearn-owner-${Date.now()}@example.com`,
	`colearn-other-${Date.now()}@example.com`
];
const password = 'QA-' + crypto.randomUUID();
const users = [];
let contentId;
try {
	const contexts = await Promise.all([browser.newContext(), browser.newContext()]);
	for (let i = 0; i < 2; i++) {
		const result = await contexts[i].request.post(origin + '/api/auth/sign-up/email', {
			headers: { Origin: origin },
			data: { email: emails[i], password, name: 'QA security' }
		});
		assert.equal(result.status(), 200);
		const rows = await sql`SELECT id FROM colearn."user" WHERE email=${emails[i]}`;
		users.push(rows[0].id);
	}
	const title = 'QA owner-bound content ' + Date.now();
	const created = await contexts[0].request.post(origin + '/portal/projects/create?/create', {
		headers: { Origin: origin },
		form: {
			title,
			description: 'A disposable project for ownership and account lifecycle verification.',
			body: 'This content is created only for automated access-control testing and is removed immediately after the test completes.',
			track: 'Other',
			level: 'Beginner',
			link: ''
		}
	});
	assert.equal(created.status(), 200);
	const content = await sql`SELECT id,slug FROM colearn.content WHERE author_id=${users[0]}`;
	contentId = content[0].id;
	const target = origin + '/portal/projects/' + content[0].slug;
	assert.equal(
		(
			await contexts[1].request.post(target + '?/remove', { headers: { Origin: origin }, form: {} })
		).status(),
		403
	);
	assert.equal((await sql`SELECT id FROM colearn.content WHERE id=${contentId}`).length, 1);
	const renamed = await contexts[0].request.post(origin + '/api/auth/update-user', {
		headers: { Origin: origin },
		data: { name: 'QA Updated' }
	});
	assert.equal(renamed.status(), 200);
	assert.equal(
		(await sql`SELECT name FROM colearn."user" WHERE id=${users[0]}`)[0].name,
		'QA Updated'
	);
	const denied = await contexts[0].request.post(origin + '/api/auth/delete-user', {
		headers: { Origin: origin },
		data: { password: 'incorrect-password' }
	});
	assert.ok(denied.status() >= 400);
	assert.equal((await sql`SELECT id FROM colearn."user" WHERE id=${users[0]}`).length, 1);
	const removed = await contexts[0].request.post(origin + '/api/auth/delete-user', {
		headers: { Origin: origin },
		data: { password }
	});
	assert.equal(removed.status(), 200);
	assert.equal((await sql`SELECT id FROM colearn."user" WHERE id=${users[0]}`).length, 0);
	const retained =
		await sql`SELECT author_id,author_name FROM colearn.content WHERE id=${contentId}`;
	assert.equal(retained[0].author_id, null);
	assert.equal(retained[0].author_name, 'Deleted member');
	console.log(
		'Cross-account deletion denied; name update and password-confirmed account deletion passed. Public work anonymised.'
	);
} finally {
	if (contentId) await sql`DELETE FROM colearn.content WHERE id=${contentId}`;
	for (const id of users) {
		await sql`DELETE FROM colearn."user" WHERE id=${id}`;
		await sql`DELETE FROM colearn.rate_limits WHERE key=${'write:' + id}`;
	}
	await browser.close();
	console.log('Disposable security test records removed.');
}
