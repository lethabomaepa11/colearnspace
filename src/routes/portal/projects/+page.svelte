<script>
	import { goto } from '$app/navigation';
	import { toggleUpVote } from '$lib/server/upvotes/main.js';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { ArrowBigUp, MessageCircle } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	//set the header of the app
	appState.setAppTitle('Projects');

	const { data } = $props();
	let projects = $state(data.projects);
	const handleUpVote = async (id, index) => {
		const feature = { id, name: 'project' };
		const data = await toggleUpVote(feature, supabase);
		projects[index].userHasVoted = !projects[index].userHasVoted;
		projects[index].upvote_count =
			projects[index].upvote_count + (projects[index].userHasVoted ? 1 : -1);
	};
</script>

<svelte:head>
	<title>Projects | ColearnSpace</title>
	<meta name="description" content="Explore a wide range of user projects on ColearnSpace" />
</svelte:head>

<section transition:slide class="bg-base-100 min-h-screen w-full px-6 py-20 md:w-[80svw]">
	<div class="mx-auto max-w-7xl">
		<div class="from-accent to-primary mb-4 w-full rounded-2xl bg-gradient-to-l p-5">
			<h1 class="text-2xl">Latest Projects</h1>
		</div>

		<div class="flex flex-col">
			{#each projects as project, index}
				<a
					href="/portal/projects/{project.id}"
					class="hover:bg-base-200/60 flex w-full flex-col items-center gap-3 rounded-2xl p-3 lg:flex-row lg:justify-between"
				>
					<article class="flex items-center gap-3">
						<img
							src={project.image}
							alt="logo"
							class="aspect-square h-full max-h-[64px] rounded-2xl"
						/>
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
					<section class="flex w-full gap-1 lg:w-fit">
						<button
							class="btn btn-md btn-outline"
							onclick={(e) => {
								e.preventDefault();
								goto('/portal/projects/{1}#comments');
							}}
						>
							<MessageCircle />
							{project.comment_count}
						</button>
						<button
							class="btn btn-md {project.userHasVoted ? 'btn-primary' : 'btn-outline'}"
							onclick={(e) => {
								e.preventDefault();
								handleUpVote(project.id, index);
							}}
						>
							<ArrowBigUp />
							{project.upvote_count}
						</button>
					</section>
				</a>
			{/each}
		</div>
	</div>
</section>
