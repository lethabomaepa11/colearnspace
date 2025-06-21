<script>
	import CommentInput from './CommentInput.svelte';
	import CommentItem from './CommentItem.svelte';
	const { isLoggedIn, feature, data } = $props();
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
	</ul>
</section>
