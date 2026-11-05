import { browse } from '#lib/server/platform/content.js';
export const load = async () => ({ items: await browse() });
