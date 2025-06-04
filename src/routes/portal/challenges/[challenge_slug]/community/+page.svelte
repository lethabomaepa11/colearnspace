<script>
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { appState } from '$lib/states.svelte';

	appState.setAppTitle('Community');
	let { data } = $props();
	let topic = $state({
		title: '',
		content: '<p>You can ask anything regarding this challenge, add links, images and more here</p>'
	});
	const items = [];
	for (let i = 0; i < 10; i++) {
		items.push(i);
	}
</script>

<section class="flex w-full items-center justify-between">
	<h1 class="text-2xl font-bold">Discussions</h1>
	<a href="/portal/challenges/{data.slug}/community/new" class="btn btn-primary">New Discussion</a>
</section>
<main class="flex w-full flex-col gap-2">
	{#each items as item}
		<a href="#" class="bg-base-300 w-full space-y-4 rounded p-4 hover:scale-[0.99]">
			<h2>Ask Questions in here</h2>
			<p class=" text-xs">By ghost at 12:45 on 2023-01-01</p>
		</a>
	{/each}
</main>
