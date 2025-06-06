<script>
	import TrixEditor from '$lib/components/TrixEditor.svelte';

	let submission = $state({
		title: '',
		content:
			'<blockquote>Add links, screenshots or anything to showcase your solution to the challenge</blockquote>',
		cover_image: ''
	});
</script>

<form class="space-y-4">
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
