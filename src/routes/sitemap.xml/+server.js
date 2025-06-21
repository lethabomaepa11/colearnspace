// src/routes/sitemap.xml/+server.ts

import { getProjects } from '$lib/server/projects/main';

export async function GET() {
	const baseUrl = 'https://colearnspace.netlify.app';

	// Static Routes
	const staticRoutes = [
		'/',
		'/about',
		'/contact',
        '/portal',
        '/portal/search',
		'/portal/projects',
        '/portal/projects/create',
        '/portal/courses',
        '/portal/courses/create',
        '/portal/challenges',
        '/portal/challenges/create',
        '/portal/dashboard',

	];

	const staticUrls = staticRoutes
		.map(
			(path) => `
		<url>
			<loc>${baseUrl}${path}</loc>
			<changefreq>weekly</changefreq>
			<priority>0.8</priority>
		</url>`
		)
		.join('');

	// Dynamic Routes (e.g. Projects)
	const projects = await getProjects(); 
	const dynamicUrls = projects
		.map(
			(p) => `
		<url>
			<loc>${baseUrl}/portal/projects/${p.id}</loc>
			<changefreq>monthly</changefreq>
			<priority>0.6</priority>
		</url>`
		)
		.join('');

	// Combine and Wrap in XML
	const xml = `
<?xml version="1.0" encoding="UTF-8" ?>
<urlset
	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="https://www.w3.org/1999/xhtml"
	xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
	${staticUrls}
	${dynamicUrls}
</urlset>
`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
