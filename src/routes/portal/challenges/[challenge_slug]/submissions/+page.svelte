<script>
	import moment from 'moment';
	import { slide } from 'svelte/transition';

	const items = [];
	for (let i = 0; i < 10; i++) {
		items.push(i);
	}
	let { data } = $props();
	const challenge = data.challenge;
</script>

<main transition:slide>
	<section class="flex w-full items-center justify-between">
		<h1 class="text-2xl font-bold">Submissions</h1>
		<a href="/portal/challenges/{data.challenge.slug}/submissions/new" class="btn btn-primary"
			>New Submission</a
		>
	</section>
	<article class="my-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
		{#each items as item}
			<a
				href="/portal/challenges/{challenge.slug}/submissions/{item}"
				class="card bg-base-200 border-base-300 w-full border"
			>
				<div class="card-body">
					<h4 class="">Submission {item}</h4>
					<p class="text-xs">By ghost {moment().fromNow()}</p>
				</div>
			</a>
		{/each}
	</article>
</main>
