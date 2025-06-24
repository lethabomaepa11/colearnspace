<script lang="ts">
	import { page } from '$app/state';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { appState, currentUser, theme } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { fly } from 'svelte/transition';
	import Loading from '$lib/components/Loading.svelte';

	let { children, data } = $props();
	let sessionUser = $state(data.user);

	let isLoading = $state(true);
	onMount(async () => {
		isLoading = false;
		//get theme from localstorage
		theme.darkTheme = localStorage.getItem('darkTheme') === 'true'; //if it is true, set the theme to dark
		//check if the user is on mobile
		if (screen.availWidth < 768) {
			appState.isMobile = true;
		}

		//if the user is not in session, get the user from supabase auth and store them in the session
		if (!sessionUser) {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			sessionUser = user;
		}
		if (sessionUser) {
			sessionUser.isLoggedIn = true;
			sessionUser.name =
				sessionUser?.user_metadata?.first_name ??
				sessionUser?.user_metadata?.full_name ??
				sessionUser?.user_metadata?.user_name;

			const { data: user } = await supabase.from('user').select().eq('id', sessionUser.id);

			if (user.length === 0) {
				await supabase.from('user').insert({
					id: sessionUser.id,
					name: sessionUser.name,
					username: sessionUser.email.split('@')[0],
					email: sessionUser.email
				});
			}
		}
		if (!sessionUser) {
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
		<NavBar user={sessionUser} />
		{@render children()}
		<BottomNav user={sessionUser} />
	</main>
{/if}
