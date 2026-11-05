import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:5181';
const browser = await chromium.launch();
try {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto(origin + '/portal');
	await page.evaluate(() => navigator.serviceWorker.ready);
	await page.reload();
	await page.waitForFunction(() => !!navigator.serviceWorker.controller);
	const manifest = await (await page.request.get(origin + '/manifest.json')).json();
	assert.equal(manifest.display, 'standalone');
	assert.equal(manifest.theme_color, '#FC6519');
	assert.ok(manifest.icons.some((icon) => icon.purpose === 'maskable'));
	for (const icon of manifest.icons)
		assert.equal((await page.request.get(origin + icon.src)).status(), 200);
	await page.goto(origin + '/portal/courses/web-foundations');
	await page.getByRole('heading', { name: 'Give your page a useful structure' }).waitFor();
	await page.waitForTimeout(500);
	await context.setOffline(true);
	await page.reload();
	await page.getByRole('heading', { name: 'Give your page a useful structure' }).waitFor();
	console.log(
		'Install manifest, original-logo icons, active service worker and offline lesson reload passed.'
	);
	await page.goto(origin + '/portal/projects/not-cached-qa');
	await page.getByRole('heading', { name: 'A pause, not a full stop.' }).waitFor();
	console.log('Uncached offline navigation shows a clear fallback.');
	await context.setOffline(false);
	await page.goto(origin + '/pro');
	await page.goto(origin + '/auth/login');
	const cached = await page.evaluate(async () => {
		const result = [];
		for (const name of await caches.keys()) {
			const cache = await caches.open(name);
			for (const request of await cache.keys()) result.push(new URL(request.url).pathname);
		}
		return result;
	});
	assert.ok(
		!cached.some(
			(path) =>
				path.startsWith('/auth') ||
				path.startsWith('/dashboard') ||
				path.startsWith('/pro') ||
				path.startsWith('/admin') ||
				path.startsWith('/api') ||
				path.startsWith('/waitlist')
		)
	);
	console.log('Private/account/waitlist/API pages excluded from offline caches.');
} finally {
	await browser.close();
}
