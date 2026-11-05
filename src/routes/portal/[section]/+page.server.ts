import { browse, validSection } from '#lib/server/platform/content.js';
export const load = async ({ params, url }) => {
	const section = validSection(params.section);
	const query = (url.searchParams.get('q') || '').slice(0, 100);
	return { section, query, items: await browse(section, query) };
};
