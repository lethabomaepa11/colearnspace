<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Loading from '$lib/components/Loading.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft, Youtube } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();
	let isLoading = $state(false);
	let course = $state(data.course);
	let totalVideos = $state(0);
	let thumbnail = $state('https://colearnspace.netlify.app/site/branding/ColearnSpace-icon2.png'); //default
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
</script>

<svelte:head>
	<title>Course | ColearnSpace</title>
	<meta name="description" content="Course" />
</svelte:head>

{#if isLoading}
	<Loading />
{:else if course}
	<section transition:slide class="bg-base-100 min-h-screen px-6 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-10">
				<div class="flex items-center gap-1">
					<button
						onclick={() => window.history.back()}
						class="btn btn-outline btn-circle text-black"><ArrowLeft /></button
					>
					<h1 class="text-primary mb-2 text-4xl font-bold">{course.title}</h1>
				</div>
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
				<div class="md:w-[80svw]">
					<div
						style="position: relative; width: 100%; max-width: 560px; aspect-ratio: 16 / 9; background-color: #000; cursor: pointer;"
					>
						<img
							src={thumbnail}
							alt="{course.title} Thumbnail"
							style="width: 100%; height: 100%; object-fit: cover;"
						/>
					</div>
				</div>
				<!-- Video & Lesson Layout -->

				<div class="grid w-full gap-10">
					<!-- Module List -->
					<div class="bg-base-200 sticky top-10 h-fit rounded-xl p-5 shadow-lg">
						<span class="mb-4 flex items-center justify-between">
							<h3 class="text-lg font-bold text-gray-700">Modules</h3>
							<a
								href="/portal/courses/{page.params.slug}/module/{course.module[0].slug}"
								class="link link-primary">Start Course</a
							>
						</span>
						<ul class="space-y-3">
							{#each course.module as mod, i}
								<li
									class="hover:bg-primary cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition hover:text-white
                "
								>
									{#if i === 0}
										<a
											href="/portal/courses/{page.params.slug}/module/{mod.slug}"
											class="link link-hover"
											title="{course.title}/module/{mod.title}">{i + 1}. {mod.title}</a
										>
									{:else}
										<button class="link link-hover" title="{course.title}/module/{mod.title}"
											>{i + 1}. {mod.title}</button
										>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</main>
		</div>
		<div class="mt-5"></div>
		<TrixDisplay content={course.description} />
		<a
			href="/portal/courses/{page.params.slug}/module/{course.module[0].slug}"
			class="btn btn-primary mt-5">Start course</a
		>
		{#if page.params.slug === 'preview'}
			<button class="btn btn-primary mt-5">Publish Course</button>
		{/if}
	</section>
{/if}
