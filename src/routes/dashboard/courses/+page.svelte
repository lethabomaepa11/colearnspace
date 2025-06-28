<script>
	import { appState } from '$lib/states.svelte';
	import { NotebookPen, UserPen, Youtube } from '@lucide/svelte';
	import moment from 'moment';

	appState.setAppTitle('Courses');

	const { data } = $props();
	const { courses } = data;
	console.log(courses);
</script>

<!-- name of each tab group should be unique -->
<div class="tabs tabs-lift">
	<label class="tab">
		<input type="radio" name="course_page_tabs" checked />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="me-2 size-4"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
			/></svg
		>
		My Courses
	</label>
	<div class="tab-content bg-base-100 border-base-300 p-6">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each courses as course}
				<a
					href={`/portal/courses/${course.slug}`}
					class="bg-base-200 group overflow-hidden rounded-xl transition duration-300 hover:shadow-xl"
				>
					<div class="relative overflow-hidden">
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
	</div>

	<label class="tab">
		<input type="radio" name="course_page_tabs" />
		<NotebookPen />
		Course Enrollement
	</label>
	<div class="tab-content bg-base-100 border-base-300 p-6">Coming soon...</div>
</div>
