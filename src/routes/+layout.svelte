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
	let isUserOnline = $state(true);
	const checkOnlineStatus = async () => {
		try {
			const response = await fetch('https://fakerapi.it/api/v1/texts?_quantity=1&_characters=20');
			return response.status >= 200 && response.status < 300;
		} catch (error) {
			return false; //the user is most likely offline (not connected to the internet)
		}
	};
	onMount(async () => {
		//get theme from localstorage
		theme.darkTheme = localStorage.getItem('darkTheme') === 'true';
		//check if the user is on mobile
		console.log(screen.availWidth);
		if (screen.availWidth < 768) {
			appState.isMobile = true;
			console.log(appState.isMobile);
		}

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
		setInterval(async () => {
			isUserOnline = await checkOnlineStatus();
		}, 30000);
	});
</script>

<svelte:head>
	<title>ColearnSpace</title>
	<meta
		name="description"
		content="ColearnSpace is your digital skill building and showcasing hub — crafted for curious,
				creative and innovative minds. Skip the chaos of YouTube playlists and dive into structured,
				community-powered courses designed for growth, support, and learning at your pace, or build and
				post projects to showcase your skills."
	/>
</svelte:head>
<main class="">
	{#if !isUserOnline}
		<div transition:fly={{ y: 20, duration: 300 }} class="toast toast-bottom z-50">
			<!-- Keep your existing DaisyUI markup unchanged -->
			<div
				class="notification alert alert-error mb-2 flex items-center gap-3 rounded-lg p-4 text-sm font-medium shadow-lg"
			>
				Connection Lost <br />
				<Loading text="Reconnecting..." textClass="text-md" />
			</div>
		</div>
	{/if}

	<NavBar user={sessionUser} />
	{@render children()}
	<BottomNav user={sessionUser} />
</main>
