<script>
	import { appState, currentUser } from '$lib/states.svelte.js';
	import { supabase } from '$lib/supabaseClient.js';
	import { onMount } from 'svelte';
	let { data } = $props();
	let sessionUser = $state(data.user);
	appState.setAppTitle('Dashboard');
	onMount(async () => {
		if (!sessionUser) {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			sessionUser = user;
			console.log(sessionUser);
		}
		if (sessionUser) {
			console.log(sessionUser);
			sessionUser.isLoggedIn = true;
			sessionUser.name =
				sessionUser?.user_metadata?.first_name ??
				sessionUser?.user_metadata?.full_name ??
				sessionUser?.user_metadata?.user_name;
		}
	});
</script>

<svelte:head>
	<title>Dashboard | ColearnSpace</title>
	<meta name="description" content="CoLearnSpace user's dashboard page" />
</svelte:head>

<div class="p-5 py-20">
	<h2>
		{sessionUser?.isLoggedIn
			? 'Welcome to your dashboard ' + sessionUser.name
			: 'You are not logged in'}
	</h2>
</div>
