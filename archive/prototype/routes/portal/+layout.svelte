<script>
	import Loading from '$lib/components/Loading.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import { appState, sideBar } from '$lib/states.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		appState.loadingStates.portal = false;
	});
</script>

<main
	class="h-screen w-screen md:grid {sideBar.open
		? 'md:grid-cols-[250px_1fr]'
		: 'md:grid-cols-[150px_1fr]'}"
>
	<SideBar />

	<div class="md:col-start-2 md:overflow-auto md:p-4">
		{#if appState.loadingStates.portal}
			<main class="flex min-h-screen items-center justify-center">
				<Loading />
			</main>
		{:else}
			{@render children()}
		{/if}
	</div>
</main>
