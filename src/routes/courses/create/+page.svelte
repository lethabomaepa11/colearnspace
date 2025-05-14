<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { Info } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	let { data } = $props();

	let course = $state({
		title: '',
		category: '',
		description: '',
		author: '',
		slug: ''
	});
	//module object: {title: '', description: '', videos: []}
	let isLoading = $state(false);

	async function handleSubmit() {
		isLoading = true;
		//course.videos = await processVideos(course.videos);
		//save to localstorage for preview
		course.slug = course.title.toLowerCase().replace(/ /g, '-');
		localStorage.setItem('course', JSON.stringify(course));

		isLoading = false;
		document.getElementById('courseInfoModal').showModal();
	}
	onMount(() => {
		//load from localstorage, if a course from local storage exists, autofill the form
		isLoading = true;
		let localCourse = JSON.parse(localStorage.getItem('course'));
		if (localCourse) {
			course = localCourse;
		}
		isLoading = false;
	});
</script>

<svelte:head>
	<title>Create a Course | ColearnSpace</title>
	<meta name="description" content="Create a course on ColearnSpace" />
</svelte:head>
<Modal title="Getting Started" id="infoModal">
	<p>
		Creating a course has never been so easy, you just need to paste the youtube video links of the
		videos you want to include into your course, then click preview button to verify if everything
		is working as expected.
	</p>
</Modal>
<Modal title="Next steps" id="courseInfoModal">
	<p>In the next page, you will create modules, make sure to have your youtube video links ready</p>
	<a href="/courses/create/modules" class="btn btn-primary mt-2 w-full">Proceed</a>
</Modal>
{#if isLoading}
	<main class="flex min-h-screen items-center justify-center">
		<Loading />
	</main>
{:else}
	<section transition:fly class="bg-base-100 min-h-screen py-20 md:px-10">
		<div class="mx-auto w-full p-8 md:max-w-5xl md:rounded-2xl md:shadow-xl">
			<span class="mb-8 flex w-full items-center justify-between text-3xl font-bold">
				<h1>📘 Create a Course</h1>
				<button
					class="btn btn-circle text-primary"
					onclick={() => document.getElementById('infoModal').showModal()}><Info /></button
				>
			</span>

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
				<!-- Description -->
				<div>
					<label for="description" class="label font-bold">Course Description</label>
					<TrixEditor id="description" bind:value={course.description} />
				</div>

				<!-- Submit -->
				<div>
					<button class="btn btn-primary w-full">Continue</button>
				</div>
			</form>
		</div>
	</section>
{/if}
