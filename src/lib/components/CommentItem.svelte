<script>
	import { Reply } from '@lucide/svelte';
	import CommentInput from './CommentInput.svelte';
	import { slide } from 'svelte/transition';
	import moment from 'moment';

	let { isLoggedIn, feature, data, comments = $bindable(), parentId = $bindable() } = $props();
	const handleReply = () => {
		//display a comment input for this item
		parentId = data.id;
	};
</script>

<div
	id={data.id}
	class="block w-full space-y-3 rounded-xl p-4 {parentId == data.id ? 'bg-base-200' : ''}"
	transition:slide
>
	<div class="flex items-center gap-2">
		<div class="avatar">
			<div class="w-10 rounded-full">
				<img alt="Tailwind CSS chat bubble component" src="/site/branding/ColearnSpace-icon2.png" />
			</div>
		</div>
		<span class="w-full">
			<a href="/u/{data.user.username}" class="link-hover font-bold"
				>{data.user.name} {data.user.surname}</a
			>
			<p class="text-xs text-gray-400">
				{moment(data.created_at).fromNow()}
			</p>
		</span>
	</div>

	<div class="mx-5">
		{data.content}
	</div>
	{#if !data.is_reply}
		{#if isLoggedIn}
			<div>
				<button class="btn btn-ghost" onclick={handleReply}><Reply /> Reply</button>
			</div>
		{:else}
			<a href="/auth/login" class="btn btn-ghost"><Reply /> Login to reply</a>
		{/if}
	{/if}
</div>
