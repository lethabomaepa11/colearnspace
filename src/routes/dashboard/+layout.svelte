<script>
	import DashBoardSideBar from '$lib/components/DashBoardSideBar.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { appState, sideBar } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { onMount } from 'svelte';

	let { children, data } = $props();
	let { isLoggedIn } = data;
</script>

<main class="h-screen w-screen md:grid md:grid-cols-[250px_1fr]">
	{#if sideBar.dashboardSideBar || !appState.isMobile}
		<DashBoardSideBar />
	{/if}
	<div class="p-5 py-20 md:col-start-2">
		{@render children()}
	</div>
</main>
