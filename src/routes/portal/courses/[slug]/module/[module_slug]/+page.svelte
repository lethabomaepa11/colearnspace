<script>
	import { page } from '$app/state';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft, Youtube } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();
	// Simulated module data for demo
	let thisModule = $state({
		title: 'Module 1: HTML Basics',
		description: '<h1>HTML Basics</h1>',
		module_videos: [
			{ id: '_uQrJ0TkZlc&pp=ygUGY29kaW5n', title: 'Python Tutorial' },
			{ id: 'yfoY53QXEnI', title: 'HTML Crash Course for Beginners' }
		]
	});
	let course = $state(data.course);
	let currentIndex = $state(0);
	let currentVideo = $state(thisModule.module_videos[0]);
	let currentModuleIndex = $state(0);

	let nextModule = $state(null);

	function switchVideo(index) {
		currentIndex = index;
		currentVideo = thisModule.module_videos[index];
		console.log(currentVideo);
	}
	function handleNextModule() {
		window.location.href = `/portal/courses/${page.params.slug}/module/${nextModule.slug}`;
	}
	onMount(() => {
		if (page.params.slug === 'preview') {
			course = JSON.parse(localStorage.getItem('course'));
			course.module = JSON.parse(localStorage.getItem('modules'));
		}
		if (course) {
			if (course.module) {
				currentModuleIndex = course.module.findIndex((mod) => mod.slug === page.params.module_slug);
				thisModule = course.module[currentModuleIndex];
				if (currentModuleIndex < course.module.length - 1) {
					nextModule = course.module[currentModuleIndex + 1];
				}
				switchVideo(0);
			}
		}
	});
</script>

<svelte:head>
	<title>{thisModule.title} | ColearnSpace</title>
	<meta name="description" content="Module of a course" />
</svelte:head>
<section transition:slide class="bg-base-100 min-h-screen px-6 py-20">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10">
			<div class="flex items-center gap-1">
				<button onclick={() => window.history.back()} class="btn btn-outline btn-circle text-black"
					><ArrowLeft /></button
				>
				<h1 class="text-primary mb-2 text-4xl font-bold">{thisModule.title}</h1>
			</div>
			<div class="mt-2 flex items-center gap-1 text-sm text-gray-500">
				<Youtube />
				{thisModule.module_videos.length} video{thisModule.module_videos.length == 1 ? '' : 's'}
			</div>
		</div>
		{#if thisModule.module_videos.length > 0}
			<!-- Video & Lesson Layout -->
			<div class="grid gap-10 lg:grid-cols-3">
				<!-- Video Player -->
				<div class="lg:col-span-2">
					<div class="mb-4 h-[300px] w-full overflow-hidden rounded-xl">
						<iframe
							class="h-full w-full rounded-xl"
							src={`https://www.youtube.com/embed/${currentVideo.id}`}
							title={currentVideo.title}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
					<h2 class="text-primary mb-2 text-2xl font-semibold">{currentVideo.title}</h2>
				</div>

				<!-- Lesson List -->
				<div class="bg-base-200 sticky top-10 h-fit rounded-xl p-5 shadow-lg">
					<h3 class="mb-4 text-lg font-bold text-gray-700">📚 module_videos</h3>
					<ul class="space-y-3">
						{#each thisModule.module_videos as video, i}
							<button
								class="hover:bg-primary cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition hover:text-white
                {i === currentIndex ? 'bg-primary text-white' : 'text-gray-700'}"
								onclick={() => switchVideo(i)}
							>
								{i + 1}. {video.title}
							</button>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>

	<div class="mt-5"></div>
	<TrixDisplay content={thisModule.description} />

	{#if nextModule}
		<button onclick={handleNextModule} class="btn btn-primary mt-5"
			>Next Module: {nextModule.title}</button
		>
	{:else}
		<button class="btn btn-primary mt-5">Complete Course</button>
	{/if}
	{#if page.params.slug === 'preview'}
		<button class="btn btn-primary mt-5">Publish Course</button>
	{/if}
</section>
