import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { neon } from '@neondatabase/serverless';
import { createHash, randomBytes } from 'node:crypto';
import assert from 'node:assert/strict';
const env = parseEnv(readFileSync('.env', 'utf8'));
const sql = neon(env.DATABASE_URL);
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:5180';
const email = `colearn-pro-${Date.now()}@example.com`;
const browser = await chromium.launch();
try {
	const page = await browser.newPage();
	await page.goto(origin + '/pro');
	await page.locator('#email').fill(email);
	await page.locator('input[name=consent]').check();
	await page.getByRole('button', { name: 'Join the Pro waitlist' }).click();
	await page.getByRole('heading', { name: 'You’re on the Pro list.' }).waitFor();
	let rows = await sql`SELECT id,plan,price_cents FROM colearn.waitlist WHERE email=${email}`;
	assert.equal(rows.length, 1);
	assert.equal(rows[0].plan, 'pro');
	assert.equal(rows[0].price_cents, 7900);
	const response = await page.request.post(origin + '/pro', {
		headers: { Origin: origin },
		form: { email, track: 'Web development', plan: 'free', consent: 'on' }
	});
	assert.equal(response.status(), 200);
	rows = await sql`SELECT id FROM colearn.waitlist WHERE email=${email}`;
	assert.equal(rows.length, 1);
	assert.equal((await page.request.get(origin + '/admin')).status(), 401);
	const token = randomBytes(32).toString('hex');
	const hash = createHash('sha256').update(token).digest('hex');
	await sql`UPDATE colearn.waitlist SET leave_token_hash=${hash} WHERE email=${email}`;
	await page.goto(origin + '/waitlist/leave?token=' + token);
	assert.equal((await sql`SELECT id FROM colearn.waitlist WHERE email=${email}`).length, 1);
	await page.getByRole('button', { name: 'Leave the waitlist', exact: true }).click();
	await page.getByRole('heading', { name: 'You’ve left the list.' }).waitFor();
	assert.equal((await sql`SELECT id FROM colearn.waitlist WHERE email=${email}`).length, 0);
	console.log(
		'Pro-only signup, enforced paid plan, duplicate prevention, owner privacy and explicit withdrawal passed.'
	);
} finally {
	await sql`DELETE FROM colearn.waitlist WHERE email=${email}`;
	await browser.close();
}
