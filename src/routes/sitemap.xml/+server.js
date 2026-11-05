import { database } from '#lib/server/launch/db.js';
export const GET = async () => {
	const items =
		await database()`SELECT kind,slug FROM colearn.content ORDER BY created_at DESC LIMIT 1000`;
	const paths = [
		'/',
		'/portal',
		'/portal/courses',
		'/portal/challenges',
		'/portal/projects',
		'/pro',
		'/privacy',
		...items.map((item) => '/portal/' + item.kind + '/' + item.slug)
	];
	return new Response(
		'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
			paths
				.map((path) => '<url><loc>https://colearn.mosaictalent.co.za' + path + '</loc></url>')
				.join('') +
			'</urlset>',
		{ headers: { 'Content-Type': 'application/xml' } }
	);
};
