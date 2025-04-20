<script lang="ts">
	import { page } from '$app/state';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { theme } from '$lib/states.svelte';

	let { children, data } = $props();
	onMount(() => {
		theme.darkTheme = localStorage.getItem('darkTheme') === 'true';
	});
</script>

<main class="">
	<div class=""></div>

	<NavBar isLoggedIn={data.isLoggedIn} user={data.user} />
	{@render children()}
	<BottomNav isLoggedIn={data.isLoggedIn} />
</main>
