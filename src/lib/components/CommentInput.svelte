<script>
	import { loadMoreRequest } from '$lib';
	import { supabase } from '$lib/supabaseClient';
	import { slide } from 'svelte/transition';
	import Loading from './Loading.svelte';

	let {
		isLoggedIn,
		feature,
		parentId = $bindable(),
		data = $bindable(),
		showReplyInput = $bindable()
	} = $props();

	let comment = $state('');
	let isLoading = $state(false);
	const onSubmit = async (e) => {
		isLoading = true;
		e.preventDefault();
		const res = await fetch(`/api/comments?name=${feature.name}&id=${feature.id}`, {
			method: 'POST',
			body: JSON.stringify({ comment, parentId })
		});
		const newData = await res.json();

		if (!newData.error) {
			comment = '';
			const res = await loadMoreRequest(feature, 10, 0);
			let comments = await res.json();
			data = [...comments.comments];
			showReplyInput = false;
			isLoading = false;
		}
		parentId = null;
	};
</script>

<div
	transition:slide
	class={`w-full ${parentId === null ? '' : 'bg-base-100 fixed right-0 bottom-0 left-0 z-50 shadow-md'}`}
>
	{#if isLoading}
		<Loading />
	{:else}
		<form onsubmit={onSubmit} id="comments" class="m-4">
			<div class="textarea textarea-lg textarea-bordered flex w-full flex-col items-end gap-2 p-2">
				<textarea bind:value={comment} placeholder="Write something..." class="w-full"></textarea>
				<div class="flex w-full items-center justify-end gap-2">
					{#if parentId || comment.length > 0}
						<button
							type="button"
							onclick={() => {
								comment = '';
								parentId = null;
							}}
							class="btn btn-outline">Cancel</button
						>
					{/if}
					{#if isLoggedIn}
						<button class="btn btn-primary">Submit</button>
					{:else}
						<a class="btn btn-primary" href="/auth/login">Login to comment</a>
					{/if}
				</div>
			</div>
		</form>
	{/if}
</div>
