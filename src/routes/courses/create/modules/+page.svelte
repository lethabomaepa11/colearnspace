<script>
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { ArrowLeft, Plus } from '@lucide/svelte';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	let course = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let modules = $state([
		{
			title: 'Module 1',
			description: '<h1>Module 1 description</h1>',
			videos: [],
			slug: ''
		},
		{
			title: 'Module 2',
			description: '<h1>Module 2 description</h1>',
			videos: [],
			slug: ''
		}
	]);
	onMount(() => {
		isLoading = true;
		course = JSON.parse(localStorage.getItem('course'));
		if (!course) {
			window.location.href = '/courses/create';
		} else {
			let localModules = JSON.parse(localStorage.getItem('modules'));
			if (localModules) {
				modules = localModules;
				modules.map((mod) => {
					mod.videos = mod.videos.map((video) => {
						return 'https://www.youtube.com/watch?v=' + video.id;
					});
				});
			}
		}
		//document.getElementById('infoModal').showModal();
		isLoading = false;
	});
	function addModule(index) {
		modules.push({
			title: `Module ${modules.length + 1}`,
			description: `<h1>Module ${modules.length + 1} description</h1>`,
			videos: []
		});
	}
	function addVideo(index) {
		modules[index].videos.push('');
	}
	async function getYouTubeTitle(videoUrlOrId) {
		const videoId = extractYouTubeID(videoUrlOrId);
		const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;

		const res = await fetch(url);
		if (!res.ok) throw new Error('Failed to fetch video data');

		const data = await res.json();
		console.log(data);
		return data.title;
	}
	function extractYouTubeID(url) {
		const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
		return match ? match[1] : null;
	}
	function removeVideo(modIndex, vidIndex) {
		if (modules[modIndex].videos.length > 1) {
			modules[modIndex].videos.splice(vidIndex, 1);
		}
	}
	async function processVideos(videos) {
		return await Promise.all(
			videos.map(async (video) => {
				const id = extractYouTubeID(video);
				const title = await getYouTubeTitle(video);
				return { id, title };
			})
		);
	}
	async function handleSubmit() {
		isLoading = true;

		// Validation
		for (let i = 0; i < modules.length; i++) {
			const mod = modules[i];

			// Validate title
			if (!mod.title.trim()) {
				errorMessage = `Module ${i + 1} title cannot be empty.`;
				document.getElementById('errorModal').showModal();
				isLoading = false;
				return;
			}

			// Validate description
			if (!mod.description.trim() || mod.description.trim() === '<h1></h1>') {
				errorMessage = `'<b>${mod.title}</b>' module description cannot be empty.`;
				document.getElementById('errorModal').showModal();
				isLoading = false;
				return;
			}

			// Validate video URLs
			for (let j = 0; j < mod.videos.length; j++) {
				const url = mod.videos[j];
				if (!url.trim()) {
					errorMessage = `Video ${j + 1} in '<b>${mod.title}</b>' module ${i + 1} cannot be empty.`;
					document.getElementById('errorModal').showModal();
					isLoading = false;
					return;
				}
				if (!extractYouTubeID(url)) {
					errorMessage = `Video ${j + 1} in '<b>${mod.title}</b>' module is not a valid YouTube link.`;
					document.getElementById('errorModal').showModal();
					isLoading = false;
					return;
				}
			}
		}

		// Process videos
		await Promise.all(
			modules.map(async (mod, i) => {
				modules[i].videos = await processVideos(mod.videos);
			})
		);

		//add slug
		modules.map((mod) => {
			mod.slug =
				mod.title.replace(/\s+/g, '-').toLowerCase() + '-' + Math.floor(Math.random() * 1000);
		});
		// Save to localStorage for preview
		localStorage.setItem('modules', JSON.stringify(modules));

		isLoading = false;

		// Rebuild video URLs for preview
		modules.map((mod) => {
			mod.videos = mod.videos.map((video) => {
				return 'https://www.youtube.com/watch?v=' + video.id;
			});
		});

		document.getElementById('previewModal').showModal();
	}
</script>

<svelte:head>
	<title>Add Modules | ColearnSpace</title>
	<meta name="description" content="Add modules to your course" />
</svelte:head>
<Modal title="Something Went Wrong😓" id="errorModal">
	<p class=" text-error">{@html errorMessage ? errorMessage : 'Something went wrong'}</p>
	<button
		onclick={() => document.getElementById('errorModal').close()}
		class="btn btn-ghost mt-5 w-full">Try again</button
	>
</Modal>
<Modal title="How to add modules" id="infoModal">
	<p>1. Click on the accordion and rename your module</p>
	<p>2. Then you will need to add your module description or instructions</p>
	<p>3. Finally, you can add videos to your module</p>
	<p>4. Remember that only youtube videos are supported</p>
</Modal>
<Modal title="Preview" id="previewModal">
	<p>Preview of your course</p>
	<p>The next page will be a preview of the course when it gets published.</p>
	<a href="/courses/preview" class="btn btn-primary mt-2 w-full">Proceed</a>
</Modal>
{#if isLoading}
	<main class="flex min-h-screen items-center justify-center">
		<Loading />
	</main>
{:else}
	<main transition:slide class="py-20">
		<span class="text-primary mb-2 flex items-center justify-between text-4xl font-bold">
			<h1>
				<a href="/courses/create" class="btn btn-outline btn-circle text-black"><ArrowLeft /></a>
				{course.title}
			</h1>
		</span>
		<section class="space-y-5 p-3">
			{#each modules as mod, i}
				<div class="collapse-arrow bg-base-100 border-base-300 collapse border">
					<input type="radio" name="modules" />
					<div class="collapse-title font-semibold">
						<input type="text" bind:value={mod.title} class="input input-bordered z-[5] w-full" />
					</div>
					<div class="collapse-content text-sm">
						<TrixEditor id={mod.title} bind:value={mod.description} />
						<!-- Video Links -->
						<div>
							<label class="label font-bold">YouTube videos (for this module)</label>
							<div class="grid gap-4 md:grid-cols-2">
								{#each mod.videos as url, m (m)}
									<div class="relative">
										<input
											type="url"
											class="input input-bordered w-full"
											placeholder="https://youtube.com/watch?v=..."
											bind:value={modules[i].videos[m]}
										/>
										{#if mod.videos.length > 1}
											<button
												type="button"
												class="absolute top-2 right-2 text-red-500"
												onclick={() => removeVideo(i, m)}
											>
												✖
											</button>
										{/if}
									</div>
								{/each}
							</div>
							<button type="button" onclick={() => addVideo(i)} class="btn btn-outline mt-4">
								<Plus /> Add Youtube Video link
							</button>
						</div>
					</div>
				</div>
			{/each}
			<button type="button" onclick={() => addModule(modules.length)} class="btn btn-outline mt-4">
				<Plus /> Add Module
			</button>
		</section>
		<div>
			<button onclick={handleSubmit} class="btn btn-primary w-full">Continue</button>
		</div>
	</main>
{/if}
