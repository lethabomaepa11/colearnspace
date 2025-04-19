<script>
	let { content } = $props();
</script>

<main>
	{@html content}
</main>

<style>
	@import 'tailwindcss';
	main {
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	main :global(h1) {
		@apply mb-2 text-2xl font-bold;
	}

	main :global(blockquote) {
		@apply border-l-4 border-gray-300 pl-4 text-gray-600 italic;
	}

	main :global(pre) {
		@apply rounded bg-gray-100 p-2 font-mono text-sm;
	}

	main :global(a) {
		@apply text-blue-600 underline;
	}

	main :global(ul) {
		@apply list-inside list-disc;
	}

	main :global(ol) {
		@apply list-inside list-decimal;
	}
</style>
