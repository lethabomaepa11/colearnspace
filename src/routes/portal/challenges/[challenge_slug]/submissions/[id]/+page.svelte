<script>
	import { page } from '$app/state';
	import CommentInput from '$lib/components/CommentInput.svelte';
	import Comments from '$lib/components/Comments.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { appState } from '$lib/states.svelte.js';
	import Seo from '$lib/components/SEO.svelte';
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
	const { isLoggedIn, submission, comments, feature } = data;
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
	const metaContent = `View ${submission.title} submission for ${data.challenge.title} challenge on ColearnSpace`;
</script>

<!--SEO-->
<Seo title="{submission.title} | ColearnSpace" desc={metaContent} />

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
		<button class="btn btn-ghost text-xs"><MessageCircle /> {comments.length}</button>
	</section>
	<Comments {isLoggedIn} {feature} data={comments} />
</main>
