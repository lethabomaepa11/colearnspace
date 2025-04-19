<script>
	import SideBar from '$lib/components/SideBar.svelte';

	let { children } = $props();
</script>

<main class="h-screen w-screen md:grid md:grid-cols-[250px_1fr]">
	<SideBar />
	<div class="md:col-start-2 md:overflow-auto md:p-4">
		{@render children()}
	</div>
</main>
