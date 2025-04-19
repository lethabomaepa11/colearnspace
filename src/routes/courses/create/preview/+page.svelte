<script>
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { onMount } from 'svelte';
	let { data } = $props();
	let course = $state('');
	let currentIndex = $state(0);
	let currentVideo = $state();

	onMount(() => {
		course = JSON.parse(localStorage.getItem('course'));
		if (course) {
			currentVideo = course.videos[0];
		}
		document.getElementById('infoModal').showModal();
	});

	function switchVideo(index) {
		currentIndex = index;
		currentVideo = course.videos[index];
	}
</script>

<svelte:head>
	<title>Course Preview | ColearnSpace</title>
	<meta name="description" content="Preview your course before publishing it" />
</svelte:head>
<Modal title="Course Preview" id="infoModal">
	<main class="space-y-5">
		<p>
			This is how the course will look like after being published, if you wish to edit the course,
			click on the edit button
		</p>
		<button
			onclick={() => document.getElementById('infoModal').close()}
			class="btn btn-primary w-full">Continue</button
		>
	</main>
</Modal>
{#if !course}
	<main class="flex min-h-screen w-screen flex-col items-center justify-center">
		<Loading />
	</main>
{:else}
	<section class="bg-base-100 min-h-screen px-6 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-10">
				<span class="text-primary mb-2 flex items-center justify-between text-4xl font-bold">
					<h1>{course.title}</h1>
					<a href="/courses/create" class="btn btn-primary">Edit</a>
				</span>
				<div class="mt-2 text-sm text-gray-500">
					📂 <a href="/courses#{course.category}" class="link link-hover">{course.category}</a> · 👤
					<span class="link link-hover">{data.user?.first_name || 'Your Name'}</span>
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
							src={`https://www.youtube.com/embed/${currentVideo.id}`}
							title={currentVideo.title || 'Video Title'}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
					<h2 class="text-primary mb-2 text-2xl font-semibold">
						{currentVideo.title || 'Video Title'}
					</h2>
				</div>

				<!-- Lesson List -->
				<div class="bg-base-200 sticky top-10 h-fit rounded-xl p-5 shadow-lg">
					<h3 class="mb-4 text-lg font-bold text-gray-700">📚 Lessons</h3>
					<ul class="space-y-3">
						{#each course.videos as video, i}
							<li
								class="hover:bg-primary cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition hover:text-white
                {i === currentIndex ? 'bg-primary text-white' : 'text-gray-700'}"
								onclick={() => switchVideo(i)}
							>
								{i + 1}. {video.title}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
		<TrixDisplay content={course.description} />

		<p class="mt-10">If you are ready to publish the Course, click on the button below</p>
		<button class="btn btn-primary mt-5 w-full">🚀 Publish Course</button>
	</section>
{/if}
