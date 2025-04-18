<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<main class="">
	<div class=""></div>

	<NavBar isLoggedIn={data.isLoggedIn} user={data.user} />
	{@render children()}
</main>
