<script>
	import { Reply } from '@lucide/svelte';
	import CommentInput from './CommentInput.svelte';

	const { isLoggedIn, feature, id, data } = $props();
	let showReplyInput = $state(false);
	let replyId = $state(null);
	const handleReply = (id) => {
		//display a comment input for this item
		replyId = id;
		showReplyInput = true;
	};
</script>

<div class=" block space-y-3">
	<div class="flex items-center gap-2">
		<div class="avatar">
			<div class="w-10 rounded-full">
				<img alt="Tailwind CSS chat bubble component" src="/site/branding/ColearnSpace-icon2.png" />
			</div>
		</div>
		<a href="/u/{data.user.username}" class="link-hover font-bold"
			>{data.user.name} {data.user.surname}</a
		>
	</div>

	<div class="mx-5">
		{data.content}
	</div>
	{#if !data.is_reply}
		{#if showReplyInput}
			<CommentInput {isLoggedIn} {feature} parentId={data.id} />
		{:else if isLoggedIn}
			<div>
				<button class="btn btn-ghost" onclick={() => (showReplyInput = true)}
					><Reply /> Reply</button
				>
			</div>
		{:else}
			<a href="/auth/login" class="btn btn-ghost"><Reply /> Login to reply</a>
		{/if}
	{/if}
</div>
