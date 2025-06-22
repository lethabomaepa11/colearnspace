<script>
	import { supabase } from '$lib/supabaseClient';
	import Loading from './Loading.svelte';

	const { isLoggedIn, feature, parentId } = $props();

	let comment = $state('');
	let isLoading = $state(false);
	const onSubmit = async (e) => {
		isLoading = true;
		e.preventDefault();
		const res = await fetch(`/api/projects/comments?name=${feature.name}&id=${feature.id}`, {
			method: 'POST',
			body: JSON.stringify({ comment, parentId })
		});
		const data = await res.json();

		if (!data.error) {
			isLoading = false;
			comment = '';
		}
	};
</script>

{#if isLoading}
	<Loading />
{:else}
	<form onsubmit={onSubmit} id="comments" class="m-4">
		<div class="textarea textarea-lg textarea-bordered flex w-full items-end gap-2 p-2">
			<textarea bind:value={comment} placeholder="Write something..." class="w-full"></textarea>
			{#if isLoggedIn}
				<button class="btn btn-primary">Submit</button>
			{:else}
				<a class="btn btn-primary" href="/auth/login">Login to comment</a>
			{/if}
		</div>
	</form>
{/if}
