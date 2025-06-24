<script>
	import { onMount } from 'svelte';
	import CommentInput from './CommentInput.svelte';
	import CommentItem from './CommentItem.svelte';
	import Loading from './Loading.svelte';
	import { loadMoreRequest } from '$lib';
	/** @type {{ isLoggedIn: boolean; feature: {id: string, name: string}; data: comments[]; loadMoreRequest: Function;}}*/
	let { isLoggedIn, feature, data = $bindable() } = $props();
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
	let parentId = $state(null); //shared prop between this component, CommentItem and CommentInput components

	const loadMore = async (offset) => {
		isLoadingMore = true;
		offset = offset.length > 0 ? offset : data.length; //this method will be called from the loadmore btn and the comments input
		const res = await loadMoreRequest(feature, 10, offset);
		let comments = await res.json();
		if (comments.comments.length < 10) {
			allCommentsLoaded = true;
		}
		data = [...data, ...comments.comments];
		isLoadingMore = false;
	};
</script>

<CommentInput {isLoggedIn} {feature} {loadMore} bind:data bind:parentId />

<!--Comment section-->
<section id="comments">
	<span class="flex items-center justify-between">
		<h2 class="text-xl">Comments</h2>
	</span>
	<ul class="menu menu-md rounded-box w-full space-y-5">
		{#each data as comment}
			{#if comment.comment.length > 0}
				<li>
					<summary class="w-full"
						><CommentItem
							{isLoggedIn}
							{feature}
							data={comment}
							bind:comments={data}
							bind:parentId
						/>
					</summary>
					<ul class="w-full space-y-5">
						{#each comment.comment as reply}
							<li>
								<CommentItem
									{isLoggedIn}
									{feature}
									data={reply}
									bind:comments={data}
									bind:parentId
								/>
							</li>
						{/each}
					</ul>
				</li>
			{:else}
				<li>
					<CommentItem {isLoggedIn} {feature} data={comment} bind:comments={data} bind:parentId />
				</li>
			{/if}
		{/each}
		{#if isLoadingMore}
			<Loading text="Loading comments..." />
		{:else if allCommentsLoaded}
			<p class="text-center text-xs">No more comments...</p>
		{:else}
			<button class="btn btn-ghost w-full" onclick={loadMore}>Load more</button>
		{/if}
	</ul>
</section>
