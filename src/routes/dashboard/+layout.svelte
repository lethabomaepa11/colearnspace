<script>
	import DashBoardSideBar from '$lib/components/DashBoardSideBar.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { sideBar } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { onMount } from 'svelte';

	let { children, data } = $props();
	let { isLoggedIn } = data;
</script>

<main class="h-screen w-screen md:grid md:grid-cols-[250px_1fr]">
	<DashBoardSideBar />
	{#if !isLoggedIn}
		<Loading />
	{:else}
		<div class="p-5 py-20 md:col-start-2">
			{@render children()}
		</div>
	{/if}
</main>
