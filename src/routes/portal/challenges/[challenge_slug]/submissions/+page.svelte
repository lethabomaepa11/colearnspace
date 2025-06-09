<script>
	import moment from 'moment';
	import { slide } from 'svelte/transition';

	const items = [];
	for (let i = 0; i < 10; i++) {
		items.push(i);
	}
	let { data } = $props();
	const challenge = data.challenge;
	const submissions = data.submissions.submissions;
</script>

{#if moment(challenge.start_date).isAfter(moment())}
	<h1 class="text-xl font-bold">Submissions will open {moment(challenge.start_date).fromNow()}</h1>
{:else if moment(challenge.end_date).isSameOrBefore(moment())}
	<h1 class="text-xl font-bold">Submissions are closed</h1>
{:else}
	<main transition:slide>
		<section class="flex w-full items-center justify-between">
			<h1 class="text-2xl font-bold">Submissions</h1>
			<a href="/portal/challenges/{data.challenge.slug}/submissions/new" class="btn btn-primary"
				>New Submission</a
			>
		</section>
		<article class="my-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
			{#each submissions as submission}
				<a
					href="/portal/challenges/{challenge.slug}/submissions/{submission.id}"
					class="card bg-base-200 border-base-300 w-full border"
				>
					<div class="card-body">
						<h4 class="">{submission.title}</h4>
						<p class="text-xs">By ghost {moment(submission.created_at).fromNow()}</p>
					</div>
				</a>
			{/each}
		</article>
	</main>
{/if}
