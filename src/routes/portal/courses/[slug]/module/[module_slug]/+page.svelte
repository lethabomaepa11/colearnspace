<script>
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft, Youtube } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	let isLoading = $state(true);
	let thisModule = $state({
		title: '',
		description: '',
		module_videos: []
	});
	let course = $state(data.course);
	let currentIndex = $state(0);
	let currentVideo = $state(thisModule.module_videos[0]);
	let currentModuleIndex = $state(0);

	let nextModule = $state(null);

	function switchVideo(index) {
		currentIndex = index;
		currentVideo = thisModule.module_videos[index];
	}
	function handleNextModule() {
		if (page.params.slug !== 'preview') {
			//track course progress
		}
		isLoading = true;
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
		isLoading = false;
	});
</script>

<svelte:head>
	<title>{thisModule.title}</title>
	<meta name="description" content="{thisModule.title} module of {course.title} course" />
	<meta property="og:image" content="/favicon.png" />
	<meta property="og:description" content="{thisModule.title} module of {course.title} course" />
	<meta property="og:title" content={thisModule.title} />
	<meta name="twitter:title" content={thisModule.title} />
	<meta name="twitter:description" content="{thisModule.title} module of {course.title} course" />
	<meta name="twitter:image" content="/favicon.png" />
</svelte:head>
{#if isLoading}
	<main class="flex min-h-screen w-full items-center justify-center">
		<Loading text="Loading Module" textClass="text-2xl font-bold" />
	</main>
{:else}
	<section transition:slide class="bg-base-100 min-h-screen px-6 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-10">
				<BackButtonHeader title={thisModule.title} />
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
					<div class="sticky top-10 h-fit rounded-xl border p-5 shadow-lg">
						<h3 class="mb-4 text-lg font-bold">Embedded Youtube Videos</h3>
						<ul class="grid w-full space-y-3">
							{#each thisModule.module_videos as video, i}
								<button
									class="hover:bg-primary {currentIndex === i
										? 'bg-primary text-white'
										: ''} flex w-full cursor-pointer items-center gap-2 rounded-md py-2 text-sm font-medium transition hover:text-white"
									onclick={() => switchVideo(i)}
								>
									{i + 1}.
									<p class=" text-left">{video.title}</p>
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
{/if}
