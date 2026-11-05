import adapter from '@sveltejs/adapter-vercel';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({ adapter: adapter({ runtime: 'nodejs24.x', maxDuration: 60 }) })
	]
});
