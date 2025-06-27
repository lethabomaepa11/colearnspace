<script>
	import { page } from '$app/state';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { appState, sideBar, theme } from '$lib/states.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';

	let { children, data } = $props();
	let { isLoggedIn, user } = data;

	beforeNavigate(({ to }) => {
		sideBar.dashboardSideBar = false;
		sideBar.docsSideBar = false;

		NProgress.start();
	});

	afterNavigate(() => {
		NProgress.done();
	});

	onMount(() => {
		theme.darkTheme = localStorage.getItem('darkTheme') === 'true';

		if (screen.availWidth < 768) {
			appState.isMobile = true;
		}

		if (!isLoggedIn) {
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
