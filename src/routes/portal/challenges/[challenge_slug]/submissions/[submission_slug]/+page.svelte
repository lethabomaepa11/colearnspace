<script>
	import { page } from '$app/state';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import {
		ArrowDownIcon,
		ArrowUpIcon,
		Forward,
		MessageCircle,
		Share,
		ThumbsDown,
		ThumbsUp
	} from '@lucide/svelte';

	let { data } = $props();
	const content = data.challenge.content;
	const items = [];
	for (let i = 0; i < 10; i++) {
		items.push(i);
	}
</script>

<main class="space-y-3">
	<h2>Submission {page.params.submission_slug}</h2>
	<!--Content section-->
	<section id="content">
		<TrixDisplay {content} />
	</section>
	<!--Voting section-->
	<section id="voting" class="bg-base-200 grid w-full grid-cols-4 rounded-lg p-2 lg:flex">
		<button class="btn btn-ghost text-xs"><ThumbsUp /> 0</button>
		<button class="btn btn-ghost text-xs"><ThumbsDown /> 0</button>
		<button class="btn btn-ghost text-xs"><MessageCircle /> 0</button>
		<button class="btn btn-ghost text-xs"><Forward /> 0</button>
	</section>
	<!--Comment section-->
	<section id="comments">
		<h3>Comments</h3>
		{#each items as i}
			<div class="border-base-200 border-b p-4">
				<p class="text-xs">Lethabo Maepa {i + Math.floor(Math.random() * 30)} minutes ago</p>
				<p>You might wanna use such and such</p>
			</div>
		{/each}
	</section>
</main>
