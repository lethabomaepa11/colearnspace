<script>
	import DashBoardSideBar from '$lib/components/DashBoardSideBar.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { sideBar } from '$lib/states.svelte';
	import { onMount } from 'svelte';

	let { children, data } = $props();
	let sessionUser = $state(data.user);
	onMount(async () => {
		if (!sessionUser) {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			sessionUser = user;
		}
		if (sessionUser) {
			sessionUser.isLoggedIn = true;
		}
	});
</script>

<main class="h-screen w-screen md:grid md:grid-cols-[250px_1fr]">
	<DashBoardSideBar />
	{#if !sessionUser}
		<Loading />
	{:else}
		<div class="md:col-start-2 md:overflow-auto md:p-4">
			{@render children()}
		</div>
	{/if}
</main>
