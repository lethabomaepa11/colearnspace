<script>
	import { submitComment } from '$lib/server/comments/main';
	import { supabase } from '$lib/supabaseClient';

	const { isLoggedIn, feature, parentId } = $props();

	let comment = $state('');
	const onSubmit = async (e) => {
		e.preventDefault();
		const data = await submitComment(comment, parentId, feature, supabase);
		console.log(data);
	};
</script>

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
