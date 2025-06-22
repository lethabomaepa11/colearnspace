<script>
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import CommentInput from '$lib/components/CommentInput.svelte';
	import Comments from '$lib/components/Comments.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { ArrowBigUp, MessageCircle } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	const { data } = $props();
	const { feature, isLoggedIn } = data;
	let comments = $state(data.comments);
	let project = $state(data.project);
	appState.setAppTitle('Project');
	const handleUpVote = async () => {
		const res = await fetch('/api/projects/upvotes?name=project&id=' + feature.id, {
			method: 'POST'
		});
		const response = await res.json();
		project.userHasVoted = !project.userHasVoted;
		project.upvote_count = project.upvote_count + (project.userHasVoted ? 1 : -1);
	};

	export const commentSubscription = supabase
		.channel('commentsRoom')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'comment' }, async (payload) => {
			//comments.push(payload.new);
			const res = await fetch('/api/projects/comments?name=project&id=' + feature.id, {
				method: 'GET'
			});
			comments = await res.json();
			comments = comments.comments;
		})
		.subscribe();
	export const upvoteSubscription = supabase
		.channel('upVotesRoom')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'upvote' }, async (payload) => {
			//comments.push(payload.new);
			const res = await fetch('/api/projects/upvotes?name=project&id=' + feature.id, {
				method: 'GET'
			});
			project.upvote_count = await res.json();
			project.upvote_count = project.upvote_count.data.length;
		})
		.subscribe();
</script>

<svelte:head>
	<title>{project.title} by {project.user.name} {project.user.surname} | ColearnSpace</title>
	<meta name="description" content={project.description} />
</svelte:head>

<section transition:slide class="bg-base-100 min-h-screen w-full px-6 py-20 md:w-[80svw]">
	<div class="w-full">
		<div class="flex flex-col">
			{#if !appState.isMobile}
				<BackButtonHeader title="Back" />
			{/if}
			<div
				class=" flex w-full flex-col items-center gap-3 rounded-2xl p-3 lg:flex-row lg:justify-between"
			>
				<article class="flex flex-col items-center gap-3 lg:flex-row">
					<img
						src={project.image}
						alt="logo"
						class=" aspect-video rounded-2xl lg:aspect-square lg:h-full lg:max-h-36"
					/>
					<span class="space-y-2">
						<h1 class="text-2xl">{project.title}</h1>
						<p class="">
							{project.description}
						</p>
						<span class="text-sm lg:p-1"
							>By <a href="/u/{project.user.username}" class="link link-hover"
								>{project.user.name} {project.user.surname}</a
							></span
						>
						<section class="hidden flex-wrap items-center gap-2 lg:flex">
							{#each project.technologies as technology}
								<div class="bg-base-200 rounded-2xl p-2 text-xs">{technology}</div>
							{/each}
						</section>
					</span>
				</article>
				<section
					class="flex w-full items-center justify-between gap-2 lg:w-fit lg:flex-col lg:justify-baseline"
				>
					<h2 class="text-2xl" transition:slide>Rank: #1</h2>
					<span>
						<a href="#comments" class="btn btn-md btn-outline">
							<MessageCircle />
							{comments.length}
						</a>
						<button
							transition:slide
							class="btn btn-md {project.userHasVoted ? 'btn-primary' : 'btn-outline'}"
							onclick={(e) => {
								e.preventDefault();
								handleUpVote();
							}}
						>
							<ArrowBigUp />
							{project.upvote_count}
						</button>
					</span>
				</section>
			</div>
		</div>
		<h2 class="mx-5 my-2">Links</h2>
		<div class="mx-5 flex flex-wrap items-center gap-2">
			<button
				class="btn btn-md btn-primary"
				onclick={() => alert('Collaboration request Coming soon...')}>Request to Collaborate</button
			>
			{#each project.links as link}
				<a
					href={JSON.parse(link).url}
					target="_blank"
					rel="noreferrer"
					class="btn btn-md btn-outline"
				>
					{JSON.parse(link).name}
				</a>
			{/each}
		</div>
		<TrixDisplay content={project.content} />
		<Comments {isLoggedIn} {feature} data={comments} />
	</div>
</section>
