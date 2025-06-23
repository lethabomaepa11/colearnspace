<script>
	import { onMount } from 'svelte';
	import CommentInput from './CommentInput.svelte';
	import CommentItem from './CommentItem.svelte';
	import Loading from './Loading.svelte';
	/** @type {{ isLoggedIn: boolean; feature: {id: string, name: string}; data: comments[]; loadMoreRequest: Function;}}*/
	let { isLoggedIn, feature, data, loadMoreRequest } = $props();
	/**
	 * @typedef loadMoreRequest(offset) : request an api that fetches comments for a feature in this function
	 */
	/***
	 * PROGRAM START
	 * At first, only 4 parent comments are loaded. If the user scrolls to the bottom of the page
	 * and clicks load more comments, more comments are loaded.
	 * we then fetch 10 more comments at a time until all comments are loaded then we display feedback
	 *
	 */
	let isLoadingMore = $state(false);
	let allCommentsLoaded = $state(false);
	const loadMore = async () => {
		isLoadingMore = true;
		const offset = data.length;
		const res = await loadMoreRequest(offset);
		let comments = await res.json();
		if (comments.comments.length < 10) {
			allCommentsLoaded = true;
		}
		data = [...data, ...comments.comments];
		isLoadingMore = false;
	};
</script>

<CommentInput {isLoggedIn} {feature} />

<!--Comment section-->
<section id="comments">
	<span class="flex items-center justify-between">
		<h2 class="text-xl">Comments</h2>
	</span>
	<ul class="menu menu-md rounded-box w-full">
		{#each data as comment}
			{#if comment.comment.length > 0}
				<li>
					<details open>
						<summary><CommentItem {isLoggedIn} {feature} data={comment} /> </summary>
						<ul>
							{#each comment.comment as reply}
								<li><CommentItem {isLoggedIn} {feature} data={reply} /></li>
							{/each}
						</ul>
					</details>
				</li>
			{:else}
				<li>
					<CommentItem {isLoggedIn} {feature} data={comment} />
				</li>
			{/if}
		{/each}
		{#if isLoadingMore}
			<Loading text="Loading more comments..." />
		{:else if allCommentsLoaded}
			<p class="text-center text-xs">No more comments...</p>
		{:else}
			<button class="btn btn-ghost w-full" onclick={loadMore}>Load more</button>
		{/if}
	</ul>
</section>
