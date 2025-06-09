<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { appState } from '$lib/states.svelte';

	const { data } = $props();
	let topic = $state({
		title: '',
		content: '<p>You can ask anything regarding this challenge, add links, images and more here</p>'
	});
	const handleSubmit = async (e) => {
		appState.loadingStates.portal = true;
		e.preventDefault();
		const res = await fetch(`/api/challenge/${page.params.challenge_slug}/topic`, {
			method: 'POST',
			body: JSON.stringify({ topic })
		});
		const response = await res.json();
		if (response.status == 200) {
			appState.loadingStates.portal = false;
			goto(`/portal/challenges/${page.params.challenge_slug}/community/${response.data.id}`);
		}
	};

	const metaContent = `Create a new topic in the ${data.challenge.title} challenge on ColearnSpace`;
</script>

<!--SEO-->
<svelte:head>
	<title>Create a Topic | ColearnSpace</title>
	<meta name="description" content={metaContent} />
	<meta property="og:description" content={metaContent} />
	<meta name="twitter:title" content="Create a Topic | ColearnSpace" />
	<meta name="twitter:description" content={metaContent} />
	<!-- Open Graph Meta Tags for Link Previews -->
	<meta property="og:title" content="Create a Topic | ColearnSpace" />
</svelte:head>
<form onsubmit={handleSubmit} method="POST" class="space-y-4">
	<h2>New Topic</h2>
	<span class="flex w-full flex-col items-start justify-between gap-5 lg:flex-row">
		<section class="w-full space-y-4">
			<div class="form-control flex w-full flex-col">
				<label class="label" for="title">
					<span class="label-text">Title</span>
				</label>
				<input
					id="title"
					type="text"
					placeholder="Your topic title"
					class="input input-bordered w-full"
					required
					minlength="5"
					bind:value={topic.title}
				/>
			</div>
			<div class="form-control flex w-full flex-col">
				<label class="label" for="title">
					<span class="label-text">Content</span>
				</label>
				<TrixEditor id="challenge_topic" bind:value={topic.content} />
			</div>
			<button type="submit" class="btn btn-primary mb-10 w-full">Submit topic</button>
		</section></span
	>
</form>
