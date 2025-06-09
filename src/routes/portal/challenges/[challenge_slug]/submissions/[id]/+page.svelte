<script>
	import { page } from '$app/state';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { appState } from '$lib/states.svelte.js';
	import {
		ArrowBigDown,
		ArrowBigUp,
		Forward,
		MessageCircle,
		Share,
		ThumbsDown,
		ThumbsUp
	} from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	const submission = data.submission;
	const items = [];
	for (let i = 0; i < 10; i++) {
		items.push(i);
	}
	const vote = $state({
		up: false,
		down: false
	}); //either can be true or false, all can be false but all cannot be true

	const handleVote = async (id) => {
		//the vote can be upvote or downvote, check if it has been voted yet, if no
		//we use their IP address to track if they have voted yet.
		/*const r = await fetch("/api/vote/hasVoted",{
			method: "GET",
		});
		const response = await r.json();
		if(response.message === "true"){
			//this user has voted already
		}
		if(response.message === "false"){
			//this user has not voted
		}*/
		if (id == 'upvote') {
			vote.up = !vote.up;
			vote.down = false;
		}
		if (id == 'downvote') {
			vote.down = !vote.down;
			vote.up = false;
		}
	};

	onMount(() => {
		appState.loadingStates.portal = false;
	});
</script>

<main class="space-y-3">
	<h2>{submission.title}</h2>
	<!--Content section-->
	<section id="content">
		<TrixDisplay content={submission.content} />
	</section>
	<!--Voting section-->
	<section id="voting" class="bg-base-200 grid w-full grid-cols-4 gap-2 rounded-lg p-2 lg:flex">
		<button
			onclick={() => handleVote('upvote')}
			id="upvote"
			class="btn {vote.up ? 'btn-primary' : 'btn-ghost'} text-xs"><ArrowBigUp /> 0</button
		>
		<button
			onclick={() => handleVote('downvote')}
			id="downvote"
			class="btn {vote.down ? 'btn-primary' : 'btn-ghost'} text-xs"><ArrowBigDown /> 0</button
		>
		<button class="btn btn-ghost text-xs"><MessageCircle /> 0</button>
	</section>
	<!--Comment section-->
	<section id="comments">
		<span class="flex items-center justify-between">
			<h3>Comments</h3>
			<button class="btn btn-primary text-xs" onclick={() => alert('Comments coming soon...')}
				>Add a comment</button
			>
		</span>
		{#each items as i}
			<div class="border-base-200 border-b p-4">
				<p class="flex items-center justify-between text-xs">
					Lethabo Maepa <span class="text-gray-500"
						>{i + Math.floor(Math.random() * 30)} minutes ago</span
					>
				</p>
				<p>You might wanna use such and such</p>
			</div>
		{/each}
	</section>
</main>
