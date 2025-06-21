<script>
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import CommentInput from '$lib/components/CommentInput.svelte';
	import Comments from '$lib/components/Comments.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { toggleUpVote } from '$lib/server/upvotes/main.js';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { ArrowBigUp, MessageCircle } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	const { data } = $props();
	const { feature, comments, isLoggedIn } = data;
	let project = $state(data.project);
	appState.setAppTitle('Project');
	const handleUpVote = async () => {
		const data = await toggleUpVote(feature, supabase);
		project.userHasVoted = !project.userHasVoted;
		project.upvote_count = project.upvote_count + (project.userHasVoted ? 1 : -1);
	};
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
				class="hover:bg-base-200/60 flex w-full flex-col items-center gap-3 rounded-2xl p-3 lg:flex-row lg:justify-between"
			>
				<article class="flex items-center gap-3">
					<img src={project.image} alt="logo" class="aspect-square h-full max-h-36 rounded-2xl" />
					<span class="space-y-2">
						<h1 class="text-2xl">{project.title}</h1>
						<p class="">
							{project.description}
						</p>
						<section class="hidden flex-wrap items-center gap-2 lg:flex">
							{#each project.technologies as technology}
								<div class="bg-base-200 rounded-2xl p-2 text-xs">{technology}</div>
							{/each}
						</section>
					</span>
				</article>
				<section class="flex w-full gap-1 lg:w-fit">
					<a href="#comments" class="btn btn-md btn-outline">
						<MessageCircle />
						{comments.length}
					</a>
					<button
						class="btn btn-md {project.userHasVoted ? 'btn-primary' : 'btn-outline'}"
						onclick={(e) => {
							e.preventDefault();
							handleUpVote();
						}}
					>
						<ArrowBigUp />
						{project.upvote_count}
					</button>
				</section>
			</div>
		</div>
		<TrixDisplay content={project.content} />
		<Comments {isLoggedIn} {feature} data={comments} />
	</div>
</section>
