<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { Info } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let course = $state({
		title: '',
		category: '',
		description: '',
		author: '',
		videos: [],
		thumbnail: ''
	});
	let isLoading = $state(false);
	function addVideo() {
		course.videos.push('');
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
	function removeVideo(index: number) {
		if (course.videos.length > 1) {
			course.videos.splice(index, 1);
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
		course.videos = await processVideos(course.videos);
		//save to localstorage for preview
		localStorage.setItem('course', JSON.stringify(course));
		window.location.href = '/courses/create/preview';
	}
	onMount(() => {
		isLoading = true;
		course = JSON.parse(localStorage.getItem('course'));
		if (course) {
			course.videos = course.videos.map((video) => {
				return 'https://www.youtube.com/watch?v=' + video.id;
			});
		}
		isLoading = false;
	});
</script>

<svelte:head>
	<title>Create a Course | ColearnSpace</title>
	<meta name="description" content="Create a course on ColearnSpace" />
</svelte:head>

{#if isLoading}
	<main class="flex min-h-screen items-center justify-center">
		<Loading />
	</main>
{:else}
	<section class="bg-base-100 min-h-screen py-20 md:px-10">
		<div class="mx-auto w-full bg-white p-8 md:max-w-5xl md:rounded-2xl md:shadow-xl">
			<span class="text-primary mb-8 flex w-full items-center justify-between text-3xl font-bold">
				<h1>📘 Create a Course</h1>
				<button
					class="btn btn-circle text-primary"
					onclick={() => document.getElementById('infoModal').showModal()}><Info /></button
				>
			</span>
			<Modal title="Getting Started" id="infoModal">
				<p>
					Creating a course has never been so easy, you just need to paste the youtube video links
					of the videos you want to include into your course, then click preview button to verify if
					everything is working as expected.
				</p>
			</Modal>

			<form class="space-y-8" onsubmit={handleSubmit}>
				<!-- Title -->
				<div>
					<label class="label font-bold">Course Title</label>
					<input
						type="text"
						class="input input-bordered w-full"
						placeholder="e.g. Fullstack Web Dev"
						bind:value={course.title}
					/>
				</div>

				<!-- Category -->
				<div>
					<label class="label font-bold">Category</label>
					<input
						type="text"
						class="input input-bordered w-full"
						placeholder="e.g. Programming"
						bind:value={course.category}
					/>
				</div>

				<!-- Thumbnail -->
				<div>
					<label class="label font-bold">Thumbnail URL</label>
					<input
						type="text"
						class="input input-bordered w-full"
						placeholder="Paste image URL"
						bind:value={course.thumbnail}
					/>
				</div>

				<!-- Video Links -->
				<div>
					<label class="label font-bold">YouTube videos (for this course)</label>
					<div class="grid gap-4 md:grid-cols-2">
						{#each course.videos as url, i (i)}
							<div class="relative">
								<input
									type="url"
									class="input input-bordered w-full"
									placeholder="https://youtube.com/watch?v=..."
									bind:value={course.videos[i]}
								/>
								{#if course.videos.length > 1}
									<button
										type="button"
										class="absolute top-2 right-2 text-red-500"
										onclick={() => removeVideo(i)}
									>
										✖
									</button>
								{/if}
							</div>
						{/each}
					</div>
					<button type="button" onclick={addVideo} class="btn btn-outline mt-4">
						➕ Add Youtube Video link
					</button>
				</div>

				<!-- Description -->
				<div>
					<label for="description" class="label font-bold">Course Description</label>
					<TrixEditor bind:value={course.description} />
				</div>

				<!-- Submit -->
				<div>
					<button class="btn btn-primary w-full">🚀 Preview Course</button>
				</div>
			</form>
		</div>
	</section>
{/if}
