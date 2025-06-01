<script>
	import { theme } from '$lib/states.svelte';

	let { content, colors } = $props();
	let display = $state({});
	if (!colors) {
		display.light = '#FC6519';
		display.dark = '#FC6519';
	} else {
		display = colors;
	}
</script>

<article
	class="prose prose-lg mx-auto w-full rounded-lg p-6 lg:shadow-md"
	style="--primary-color: {theme.darkTheme ? display.dark : display.light}"
>
	{@html content}
</article>

<style>
	@import 'tailwindcss';

	article {
		min-height: 200px;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	article :global(h1) {
		@apply mb-2 text-2xl font-bold;
	}

	article :global(blockquote) {
		@apply border-l-4 pl-4 italic;
		border-color: var(--primary-color); /* user color for left border */
		color: #555; /* keep text readable */
	}

	article :global(pre) {
		@apply rounded p-2 font-mono text-sm;
		border: 1px solid var(--primary-color); /* subtle color accent */
		color: #333; /* avoid coloring all code text */
	}

	article :global(a) {
		@apply underline;
		color: var(--primary-color); /* user color for links */
	}

	article :global(ul) {
		@apply list-inside list-disc;
	}

	article :global(ol) {
		@apply list-inside list-decimal;
	}

	article :global(ul li::marker),
	article :global(ol li::marker) {
		color: var(--primary-color); /* user color for bullets/numbers */
	}
</style>
