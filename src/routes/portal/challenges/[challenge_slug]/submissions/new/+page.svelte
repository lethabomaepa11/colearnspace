<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { appState } from '$lib/states.svelte';
	import Seo from '$lib/components/SEO.svelte';

	let submission = $state({
		title: '',
		content:
			'<blockquote>Add links, screenshots or anything to showcase your solution to the challenge</blockquote>',
		cover_image: ''
	});
	const { data } = $props();

	const handleSubmit = async () => {
		appState.loadingStates.portal = true;
		const res = await fetch(`/api/challenge/${page.params.challenge_slug}/submission`, {
			method: 'POST',
			body: JSON.stringify({ submission })
		});
		const response = await res.json();
		if (response.success) {
			appState.loadingStates.portal = false;
			goto(`/portal/challenges/${page.params.challenge_slug}/submissions/${response.data.id}`);
		}
	};
	const metaContent = `Create a submission for ${data.challenge.title} challenge on ColearnSpace`;
</script>

<!--SEO-->
<Seo title="Create a Submission | ColearnSpace" desc={metaContent} />

<form onsubmit={handleSubmit} class="space-y-4">
	<h2>New Submission</h2>
	<span class="flex w-full flex-col items-start justify-between gap-5 lg:flex-row">
		<section class="w-full space-y-4">
			<div class="form-control flex w-full flex-col">
				<label class="label" for="title">
					<span class="label-text">Title</span>
				</label>
				<input
					id="title"
					type="text"
					placeholder="Your project title"
					class="input input-bordered w-full"
					required
					minlength="5"
					bind:value={submission.title}
				/>
			</div>
			<div class="form-control flex w-full flex-col">
				<label class="label" for="title">
					<span class="label-text">Content</span>
				</label>
				<TrixEditor id="challenge_submissions" bind:value={submission.content} />
			</div>
			<button type="submit" class="btn btn-primary mb-10 w-full">Submit entry</button>
		</section></span
	>
</form>
