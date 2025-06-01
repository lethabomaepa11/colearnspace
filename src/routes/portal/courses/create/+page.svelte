<script lang="ts">
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
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
		slug: '',
		visibility: 'Public',
		colors: {
			light: '#FC6519',
			dark: '#FC6519'
		}
	});
	let sameColors = $state(true);
	//module object: {title: '', description: '', videos: []}
	let isLoading = $state(false);

	async function handleSubmit() {
		isLoading = true;
		//course.videos = await processVideos(course.videos);
		//save to localstorage for preview
		course.slug = course.title.replace(/\s|\\|\/+/g, '-').toLowerCase(); //Create a slug by replacing spaces and / \ characters
		if (course.slug === 'create') {
			//deal with the possibility of having a course called "create", by adding a random string
			course.slug = 'create-' + Date.now().toString().substring(0, 5);
		}

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
	<div class="collapse-arrow bg-base-100 border-base-300 collapse border">
		<input type="radio" name="my-accordion-2" checked="checked" />
		<div class="collapse-title font-semibold">How do I create a course?</div>
		<div class="collapse-content text-sm">
			<ol class="list-decimal p-5">
				<li>Fill out the form.</li>
				<li>Enter the category your course belongs to.</li>
				<li>Choose your course visibility.</li>
				<li>You can customize your course colors.</li>
				<li>Add your course description, it will be visible on the homepage of your course</li>
				<li>Click on "Continue" to create modules in the next page.</li>
			</ol>
		</div>
	</div>
	<div class="collapse-arrow bg-base-100 border-base-300 collapse border">
		<input type="radio" name="my-accordion-2" />
		<div class="collapse-title font-semibold">Creating modules</div>
		<div class="collapse-content text-sm">
			<p>After clicking "Continue", you will be redirected to the modules page</p>
			<ol class="list-disc p-5">
				<li>You can add more than 1 module</li>
				<li>
					Each module has a title, content and embedded youtube videos, all you need is a youtube
					video link
				</li>
				<li>
					After creating all your modules, you can proceed to preview your course before publishing
					it
				</li>
			</ol>
		</div>
	</div>
	<div class="collapse-arrow bg-base-100 border-base-300 collapse border">
		<input type="radio" name="my-accordion-2" />
		<div class="collapse-title font-semibold">Colors</div>
		<div class="collapse-content text-sm">
			<ol class="list-disc px-5">
				<li>The colors are used to style your course</li>
				<li>You can choose any color you prefer</li>
				<li>You can choose whether you want to use the same color for light and dark mode</li>
				<li>
					If you do not wish to use the same color for both modes, you can specify and add your
					second color
				</li>
			</ol>
		</div>
	</div>
</Modal>
<Modal title="Next steps" id="courseInfoModal">
	<p>In the next page, you will create modules</p>
	<a href="/portal/courses/create/modules" class="btn btn-primary mt-2 w-full">Proceed</a>
</Modal>
{#if isLoading}
	<main class="flex min-h-screen items-center justify-center">
		<Loading />
	</main>
{:else}
	<section transition:fly class="bg-base-100 min-h-screen py-20 md:px-10">
		<div class="mx-auto w-full p-8 md:max-w-5xl">
			<BackButtonHeader title="Create a Course">
				<button
					class="btn btn-circle text-primary"
					onclick={() => document.getElementById('infoModal').showModal()}><Info /></button
				>
			</BackButtonHeader>

			<form class="space-y-8" onsubmit={handleSubmit}>
				<span class="flex w-full flex-col items-start justify-between gap-5 lg:flex-row">
					<span class="w-full">
						<!-- Title -->
						<div>
							<label class="label font-bold">Course Title</label>
							<input
								type="text"
								class="input input-bordered w-full"
								placeholder="e.g. Fullstack Web Dev"
								bind:value={course.title}
								required
								minlength="5"
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
								required
								minlength="5"
							/>
						</div>
						<!-- Visibility -->
						<label class="label" for="visbility">Visibility</label>
						<select
							id="visibility"
							class="select select-bordered w-full"
							placeholder="Who can take this course?"
							bind:value={course.visibility}
						>
							<option>Public</option>
							<option disabled>Organization Members - Coming soon</option>
						</select>
					</span>
					<fieldset class="fieldset border-base-300 rounded-box w-full border p-4">
						<legend class="fieldset-legend">Theme</legend>
						<label class="label" for="code">Customize your course colors</label>
						<span id="code" class="input w-full p-0" placeholder="Create an 8 character code">
							<span class="btn rounded-none">Color in light mode</span>
							<input
								type="color"
								bind:value={course.colors.light}
								onchange={() => {
									if (sameColors) {
										course.colors.dark = course.colors.light;
									}
								}}
							/>
						</span>
						<div class="join flex items-center gap-3">
							<span class="join-item">Same Colors for dark and light mode?</span>
							<input
								class="join-item btn {sameColors ? 'bg-primary' : ''}"
								type="radio"
								onclick={() => (sameColors = true)}
								name="options"
								aria-label="Yes"
							/>
							<input
								class="join-item btn {!sameColors ? 'bg-primary' : ''}"
								type="radio"
								name="options"
								aria-label="No"
								onclick={() => (sameColors = false)}
							/>
						</div>
						{#if !sameColors}
							<span id="code" class="input w-full p-0">
								<span class="btn rounded-none">Color in dark mode</span>
								<input type="color" bind:value={course.colors.dark} />
							</span>
						{/if}
					</fieldset>
				</span>
				<!-- Description -->
				<div>
					<label for="description" class="label font-bold">Course Description</label>
					<TrixEditor colors={course.colors} id="description" bind:value={course.description} />
				</div>

				<!-- Submit -->
				<div>
					<button class="btn btn-primary w-full">Continue</button>
				</div>
			</form>
		</div>
	</section>
{/if}
