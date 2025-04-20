<script>
	import { page } from '$app/state';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	// Simulated module data for demo
	let thisModule = $state({
		title: 'Module 1: HTML Basics',
		description: '<h1>HTML Basics</h1>',
		videos: [
			{ id: '_uQrJ0TkZlc&pp=ygUGY29kaW5n', title: 'Python Tutorial' },
			{ id: 'yfoY53QXEnI', title: 'HTML Crash Course for Beginners' }
		]
	});

	let currentIndex = $state(0);
	let currentVideo = $state(thisModule.videos[0]);
	let currentModuleIndex = $state(0);

	let nextModule = $state(null);

	function switchVideo(index) {
		currentIndex = index;
		currentVideo = thisModule.videos[index];
		console.log(currentVideo);
	}
	function handleNextModule() {
		window.location.href = `/courses/${page.params.slug}/module/${nextModule.slug}`;
	}
	onMount(() => {
		let localCourse = JSON.parse(localStorage.getItem('course'));
		if (localCourse) {
			let modules = JSON.parse(localStorage.getItem('modules'));
			if (modules) {
				currentModuleIndex = modules.findIndex((mod) => mod.slug === page.params.module_slug);
				thisModule = modules[currentModuleIndex];
				if (currentModuleIndex < modules.length - 1) {
					nextModule = modules[currentModuleIndex + 1];
				}
				switchVideo(0);
			}
		}
	});
</script>

<svelte:head>
	<title>{thisModule.title} | ColearnSpace</title>
	<meta name="description" content="Modules of a course" />
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
			<div class="mt-2 text-sm text-gray-500">
				🎬 {thisModule.videos.length} Videos
			</div>
		</div>
		{#if thisModule.videos.length > 0}
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
					<h3 class="mb-4 text-lg font-bold text-gray-700">📚 Videos</h3>
					<ul class="space-y-3">
						{#each thisModule.videos as video, i}
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
