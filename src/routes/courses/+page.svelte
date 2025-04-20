<script>
	import SideBar from '$lib/components/SideBar.svelte';
	import { courseSearch } from '$lib/states.svelte';
	import { slide } from 'svelte/transition';

	let courses = [
		{
			title: 'HTML, CSS & JavaScript 101',
			category: 'Web Development',
			author: 'MusaTech',
			videoId: 'dD2EISBDjWM',
			slug: 'web-dev-basics'
		},
		{
			title: 'UI Design Fundamentals',
			category: 'UI/UX Design',
			author: 'KeaLearn',
			videoId: '3a4J2U8vHvg',
			slug: 'ui-design-fundamentals'
		},
		{
			title: 'Python for Beginners',
			category: 'Programming',
			author: 'CodeBro',
			videoId: 'rfscVS0vtbw',
			slug: 'python-data-basics'
		},
		{
			title: 'Graphic Design Basics',
			category: 'Design',
			author: 'CreativeBae',
			videoId: '8g3YzN6q7Zk',
			slug: 'graphic-design-basics'
		}
	];

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
						href={`/courses/${course.slug}`}
						class="bg-base-200 group overflow-hidden rounded-xl shadow-lg transition duration-300 hover:shadow-xl"
					>
						<div class="relative overflow-hidden">
							<img
								src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`}
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
							<p class="mt-1 text-sm text-gray-600">by {course.author}</p>
							<div class="mt-3 flex items-center justify-between text-xs text-gray-500">
								<span>🎥 YouTube Embedded</span>
								<span>📘 Beginner Friendly</span>
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
