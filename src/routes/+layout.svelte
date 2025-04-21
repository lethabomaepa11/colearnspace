<script lang="ts">
	import { page } from '$app/state';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { currentUser, theme } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';

	let { children, data } = $props();
	let sessionUser = $state(data.user);
	onMount(async () => {
		theme.darkTheme = localStorage.getItem('darkTheme') === 'true';
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
	});
</script>

<main class="">
	<div class=""></div>

	<NavBar user={sessionUser} />
	{@render children()}
	<BottomNav user={sessionUser} />
</main>
