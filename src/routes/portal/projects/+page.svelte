<script>
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { ArrowBigUp, MessageCircle } from '@lucide/svelte';
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	//set the header of the app
	appState.setAppTitle('Projects');

	const { data } = $props();
	let projects = $state(data.projects);
	let isLoadingMore = $state(false);
	let allProjectsLoaded = $state(false);
	const handleUpVote = async (id, index) => {
		const feature = { id, name: 'project' };
		const res = await fetch('/api/projects/upvotes?name=project&id=' + id, { method: 'POST' });
		const response = await res.json();
		projects[index].userHasVoted = !projects[index].userHasVoted;
		projects[index].upvote_count =
			projects[index].upvote_count + (projects[index].userHasVoted ? 1 : -1);
	};

	//upvoteSubscription
	//commentcount subscription
	const upvoteSubscription = supabase
		.channel('projectUpvotes')
		.on(
			'postgres_changes',
			{
				event: 'INSERT',
				schema: 'public',
				table: 'upvote'
			},
			(payload) => {
				const { feature_id } = payload.new;
				const project = projects.find((p) => p.id === feature_id);
				if (project) project.upvote_count++;
			}
		)
		.on(
			'postgres_changes',
			{
				event: 'DELETE',
				schema: 'public',
				table: 'upvote'
			},
			(payload) => {
				const { feature_id } = payload.old;
				const project = projects.find((p) => p.id === feature_id);
				if (project && project.upvote_count > 0) project.upvote_count--;
			}
		);
	const commentCountSubscription = supabase.channel('projectComments').on(
		'postgres_changes',
		{
			event: 'INSERT',
			schema: 'public',
			table: 'comment',
			filter: 'is_reply=eq.false' // only top-level comments
		},
		(payload) => {
			const { feature_id } = payload.new;
			const project = projects.find((p) => p.id === feature_id);
			if (project) project.comment_count++;
		}
	);

	//subscribe to the realtime channels onMount and unsubscribe onDestroy
	onMount(() => {
		commentCountSubscription.subscribe();
		upvoteSubscription.subscribe();
	});
	onDestroy(() => {
		commentCountSubscription.unsubscribe();
		upvoteSubscription.unsubscribe();
	});

	const loadMore = async () => {
		isLoadingMore = true;
		const offset = projects.length;
		const res = await fetch(`/api/projects?limit=10&offset=${offset}&name=project&`, {
			method: 'GET'
		});
		let newProjects = await res.json();
		console.log(newProjects);
		if (newProjects.data.length < 10) {
			allProjectsLoaded = true;
		}
		projects = [...projects, ...newProjects.data];
		isLoadingMore = false;
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
								goto(`/portal/projects/${project.id}#comments`);
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
			{#if isLoadingMore}
				<Loading text="Loading more projects..." />
			{:else if allProjectsLoaded}
				<p class="text-center text-xs">No more projects to display...</p>
			{:else}
				<button class="btn btn-ghost w-full" onclick={loadMore}>Load more</button>
			{/if}
		</div>
	</div>
</section>
