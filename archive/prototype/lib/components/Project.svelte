<script>
	import { ArrowBigUp, Forward, MessageCircle, Share } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	let { project, index, projects = $bindable() } = $props();
	let isLoading = $state(false);
	const handleUpVote = async (id, index) => {
		isLoading = true;
		const feature = { id, name: 'project' };
		const res = await fetch('/api/upvotes?name=project&id=' + id, { method: 'POST' });
		const response = await res.json();
		projects[index].userHasVoted = !projects[index].userHasVoted;
		projects[index].upvote_count =
			projects[index].upvote_count + (projects[index].userHasVoted ? 1 : -1);
		isLoading = false;
	};
	const shareProject = (e) => {
		e.preventDefault();
		navigator.share({
			title: project.title,
			text: project.description,
			url: page.url + '/' + project.id
		});
	};
</script>

<a
	href="/portal/projects/{project.id}"
	class="hover:bg-base-200/60 flex w-full flex-col rounded-2xl p-2"
>
	<article class="flex items-center gap-3">
		<img src={project.image} alt="logo" class="aspect-square h-full max-h-[64px] rounded-2xl" />
		<span class="space-y-2">
			<h2>{project.title}</h2>
			<p class="text-sm">
				{project.description}
			</p>
			<section class="hidden flex-wrap items-center gap-2 lg:flex">
				{#each project.technologies as technology}
					<div class="bg-base-200 rounded-2xl p-2 text-xs">{technology}</div>
				{/each}
			</section>
		</span>
	</article>
	<div class="flex items-center justify-between px-4 text-xs">
		<p>{project.upvote_count} Vote{project.upvote_count == 1 ? '' : 's'}</p>
		<span class="flex items-center gap-3">
			<button
				class="link"
				onclick={(e) => {
					e.preventDefault();
					goto(`/portal/projects/${project.id}#comments`);
				}}>{project.comment_count} Comment{project.comment_count == 1 ? '' : 's'}</button
			>
			<p>Rank: #{project.rank}</p>
		</span>
	</div>
	<div class="divider m-0 p-0"></div>
	<section class="grid w-full grid-cols-3 items-center justify-between gap-1">
		<button
			class="btn btn-md {project.userHasVoted ? 'btn-primary' : 'btn-ghost'}"
			onclick={(e) => {
				e.preventDefault();
				handleUpVote(project.id, index);
			}}
			><ArrowBigUp />
			{#if isLoading}
				<div class="loading loading-spinner text-primary-content"></div>
			{:else}
				Vote
			{/if}
		</button>
		<button
			class="btn btn-md btn-ghost flex gap-1"
			onclick={(e) => {
				e.preventDefault();
				goto(`/portal/projects/${project.id}#comments`);
			}}
		>
			<MessageCircle />
			Comment
		</button>
		<button class="btn btn-md btn-ghost flex gap-1" onclick={shareProject}>
			<Forward />
			Share
		</button>
	</section>
</a>
