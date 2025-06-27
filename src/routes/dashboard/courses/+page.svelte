<script>
	import { appState } from '$lib/states.svelte';
	import { NotebookPen, UserPen } from '@lucide/svelte';

	appState.setAppTitle('Courses');

	const { data } = $props();
	const { courses } = data;
</script>

<!-- name of each tab group should be unique -->
<div class="tabs tabs-lift">
	<label class="tab">
		<input type="radio" name="my_tabs_4" />
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
	<div class="tab-content bg-base-100 border-base-300 p-6">My Courses</div>

	<label class="tab">
		<input type="radio" name="my_tabs_4" checked="checked" />
		<NotebookPen />
		Course Enrollement
	</label>
	<div class="tab-content bg-base-100 border-base-300 p-6">Course Enrollement</div>
</div>
