<script>
	import { uploadImage } from '$lib';
	import { theme } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let { value = $bindable(), id, colors } = $props();
	let display = $state({});
	if (!colors) {
		display.light = '#FC6519';
		display.dark = '#FC6519';
	} else {
		display = colors;
	}

	const handleEditorValueChange = () => {
		value = document.getElementById(id).value;
	};

	onMount(() => {
		handleEditorValueChange();

		addEventListener('trix-attachment-add', async (event) => {
			const attachment = event.attachment;
			if (attachment.file) {
				event.preventDefault();
				const url = await uploadImage(attachment.file, id, supabase);

				if (url) {
					attachment.setAttributes({
						url: url,
						href: url,
						filename: attachment.file.name
					});

					// Important: Remove file reference to prevent Trix from using local file
					attachment.file = undefined;
				}
			}
		});
	});
</script>

<main>
	<trix-toolbar class="text-primary" id="{id}Toolbar"></trix-toolbar>
	<input {id} type="hidden" name={id} bind:value />
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<trix-editor
		onkeyup={handleEditorValueChange}
		toolbar="{id}Toolbar"
		input={id}
		style="--primary-color: {theme.darkTheme ? display.dark : display.light}"
	></trix-editor>
</main>

<style>
	@import 'tailwindcss';

	trix-editor {
		min-height: 200px;
		border-radius: 0.5rem;
		padding: 1rem;
		@apply wrap-anywhere;
	}

	trix-editor :global(h1) {
		@apply mb-2 text-2xl font-bold;
	}

	trix-editor :global(blockquote) {
		@apply border-l-4 pl-4 italic;
		border-color: var(--primary-color); /* user color for left border */
	}

	trix-editor :global(pre) {
		@apply my-4 rounded bg-gray-800 p-2 font-mono text-sm text-white;
	}

	trix-editor :global(a) {
		@apply underline;
		color: var(--primary-color); /* user color for links */
	}

	trix-editor :global(ul) {
		@apply list-inside list-disc;
	}

	trix-editor :global(ol) {
		@apply list-inside list-decimal;
	}

	trix-editor :global(ul li::marker),
	trix-editor :global(ol li::marker) {
		color: var(--primary-color); /* user color for bullets/numbers */
	}
</style>
