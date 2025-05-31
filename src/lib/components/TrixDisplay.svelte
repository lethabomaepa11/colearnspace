<script>
	let { content } = $props();
</script>

<article class="prose prose-lg mx-auto w-full rounded-lg p-6 lg:shadow-md">
	{@html content}
</article>

<style>
	@import 'tailwindcss';
	article {
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	article :global(h1) {
		@apply mb-2 text-2xl font-bold;
	}

	article :global(blockquote) {
		@apply border-l-4 border-gray-300 pl-4 text-gray-600 italic;
	}

	article :global(pre) {
		@apply rounded p-2 font-mono text-sm;
	}

	article :global(a) {
		@apply text-blue-600 underline;
	}

	article :global(ul) {
		@apply list-inside list-disc;
	}

	article :global(ol) {
		@apply list-inside list-decimal;
	}
</style>
