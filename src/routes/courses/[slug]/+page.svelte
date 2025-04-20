<script>
	import { page } from '$app/state';
	import Loading from '$lib/components/Loading.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft, Youtube } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	// Simulated course data for demo
	let isLoading = $state(false);
	let course = $state({
		title: 'Beginner Web Development',
		category: 'Web Development',
		description: 'Learn HTML, CSS, JavaScript, and React — from scratch to basic apps.',
		author: 'MusaTech',
		modules: [
			{
				title: 'Module 1: HTML Basics',
				description: '<h1>HTML Basics</h1>',
				videos: [
					{ id: 'UB1O30fR-EE', title: 'HTML Tutorial for Beginners' },
					{ id: 'yfoY53QXEnI', title: 'HTML Crash Course for Beginners' }
				]
			},
			{
				title: 'Module 2: CSS Crash Course',
				description: '<h1>CSS Crash Course</h1>',
				videos: [
					{ id: 'UB1O30fR-EE', title: 'CSS Tutorial for Beginners' },
					{ id: 'yfoY53QXEnI', title: 'CSS Crash Course in One Video' }
				]
			},
			{
				title: 'Module 3: JavaScript for Beginners',
				description: '<h1>JavaScript for Beginners</h1>',
				videos: [
					{ id: 'UB1O30fR-EE', title: 'JavaScript Tutorial for Beginners' },
					{ id: 'yfoY53QXEnI', title: 'Beginner JavaScript Crash Course' }
				]
			},
			{
				title: 'Module 4: React Basics',
				description: '<h1>React Basics</h1>',
				videos: [
					{ id: 'UB1O30fR-EE', title: 'React Tutorial for Beginners' },
					{ id: 'yfoY53QXEnI', title: 'React Crash Course 2023' }
				]
			}
		]
	});
	let totalVideos = $state(0);
	let thumbnail = $state('https://colearnspace.netlify.app/site/branding/ColearnSpace-icon2.png'); //default
	onMount(() => {
		isLoading = true;
		let localCourse = JSON.parse(localStorage.getItem('course'));
		if (localCourse) {
			course = localCourse;
			let modules = JSON.parse(localStorage.getItem('modules'));
			if (modules) {
				course.modules = modules;

				totalVideos = modules.reduce((acc, mod) => acc + mod.videos.length, 0);
				if (totalVideos != 0) {
					thumbnail = modules.find((mod) => mod.videos.length > 0).videos[0].id;
					thumbnail = `https://img.youtube.com/vi/${thumbnail}/hqdefault.jpg`;
				}
				//search for a module that has a video, use the id of the first video in that module
				isLoading = false;
			}
		}
	});
</script>

{#if isLoading}
	<Loading />
{:else}
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
					📂 <a href="/courses#{course.category}" class="link link-hover">{course.category}</a> · 👤
					<a href="/author/{course.author}" class="link link-hover">{course.author}</a>
					· {course.modules.length} Modules ·
					<span class="flex items-center gap-1"
						><Youtube />
						{totalVideos} Youtube videos</span
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
								href="/courses/{page.params.slug}/module/{course.modules[0].slug}"
								class="link link-primary">Start Course</a
							>
						</span>
						<ul class="space-y-3">
							{#each course.modules as mod, i}
								<li
									class="hover:bg-primary cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition hover:text-white
                "
								>
									{#if i === 0}
										<a
											href="/courses/{page.params.slug}/module/{mod.slug}"
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
			href="/courses/{page.params.slug}/module/{course.modules[0].slug}"
			class="btn btn-primary mt-5">Start course</a
		>
		{#if page.params.slug === 'preview'}
			<button class="btn btn-primary mt-5">Publish Course</button>
		{/if}
	</section>
{/if}
