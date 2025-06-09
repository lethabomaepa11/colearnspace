<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft, Youtube } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();
	let isLoading = $state(false);
	let course = $state(data.course);
	let totalVideos = $state(0);
	let thumbnail = $state(
		'https://{course.title} | ColearnSpace.netlify.app/site/branding/{course.title} | ColearnSpace-icon2.png'
	); //default
	onMount(() => {
		isLoading = true;
		let localCourse = JSON.parse(localStorage.getItem('course'));
		if (!localCourse && page.params.slug == 'preview') {
			window.location.href = '/portal/courses/create';
		}
		if (localCourse && page.params.slug == 'preview') {
			course = localCourse;
			let modules = JSON.parse(localStorage.getItem('modules'));
			if (modules) {
				course = { ...course, module: modules };
				//search for a module that has a video, use the id of the first video in that module
			}
		}

		totalVideos = course.module.reduce((acc, mod) => acc + mod.module_videos.length, 0);
		if (totalVideos != 0) {
			thumbnail = course.module.find((mod) => mod.module_videos.length > 0).module_videos[0].id;
			thumbnail = `https://img.youtube.com/vi/${thumbnail}/hqdefault.jpg`;
			console.log(course);
		}
		isLoading = false;
	});

	const startCourse = () => {
		goto(`/portal/courses/${course.slug}/module/${course.module[0].slug}`);
	};
</script>

<svelte:head>
	<title>{course.title} | ColearnSpace</title>
	<meta name="description" content="{course.title} course on ColearnSpace" />
	<meta property="og:image" content="/favicon.png" />
	<meta property="og:description" content="{course.title} course on ColearnSpace" />
	<meta property="og:title" content="{course.title} | ColearnSpace" />
	<meta name="twitter:title" content="{course.title} | ColearnSpace" />
	<meta name="twitter:description" content="{course.title} course on ColearnSpace" />
	<meta name="twitter:image" content="/favicon.png" />
</svelte:head>

{#if isLoading}
	<Loading />
{:else if course}
	<section transition:slide class="bg-base-100 min-h-screen px-6 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-10">
				<BackButtonHeader title={course.title} />
				<div class="mt-2 flex flex-wrap items-center text-sm text-gray-500">
					📂 <a href="/portal/courses#{course.category}" class="link link-hover"
						>{course.category}</a
					>
					· 👤
					<a href="/author/{course.user?.username}" class="link link-hover">{course.user?.name}</a>
					· {course.module.length} Modules ·
					<span class="flex items-center gap-1"
						><Youtube />
						{totalVideos} Youtube video{totalVideos == 1 ? '' : 's'}</span
					>
				</div>
			</div>
			<main class="flex w-full flex-col items-start justify-between gap-3 md:flex-row">
				<!-- Video & Lesson Layout -->
				<TrixDisplay content={course.description} />
				<div class="grid w-full gap-10">
					<!-- Module List -->
					<div class="bg-base-100 sticky top-10 h-fit rounded-xl p-5 shadow-lg">
						<span class="mb-4 flex items-center justify-between">
							<h3 class="text-lg font-bold">Modules</h3>
							<button class="btn btn-primary" onclick={startCourse}>Start Course</button>
						</span>
						<ul class="space-y-3">
							{#each course.module as mod, i}
								<li
									class="hover:bg-primary cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition hover:text-white
                "
								>
									<button class="link link-hover" title="{course.title}/module/{mod.title}"
										>{i + 1}. {mod.title}</button
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</main>
		</div>
		<div class="mt-5"></div>

		<button class="btn btn-primary mt-5" onclick={startCourse}>Start course</button>
		{#if page.params.slug === 'preview'}
			<button class="btn btn-primary mt-5">Publish Course</button>
		{/if}
	</section>
{/if}
