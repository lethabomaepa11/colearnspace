<script>
	import Loading from '$lib/components/Loading.svelte';
	import Project from '$lib/components/Project.svelte';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient.js';

	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	//set the header of the app
	appState.setAppTitle('Projects');

	const { data } = $props();
	let projects = $state(null);
	let isLoadingMore = $state(false);
	let allProjectsLoaded = $state(false);

	//upvoteSubscription
	//commentcount subscription

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
	onMount(async () => {
		isLoadingMore = true;
		if (localStorage.getItem('projects')) {
			projects = JSON.parse(localStorage.getItem('projects'));
			isLoadingMore = false;
			//then proceed to fetch fresh data from the api in the background
		}
		commentCountSubscription.subscribe();
		try {
			const res = await fetch(`/api/projects`, {
				method: 'GET'
			});
			let newProjects = await res.json();
			if (newProjects.data.length < 10) {
				allProjectsLoaded = true;
			}
			projects = newProjects.data;

			//set the projects in the localstorage for next time incase the api is slow
			localStorage.setItem('projects', JSON.stringify(projects));
		} catch (error) {
			console.error('Error fetching projects:', error);
		}

		isLoadingMore = false;
	});
	onDestroy(() => {
		commentCountSubscription.unsubscribe();
	});

	const loadMore = async () => {
		isLoadingMore = true;
		const offset = projects.length;
		const res = await fetch(`/api/projects?limit=10&offset=${offset}&name=project&`, {
			method: 'GET'
		});
		let newProjects = await res.json();
		if (newProjects.data.length < 10) {
			allProjectsLoaded = true;
		}
		projects = [...projects, ...newProjects.data];
		//set the projects in the localstorage for next time incase the api is slow
		localStorage.setItem('projects', JSON.stringify(projects));
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
				<Project {project} {index} bind:projects />
			{/each}
			{#if isLoadingMore}
				<Loading text="Loading projects..." />
			{:else if allProjectsLoaded}
				<p class="text-center text-xs">No more projects to display...</p>
			{:else}
				<button class="btn btn-outline mt-10 w-full" onclick={loadMore}>Load more</button>
			{/if}
		</div>
	</div>
</section>
