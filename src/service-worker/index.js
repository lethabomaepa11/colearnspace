import { self } from '$app/service-worker';
import { version } from '$app/env';
import { immutable } from '$app/manifest';
const build = immutable.map(({ path }) => new URL(path, self.location.origin).pathname);
const CACHE = 'colearn-pwa-' + version;
const PAGES = 'colearn-public-' + version;
const ASSETS = [
	...build,
	'/offline',
	'/site/branding/colearn-logo.png',
	'/icons/icon-192.png',
	'/icons/icon-512.png',
	'/icons/maskable-512.png'
];
self.addEventListener('install', (event) =>
	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)))
);
self.addEventListener('message', (event) => {
	if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', (event) =>
	event.waitUntil(
		(async () => {
			for (const key of await caches.keys())
				if (
					(key.startsWith('colearn-') || key.startsWith('cache-')) &&
					key !== CACHE &&
					key !== PAGES
				)
					await caches.delete(key);
			await self.clients.claim();
		})()
	)
);
function publicPage(url) {
	return (
		url.pathname === '/' ||
		url.pathname === '/portal' ||
		(/^\/portal\/(courses|challenges|projects)(\/[^/]+)?$/.test(url.pathname) &&
			!url.pathname.endsWith('/create'))
	);
}
self.addEventListener('fetch', (event) => {
	const request = event.request;
	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;
	if (request.method !== 'GET') return;
	if (
		url.pathname.startsWith('/api') ||
		url.pathname.startsWith('/admin') ||
		url.pathname.startsWith('/auth') ||
		url.pathname.startsWith('/dashboard') ||
		url.pathname.startsWith('/pro') ||
		url.pathname.startsWith('/waitlist') ||
		url.pathname.endsWith('/__data.json')
	)
		return;
	if (ASSETS.includes(url.pathname) || url.pathname.startsWith('/_app/immutable/')) {
		event.respondWith(
			(async () => {
				const cache = await caches.open(CACHE);
				const hit = await cache.match(request);
				if (hit) return hit;
				const response = await fetch(request);
				if (response.ok) await cache.put(request, response.clone());
				return response;
			})()
		);
		return;
	}
	if (request.mode === 'navigate')
		event.respondWith(
			(async () => {
				const pages = await caches.open(PAGES);
				try {
					const response = await fetch(request);
					const policy = response.headers.get('cache-control') || '';
					if (response.ok && publicPage(url) && !/(private|no-store)/i.test(policy)) {
						await pages.put(request, response.clone());
						const keys = await pages.keys();
						if (keys.length > 60) await pages.delete(keys[0]);
					}
					return response;
				} catch {
					return (
						(await pages.match(request)) ||
						(await caches.match('/offline')) ||
						new Response('You are offline. Reconnect to continue.', {
							status: 503,
							headers: { 'Content-Type': 'text/plain' }
						})
					);
				}
			})()
		);
});
