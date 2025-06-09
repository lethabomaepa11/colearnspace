<script>
	import TrixEditor from '$lib/components/TrixEditor.svelte';

	let topic = $state({
		title: '',
		content: '<p>You can ask anything regarding this challenge, add links, images and more here</p>'
	});

	const handleSubmit = async () => {
		const res = await fetch('/api/challenge/topic', {
			method: 'POST',
			body: JSON.stringify({ topic })
		});
	};
</script>

<form class="space-y-4">
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
