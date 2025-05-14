<script>
	import { goto } from '$app/navigation';
	import SideBar from '$lib/components/SideBar.svelte';
	import { courseSearch } from '$lib/states.svelte';
	import { Youtube } from '@lucide/svelte';
	import moment from 'moment';
	import { slide } from 'svelte/transition';

	let { data } = $props();
	let courses = $state(data.courses);

	let selectedCategory = $state('All');
	let filteredCourses = $state(courses);

	const clean = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/gi, ''); // removes punctuation/special chars

	$effect(() => {
		filteredCourses = courses.filter((course) => {
			const matchTitle = clean(course.title).includes(clean(courseSearch.text));
			const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
			return matchTitle && matchCategory;
		});
	});

	//get  the courses a thumbnail
	courses = courses.map((course) => {
		let thumbnail = 'https://colearnspace.netlify.app/site/branding/ColearnSpace-icon2.png'; //default

		let totalVideos = course.module.reduce((acc, mod) => acc + mod.module_videos.length, 0);
		course = { ...course, totalVideos: totalVideos };

		if (totalVideos != 0) {
			thumbnail = course.module.find((mod) => mod.module_videos.length > 0).module_videos[0].id;
			thumbnail = `https://img.youtube.com/vi/${thumbnail}/hqdefault.jpg`;
		}
		course = { ...course, thumbnail };
		return course;
	});

	let categories = ['All', ...new Set(courses.map((c) => c.category))];
</script>

<svelte:head>
	<title>Courses | ColearnSpace</title>
	<meta name="description" content="Explore a wide range of skill courses on ColearnSpace" />
</svelte:head>

<section transition:slide class="bg-base-100 min-h-screen w-full px-6 py-24 md:w-[80svw]">
	<div class="mx-auto max-w-7xl">
		<!-- Filters -->
		<div class="mb-8 flex w-full items-center gap-4 overflow-x-auto">
			{#each categories as cat}
				<button
					class="btn btn-sm {selectedCategory === cat ? 'btn-primary ' : ' btn-neutral'}"
					onclick={() => (selectedCategory = cat)}>{cat}</button
				>
			{/each}
		</div>

		<!-- Grid of Courses -->
		{#if filteredCourses.length > 0}
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredCourses as course}
					<a
						href={`/portal/courses/${course.slug}`}
						class="bg-base-200 group overflow-hidden rounded-xl transition duration-300 hover:shadow-xl"
					>
						<div class="relative overflow-hidden">
							<img
								src={course.thumbnail}
								alt={course.title}
								class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
							/>
							<span
								class="bg-primary absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
							>
								{course.category}
							</span>
						</div>
						<div class="p-5">
							<h3 class="text-primary text-lg font-bold group-hover:underline">
								{course.title}
							</h3>
							<button class="z-30 mt-1 text-sm text-gray-600">by {course.user.name}</button>
							<div class="mt-3 flex items-center justify-between text-xs text-gray-500">
								{#if course.totalVideos != 0}
									<span class="flex items-center gap-1"><Youtube /> YouTube Embedded</span>
								{/if}
								<span>{moment(course.created_at).fromNow()}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<p class="mt-20 text-center text-lg text-gray-500">No courses found.</p>
		{/if}
	</div>
</section>
