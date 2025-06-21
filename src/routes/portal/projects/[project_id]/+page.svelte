<script>
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { appState } from '$lib/states.svelte';
	import { ArrowBigUp, MessageCircle } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	const { data } = $props();
	const { project } = data;
	const { isLoggedIn } = data;
	appState.setAppTitle('Project');
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
					<button
						class="btn btn-md btn-outline"
						onclick={(e) => {
							e.preventDefault();
							goto('/portal/projects/{1}#comments');
						}}
					>
						<MessageCircle /> 12
					</button>
					<button
						class="btn btn-md btn-outline"
						onclick={(e) => {
							e.preventDefault();
							alert('Voting not yet available');
						}}
					>
						<ArrowBigUp /> 12
					</button>
				</section>
			</div>
		</div>
		<TrixDisplay content={project.content} />
		<section id="comments" class="m-4">
			<div class="textarea textarea-lg textarea-bordered flex w-full items-end gap-2 p-2">
				<textarea placeholder="Write a comment..." class="w-full"></textarea>
				{#if isLoggedIn}
					<button class="btn btn-primary">Submit</button>
				{:else}
					<a class="btn btn-primary" href="/auth/login">Login to comment</a>
				{/if}
			</div>
		</section>
	</div>
</section>
