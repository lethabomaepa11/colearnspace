<script>
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { appState } from '$lib/states.svelte';

	appState.setAppTitle('Community');
	let { data } = $props();

	const items = [];
	for (let i = 0; i < 10; i++) {
		items.push(i);
	}
</script>

<section class="flex w-full items-center justify-between">
	<h1 class="text-2xl font-bold">Discussion</h1>
	<a href="/portal/challenges/{data.challenge.slug}/community/new" class="btn btn-primary"
		>New Topic</a
	>
</section>
<main class="divide-base-300 flex w-full flex-col gap-2 divide-y">
	{#each items as item}
		<a
			href="/portal/challenges/{data.challenge.slug}/community/{item}"
			class="hover:bg-base-200 flex w-full items-center justify-between space-y-4 p-4 hover:rounded-xl"
		>
			<h2>Ask Questions in here</h2>
			<p class=" text-xs">By ghost at 12:45 on 2023-01-01</p>
		</a>
	{/each}
</main>
