<script>
	import { onMount } from 'svelte';

	let { value = $bindable(), id } = $props();
	const handleEditorValueChange = () => {
		// @ts-ignore
		//since the value of the trix editor is not bindable or reactive, i track the value of the hidden input element manually
		value = document.getElementById(id).value;
	};

	onMount(() => {
		handleEditorValueChange();
	});
</script>

<main>
	<trix-toolbar class="text-primary" id="{id}Toolbar"></trix-toolbar>
	<input {id} type="hidden" name={id} bind:value />
	<trix-editor onkeyup={handleEditorValueChange} toolbar="{id}Toolbar" input={id}></trix-editor>
</main>

<style>
	@import 'tailwindcss';
	trix-editor {
		min-height: 200px;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	trix-editor :global(h1) {
		@apply mb-2 text-2xl font-bold;
	}

	trix-editor :global(blockquote) {
		@apply border-l-4 border-gray-300 pl-4 text-gray-600 italic;
	}

	trix-editor :global(pre) {
		@apply rounded bg-gray-100 p-2 font-mono text-sm;
	}

	trix-editor :global(a) {
		@apply text-blue-600 underline;
	}

	trix-editor :global(ul) {
		@apply list-inside list-disc;
	}

	trix-editor :global(ol) {
		@apply list-inside list-decimal;
	}
</style>
