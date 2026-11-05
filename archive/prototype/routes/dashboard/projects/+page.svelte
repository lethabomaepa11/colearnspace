<script>
	import { appState } from '$lib/states.svelte.js';

	appState.setAppTitle('My Projects');
	let { data } = $props();
	let { projects, userData } = data;
	const hasApiKeys = userData.api_keys[0].count > 0;
</script>

<section transition:slide class="bg-base-100">
	<div>
		<div class="w-full rounded-2xl">
			<h1 class="text-2xl">Your projects</h1>
			<p class="text-sm">Create and manage your projects</p>
		</div>
		<div class="divider w-full"></div>

		<div class="flex flex-col">
			{#if projects.length === 0}
				<p class=" text-center text-sm">
					No projects found <a href="/portal/projects/create" class="link link-hover link-primary"
						>Create one</a
					>
				</p>
			{:else}
				<p class="text-sm">You can use our api to get your projects</p>
				<p class="text-sm">
					You will need an api key:
					<a href="/dashboard/settings" class="link link-hover link-primary">
						{#if !hasApiKeys}Create one{:else}
							Use your api key
						{/if}</a
					>
				</p>
			{/if}
			<div class="divider w-full"></div>
			{#each projects as project, index}
				<a
					href="/portal/projects/{project.id}"
					class="hover:bg-base-200/60 flex w-full items-center justify-between rounded-2xl p-2 lg:flex-row"
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
					<section name="actions" class="flex items-center gap-2 lg:flex-row">
						<button class="btn btn-primary">Edit</button>
						<button class="btn btn-error">Delete</button>
					</section>
				</a>
			{/each}
		</div>
	</div>
</section>
