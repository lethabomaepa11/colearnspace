<script lang="ts">
	import { page } from '$app/state';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { appState, session, theme } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { fly } from 'svelte/transition';
	import Loading from '$lib/components/Loading.svelte';

	let { children, data } = $props();
	let { isLoggedIn, user } = data;

	let isLoading = $state(true);
	onMount(async () => {
		isLoading = false;
		//get theme from localstorage
		theme.darkTheme = localStorage.getItem('darkTheme') === 'true'; //if it is true, set the theme to dark
		//check if the user is on mobile
		if (screen.availWidth < 768) {
			appState.isMobile = true;
		}

		if (!isLoggedIn) {
			//if the user is not logged in, create a uuid for this user and store it in localstorage as an anonymous user
			const anon_user = localStorage.getItem('anon_user');
			if (!anon_user) {
				localStorage.setItem('anon_user', crypto.randomUUID());
			}
		}
	});
</script>

{#if isLoading}
	<main class="flex min-h-screen items-center justify-center">
		<Loading />
	</main>
{:else}
	<main class="">
		<NavBar {isLoggedIn} {user} />
		{@render children()}
		<BottomNav />
	</main>
{/if}
