<script lang="ts">
	import { page } from '$app/state';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { appState, sideBar, theme } from '$lib/states.svelte';
	import { beforeNavigate } from '$app/navigation';

	let { children, data } = $props();
	let { isLoggedIn, user } = data;

	beforeNavigate(({ from, to }) => {
		//clear states that need to be cleared on every navigation

		//clearing the mobile sidebars that might be open
		sideBar.dashboardSideBar = false;
		sideBar.docsSideBar = false;
	});

	onMount(() => {
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

<NavBar {isLoggedIn} {user} />
{@render children()}
<BottomNav />
