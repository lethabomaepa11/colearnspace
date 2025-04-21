<script>
	import DashBoardSideBar from '$lib/components/DashBoardSideBar.svelte';
	import { sideBar } from '$lib/states.svelte';

	let { children } = $props();
</script>

<main
	class="h-screen w-screen md:grid {sideBar.open
		? 'md:grid-cols-[250px_1fr]'
		: 'md:grid-cols-[150px_1fr]'}"
>
	<DashBoardSideBar />
	<div class="md:col-start-2 md:overflow-auto md:p-4">
		{@render children()}
	</div>
</main>
