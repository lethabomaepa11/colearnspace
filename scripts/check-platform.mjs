import { chromium } from '@playwright/test';
import { readFileSync, mkdirSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { neon } from '@neondatabase/serverless';
import assert from 'node:assert/strict';
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:5180';
const env = parseEnv(readFileSync('.env', 'utf8'));
const sql = neon(env.DATABASE_URL);
const email = `colearn-platform-${Date.now()}@example.com`;
const password = 'QA-' + crypto.randomUUID();
const title = 'QA project ' + Date.now();
const browser = await chromium.launch();
mkdirSync('output', { recursive: true });
let userId;
try {
	const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
	const page = await context.newPage();
	page.setDefaultTimeout(20000);
	const errors = [];
	page.on('pageerror', (e) => errors.push(e.message));
	await page.goto(origin + '/portal');
	await page.getByRole('heading', { name: 'Pick a spark. Make something.' }).waitFor();
	await page.screenshot({ path: 'output/free-discover.png', fullPage: true });
	await page.goto(origin + '/portal/courses');
	assert.equal(await page.locator('.content-card').count(), 3);
	await page.getByRole('link').filter({ hasText: 'Your first useful web page' }).click();
	await page.getByRole('heading', { name: 'Give your page a useful structure' }).waitFor();
	assert.equal(await page.getByRole('button', { name: 'Mark lesson complete' }).count(), 0);
	console.log('Anonymous discovery and full lessons available without waitlist.');
	await page.goto(origin + '/auth/register');
	await page.locator('#name').fill('QA Learner');
	await page.locator('#email').fill(email);
	await page.locator('#password').fill(password);
	await page.locator('input[type=checkbox]').check();
	await page.getByRole('button', { name: 'Create my free account' }).click();
	await page.waitForURL('**/dashboard');
	const users = await sql`SELECT id FROM colearn."user" WHERE email=${email}`;
	assert.equal(users.length, 1);
	userId = users[0].id;
	await page.goto(origin + '/portal/courses/web-foundations');
	await page.getByRole('button', { name: 'Mark lesson complete' }).click();
	await page.getByRole('button', { name: 'Completed · mark unfinished' }).waitFor();
	const progress = await sql`SELECT completed FROM colearn.progress WHERE user_id=${userId}`;
	assert.deepEqual(progress[0].completed, [0]);
	console.log('Signup, session and saved course progress passed.');
	await page.goto(origin + '/portal/projects/create');
	await page.locator('#title').fill(title);
	await page
		.locator('#description')
		.fill('A disposable project created by the automated platform check.');
	await page
		.locator('#body')
		.fill(
			'This is a test project story describing the problem, the approach, and the lessons learned. It will be removed after the test.'
		);
	await page.locator('#link').fill('https://example.com');
	await page.getByRole('button', { name: 'Publish project' }).click();
	await page.getByRole('heading', { name: title, exact: true }).waitFor();
	const projectUrl = page.url();
	await page.locator('#comment').fill('Useful test feedback. This entry will be removed.');
	await page.getByRole('button', { name: 'Post feedback' }).click();
	await page
		.getByText('Useful test feedback. This entry will be removed.', { exact: true })
		.waitFor();
	await page.getByRole('button', { name: 'Appreciate this', exact: true }).click();
	await page.getByRole('button', { name: 'Appreciated', exact: true }).waitFor();
	const anonymous = await browser.newContext();
	const denied = await anonymous.request.post(projectUrl + '?/remove', {
		headers: { Origin: origin },
		form: {}
	});
	assert.ok([200, 303].includes(denied.status()));
	assert.equal((await sql`SELECT id FROM colearn.content WHERE title=${title}`).length, 1);
	await anonymous.close();
	console.log('Project publishing, feedback, appreciation and ownership protection passed.');
	await page.goto(origin + '/portal/challenges/corner-cafe-challenge');
	await page.locator('#submission-link').fill('https://example.com');
	await page
		.locator('#submission-body')
		.fill('This is a disposable challenge submission describing a responsive accessible page.');
	await page.getByRole('button', { name: 'Share my submission' }).click();
	await page
		.getByText(
			'This is a disposable challenge submission describing a responsive accessible page.',
			{ exact: true }
		)
		.waitFor();
	await page.goto(origin + '/portal/courses/create');
	await page.locator('#title').fill('QA course ' + Date.now());
	await page
		.locator('#description')
		.fill('A disposable practical course to verify free course authoring.');
	await page
		.locator('#body')
		.fill(
			'This introduction explains the learning goal, the tools needed, and what a learner will make by the end of the course.'
		);
	await page.locator('#lesson-title-0').fill('A useful first lesson');
	await page
		.locator('#lesson-body-0')
		.fill(
			'Read the problem carefully, write down one small next step, and explain how you will check that it works.'
		);
	await page.getByRole('button', { name: 'Publish course' }).click();
	await page.getByRole('heading', { name: 'A useful first lesson' }).waitFor();
	console.log('Challenge submission and free course publishing passed.');
	await page.goto(origin + '/pro');
	assert.equal(await page.locator('input[name=plan]').inputValue(), 'pro');
	await page.getByRole('heading', { name: 'Interested at R79/month?' }).waitFor();
	await page.screenshot({ path: 'output/pro-only.png', fullPage: true });
	await page.goto(origin + '/dashboard');
	await page.screenshot({ path: 'output/free-dashboard.png', fullPage: true });
	await page.getByRole('button', { name: 'Sign out', exact: true }).click();
	await page.waitForURL('**/portal');
	await page.goto(origin + '/auth/login');
	await page.locator('#email').fill(email);
	await page.locator('#password').fill(password);
	await page.getByRole('button', { name: 'Sign in', exact: true }).click();
	await page.waitForURL('**/dashboard');
	console.log('Pro-only waitlist, sign-out and returning sign-in passed.');
	const mobile = await browser.newPage({
		viewport: { width: 390, height: 844 },
		isMobile: true,
		hasTouch: true
	});
	await mobile.goto(origin + '/portal');
	assert.ok(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
	await mobile.getByRole('button', { name: 'Open navigation' }).click();
	await mobile.getByRole('link', { name: 'Courses', exact: true }).click();
	await mobile.getByRole('heading', { name: 'Learn with direction.' }).waitFor();
	await mobile.screenshot({ path: 'output/free-mobile.png', fullPage: true });
	assert.deepEqual(errors, []);
	console.log('Mobile navigation, layout and client error checks passed.');
} finally {
	if (userId) {
		await sql`DELETE FROM colearn.content WHERE author_id=${userId}`;
		await sql`DELETE FROM colearn."user" WHERE id=${userId}`;
		await sql`DELETE FROM colearn.rate_limits WHERE key=${'write:' + userId}`;
	}
	await browser.close();
	console.log('Disposable test data removed.');
}
