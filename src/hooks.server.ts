import { building } from '$app/env';
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { getAuth } from '#lib/server/platform/auth.js';
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	const path = event.url.pathname;
	if (path === '/auth/signup') redirect(303, '/auth/register');
	if (path === '/docs') redirect(303, '/portal');
	if (
		!building &&
		(path.startsWith('/api/auth/') ||
			path.startsWith('/auth/') ||
			path.startsWith('/dashboard') ||
			event.request.headers.has('cookie'))
	) {
		const auth = getAuth();
		if (path.startsWith('/api/auth/')) {
			const headers = new Headers(event.request.headers);
			headers.set('x-colearn-client-ip', event.getClientAddress());
			const request = new Request(event.request, { headers });
			const response = await svelteKitHandler({
				event: { ...event, request },
				resolve,
				auth,
				building
			});
			response.headers.set('Cache-Control', 'private, no-store');
			response.headers.set('X-Content-Type-Options', 'nosniff');
			return response;
		}
		const session = await auth.api.getSession({ headers: event.request.headers });
		event.locals.user = session?.user ?? null;
	}
	if (path.startsWith('/dashboard') && !event.locals.user) redirect(303, '/auth/login');
	const response = await resolve(event);
	if (path.startsWith('/admin') && response.status === 401)
		response.headers.set('WWW-Authenticate', 'Basic realm="CoLearnSpace owner", charset="UTF-8"');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Frame-Options', 'DENY');
	if (
		event.locals.user ||
		path.startsWith('/auth') ||
		path.startsWith('/admin') ||
		path.startsWith('/waitlist') ||
		event.request.method !== 'GET'
	)
		response.headers.set('Cache-Control', 'private, no-store');
	return response;
};
