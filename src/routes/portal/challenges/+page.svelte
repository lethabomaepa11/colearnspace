<script>
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import { appState } from '$lib/states.svelte.js';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import Seo from '$lib/components/SEO.svelte';

	let { data } = $props();
	const challenges = data.challenges;
	let isLoading = $state(true);

	appState.setAppTitle('Challenges');

	onMount(() => {
		isLoading = false;
	});
</script>

<Seo title="Challenges | ColearnSpace" desc="Challenges" />
<main class="flex w-full flex-wrap gap-5 overflow-hidden">
	{#if !appState.isMobile}
		<BackButtonHeader title="Challenges" />
	{/if}
	<section
		class="grid max-h-[80svh] w-full grid-cols-1 items-start justify-center gap-5 overflow-auto lg:grid-cols-3"
	>
		{#each challenges as challenge}
			<a
				href="/portal/challenges/{challenge.slug}"
				class="card border-base-300 flex w-full rounded-none border lg:rounded-xl"
			>
				<figure><img src={challenge.image} alt="Shoes" class=" aspect-video w-full" /></figure>

				<div class="card-body">
					<h2 class="card-title">{challenge.title}</h2>

					<p class="text-xs">
						{moment(challenge.start_date).format('DD MMM YYYY [at] HH:mm')} - {moment(
							challenge.end_date
						).format('DD MMM YYYY [at] HH:mm')}
					</p>
					<div class="card-actions items-center justify-between pt-5">
						<p class="link-hover text-sm">0 joined</p>
						<button class="btn btn-primary">Learn more</button>
					</div>
				</div>
			</a>
		{/each}
	</section>
</main>
