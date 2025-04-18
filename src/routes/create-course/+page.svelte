<script lang="ts">
	let { data } = $props();

	let title = $state('');
	let category = $state('');
	let thumbnail = $state('');
	let videoUrls = $state(['']);
	let trixContent = $state('');

	function addVideo() {
		videoUrls.push('');
	}

	function removeVideo(index: number) {
		if (videoUrls.length > 1) {
			videoUrls.splice(index, 1);
		}
	}

	function handleSubmit() {
		// Add submission logic (e.g. send to Supabase)
		console.log({
			title,
			category,
			thumbnail,
			videos: videoUrls,
			description: trixContent
		});
	}
</script>

<section class="bg-base-200 min-h-screen px-4 py-16 md:px-10">
	<div class="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
		<h1 class="text-primary mb-8 text-3xl font-bold">📘 Create a Course</h1>

		<form class="space-y-8" on:submit|preventDefault={handleSubmit}>
			<!-- Title -->
			<div>
				<label class="label font-bold">Course Title</label>
				<input
					type="text"
					class="input input-bordered w-full"
					placeholder="e.g. Fullstack Web Dev"
					bind:value={title}
				/>
			</div>

			<!-- Category -->
			<div>
				<label class="label font-bold">Category</label>
				<input
					type="text"
					class="input input-bordered w-full"
					placeholder="e.g. Programming"
					bind:value={category}
				/>
			</div>

			<!-- Thumbnail -->
			<div>
				<label class="label font-bold">Thumbnail URL</label>
				<input
					type="text"
					class="input input-bordered w-full"
					placeholder="Paste image URL"
					bind:value={thumbnail}
				/>
			</div>

			<!-- Video Links -->
			<div>
				<label class="label font-bold">YouTube Videos (for this course)</label>
				<div class="grid gap-4 md:grid-cols-2">
					{#each videoUrls as url, i (i)}
						<div class="relative">
							<input
								type="url"
								class="input input-bordered w-full"
								placeholder="https://youtube.com/watch?v=..."
								bind:value={videoUrls[i]}
							/>
							{#if videoUrls.length > 1}
								<button
									type="button"
									class="absolute top-2 right-2 text-red-500"
									on:click={() => removeVideo(i)}
								>
									✖
								</button>
							{/if}
						</div>
					{/each}
				</div>
				<button type="button" on:click={addVideo} class="btn btn-outline mt-4">
					➕ Add Video
				</button>
			</div>

			<!-- Description -->
			<div>
				<label class="label font-bold">Course Description</label>
				<input id="trix-input" type="hidden" bind:value={trixContent} />
				<trix-editor input="trix-input" class="bg-white"></trix-editor>
			</div>

			<!-- Submit -->
			<div>
				<button class="btn btn-primary w-full">🚀 Publish Course</button>
			</div>
		</form>
	</div>
</section>

<style>
	trix-editor {
		background-color: white;
		border-radius: 0.5rem;
		padding: 1rem;
		min-height: 200px;
	}
	trix-toolbar {
		border-radius: 0.5rem;
		background-color: white;
	}
</style>
