<script>
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

	let search = '';
	let selectedCategory = 'All';

	$: filteredCourses = courses.filter((course) => {
		const matchTitle = course.title.toLowerCase().includes(search.toLowerCase());
		const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
		return matchTitle && matchCategory;
	});

	let categories = ['All', ...new Set(courses.map((c) => c.category))];
</script>

<svelte:head>
	<title>Courses | ColearnSpace</title>
	<meta name="description" content="Explore a wide range of skill courses on ColearnSpace" />
</svelte:head>
<section class="bg-base-100 min-h-screen px-6 py-24">
	<div class="mx-auto max-w-7xl">
		<h1 class="font-poetsen text-primary mb-12 text-center text-4xl font-bold">
			Explore Public Skill Courses
		</h1>

		<!-- Filters -->
		<div class="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
			<input
				type="text"
				placeholder="🔍 Search for a course..."
				bind:value={search}
				class="input input-lg input-bordered w-full md:max-w-md"
			/>

			<select
				bind:value={selectedCategory}
				class="select select-lg select-bordered w-full md:max-w-xs"
			>
				{#each categories as cat}
					<option value={cat}>{cat}</option>
				{/each}
			</select>
		</div>

		<!-- Grid of Courses -->
		{#if filteredCourses.length > 0}
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
