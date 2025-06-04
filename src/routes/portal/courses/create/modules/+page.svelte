<script>
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { ArrowLeft, Plus, Trash } from '@lucide/svelte';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	let course = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let errorModulesIndex = $state([]);
	let modules = $state([
		{
			title: 'Module 1',
			description: '<h1>Module 1 description</h1>',
			module_videos: [],
			slug: ''
		}
	]);
	onMount(() => {
		isLoading = true;
		course = JSON.parse(localStorage.getItem('course'));
		if (!course) {
			window.location.href = '/portal/courses/create';
		} else {
			let localModules = JSON.parse(localStorage.getItem('modules'));
			if (localModules) {
				modules = localModules;
				modules.map((mod) => {
					mod.module_videos = mod.module_videos.map((video) => {
						return 'https://www.youtube.com/watch?v=' + video.id;
					});
				});
			}
		}
		//document.getElementById('infoModal').showModal();
		isLoading = false;
	});
	function addModule(index) {
		let title = `Module ${modules.length + 1}`;

		modules.push({
			title,
			description: `<h1>${title} description</h1>`,
			module_videos: []
		});
	}
	function addVideo(index) {
		modules[index].module_videos.push('');
	}
	async function getYouTubeTitle(videoUrlOrId) {
		const videoId = extractYouTubeID(videoUrlOrId);
		const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;

		const res = await fetch(url);
		if (!res.ok) throw new Error('Failed to fetch video data');

		const data = await res.json();
		return data.title;
	}
	function extractYouTubeID(url) {
		const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
		return match ? match[1] : null;
	}
	function removeVideo(modIndex, vidIndex) {
		modules[modIndex].module_videos.splice(vidIndex, 1);
	}
	function removeModule(modIndex) {
		modules.splice(modIndex, 1);
	}
	async function processmodule_videos(module_videos) {
		return await Promise.all(
			module_videos.map(async (video) => {
				const id = extractYouTubeID(video);
				const title = await getYouTubeTitle(video);
				return { id, title };
			})
		);
	}
	async function handleSubmit() {
		isLoading = true;
		errorModulesIndex = [];
		// Validation
		for (let i = 0; i < modules.length; i++) {
			const mod = modules[i];

			// Validate title
			if (!mod.title.trim()) {
				errorMessage = `Module ${i + 1} title cannot be empty.`;
				errorModulesIndex.push(i);
				document.getElementById('errorModal').showModal();
				isLoading = false;
				return;
			}
			//check if there is no module with the same name
			const hasTitleDuplicates = modules.some((modul, m) => {
				if (modul.title == mod.title && i != m) {
					errorMessage = `The title '${mod.title}' has been duplicated 
					on Module ${i + 1} and Module ${m + 1}, please use different module title.`;
					errorModulesIndex.push(i);
					errorModulesIndex.push(m);
					document.getElementById('errorModal').showModal();
					isLoading = false;
					return true;
				}
				return false;
			});
			if (hasTitleDuplicates) {
				return;
			}
			// Validate description
			if (!mod.description.trim() || mod.description.trim() === '<h1></h1>') {
				errorMessage = `'<b>${mod.title}</b>' module description cannot be empty.`;
				document.getElementById('errorModal').showModal();
				errorModulesIndex.push(i);
				isLoading = false;
				return;
			}

			// Validate video URLs
			for (let j = 0; j < mod.module_videos.length; j++) {
				const url = mod.module_videos[j];
				if (!url.trim()) {
					errorMessage = `Video ${j + 1} in '<b>${mod.title}</b>' module ${i + 1} cannot be empty.`;
					errorModulesIndex.push(i);
					document.getElementById('errorModal').showModal();
					isLoading = false;
					return;
				}
				if (!extractYouTubeID(url)) {
					errorMessage = `Video ${j + 1} in '<b>${mod.title}</b>' module is not a valid YouTube link.`;
					errorModulesIndex.push(i);
					document.getElementById('errorModal').showModal();
					isLoading = false;
					return;
				}
			}
		}

		// Process module_videos
		await Promise.all(
			modules.map(async (mod, i) => {
				modules[i].module_videos = await processmodule_videos(mod.module_videos);
			})
		);

		//add slug
		modules.map((mod) => {
			mod.slug = mod.title.replace(/\s|\\|\/+/g, '-').toLowerCase(); //Create a slug by replacing spaces and / \ characters
			if (mod.slug === 'create') {
				//deal with the possibility of having a mod called "create", by adding a random string
				mod.slug = 'create-' + Date.now().toString().substring(0, 5);
			}
		});
		// Save to localStorage for preview
		localStorage.setItem('modules', JSON.stringify(modules));

		isLoading = false;

		// Rebuild video URLs for preview
		modules.map((mod) => {
			mod.module_videos = mod.module_videos.map((video) => {
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
	<p>3. Finally, you can add module_videos to your module</p>
	<p>4. Remember that only youtube module_videos are supported</p>
</Modal>
<Modal title="Preview" id="previewModal">
	<p>Preview of your course</p>
	<p>The next page will be a preview of the course when it gets published.</p>
	<a href="/portal/courses/preview" class="btn btn-primary mt-2 w-full">Proceed</a>
</Modal>
{#if isLoading}
	<main class="flex min-h-screen items-center justify-center">
		<Loading />
	</main>
{:else}
	<main transition:slide class="py-20">
		<BackButtonHeader title={course.title} />
		<section class="space-y-5 p-3">
			{#each modules as mod, i}
				<div
					class="collapse-arrow {errorModulesIndex.includes(i)
						? 'border-error border-2'
						: 'border-base-300'} bg-base-100 collapse border"
				>
					<input type="radio" name="modules" />

					<div class="collapse-title flex items-center gap-2 font-semibold">
						<p>{i + 1}</p>
						{#if modules.length > 1}
							<button
								type="button"
								class="btn btn-ghost top-0 right-0 z-20 rounded-full text-red-500"
								onclick={() => removeModule(i)}
							>
								<Trash />
							</button>
						{/if}
						<input type="text" bind:value={mod.title} class="input input-bordered z-[5] w-full" />
					</div>
					<div class="collapse-content text-sm">
						<TrixEditor
							colors={course.colors}
							id={course.slug + '-' + i}
							bind:value={mod.description}
						/>
						<!-- Video Links -->
						<div>
							<label class="label font-bold">YouTube module_videos (for this module)</label>
							<div class="grid gap-4 md:grid-cols-2">
								{#each mod.module_videos as url, m (m)}
									<div class="input input-bordered relative flex w-full items-center">
										<p>{m + 1}</p>
										<input
											type="url"
											class=" w-full"
											placeholder="https://youtube.com/watch?v=..."
											bind:value={modules[i].module_videos[m]}
										/>
										<button
											type="button"
											class="btn btn-ghost text-red-500"
											onclick={() => removeVideo(i, m)}
										>
											<Trash />
										</button>
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
