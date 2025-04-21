<script>
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let { value = $bindable(), id } = $props();

	const handleEditorValueChange = () => {
		value = document.getElementById(id).value;
	};

	const uploadImage = async (file) => {
		try {
			const fileName = `course_files/${Date.now()}-${file.name}`;
			const { error } = await supabase.storage.from('files').upload(fileName, file);

			if (error) throw error;

			const {
				data: { publicUrl }
			} = supabase.storage.from('files').getPublicUrl(fileName);

			return publicUrl;
		} catch (error) {
			console.error('Upload error:', error);
			return null;
		}
	};

	onMount(() => {
		handleEditorValueChange();

		addEventListener('trix-attachment-add', async (event) => {
			const attachment = event.attachment;
			if (attachment.file) {
				event.preventDefault();
				const url = await uploadImage(attachment.file);

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

<!-- The rest of your component remains the same -->

<main>
	<trix-toolbar class="text-primary" id="{id}Toolbar"></trix-toolbar>
	<input {id} type="hidden" name={id} bind:value />
	<!-- svelte-ignore a11y_no_static_element_interactions -->
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
