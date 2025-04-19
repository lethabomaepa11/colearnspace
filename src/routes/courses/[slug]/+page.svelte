<script>
	import { page } from '$app/state';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { onMount } from 'svelte';

	// Simulated course data for demo
	let course = {
		title: 'Beginner Web Development',
		category: 'Web Development',
		description: 'Learn HTML, CSS, JavaScript, and React — from scratch to basic apps.',
		author: 'MusaTech',
		videos: [
			{ title: 'HTML Basics', videoId: 'UB1O30fR-EE' },
			{ title: 'CSS Crash Course', videoId: 'yfoY53QXEnI' },
			{ title: 'JavaScript for Beginners', videoId: 'hdI2bqOjy3c' },
			{ title: 'React Basics', videoId: 'bMknfKXIFA8' }
		]
	};

	let currentIndex = 0;
	let currentVideo = course.videos[currentIndex];

	function switchVideo(index) {
		currentIndex = index;
		currentVideo = course.videos[index];
	}
</script>

<section class="bg-base-100 min-h-screen px-6 py-20">
	<div class="mx-auto max-w-6xl">
		<div class="mb-10">
			<h1 class="text-primary mb-2 text-4xl font-bold">{course.title}</h1>
			<div class="mt-2 text-sm text-gray-500">
				📂 <a href="/courses#{course.category}" class="link link-hover">{course.category}</a> · 👤
				<a href="/author/{course.author}" class="link link-hover">{course.author}</a>
				· 🎬 {course.videos.length} Lessons
			</div>
		</div>

		<!-- Video & Lesson Layout -->
		<div class="grid gap-10 lg:grid-cols-3">
			<!-- Video Player -->
			<div class="lg:col-span-2">
				<div class="mb-4 h-[300px] w-full overflow-hidden rounded-xl">
					<iframe
						class="h-full w-full rounded-xl"
						src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
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
				<h3 class="mb-4 text-lg font-bold text-gray-700">📚 Lessons</h3>
				<ul class="space-y-3">
					{#each course.videos as video, i}
						<li
							class="hover:bg-primary cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition hover:text-white
                {i === currentIndex ? 'bg-primary text-white' : 'text-gray-700'}"
							on:click={() => switchVideo(i)}
						>
							{i + 1}. {video.title}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<TrixDisplay content={course.description} />
</section>
