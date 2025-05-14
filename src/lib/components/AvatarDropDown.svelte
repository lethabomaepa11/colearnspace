<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { supabase } from '$lib/supabaseClient';
	import Loading from './Loading.svelte';
	import Modal from './Modal.svelte';
	let { user } = $props();
	const logout = async () => {
		actions.isLoading = true;
		const { error } = await supabase.auth.signOut();
		const res = await fetch('/api/user/logout');
		const result = await res.json();
		actions.isLoading = false;
		if (error || result.error) {
			actions.error = error;
		} else {
			actions.isLoggedOut = true;
			if (page.url.pathname == '/dashboard') window.location.href = '/portal';
			else window.location.reload();
		}
	};
	let actions = $state({
		isLoading: false,
		isLoggedOut: false,
		error: null
	});
</script>

<Modal
	title={actions.isLoggedOut ? 'Logged out' : actions.isLoading ? 'Loading...' : 'Logout'}
	id="logoutModal"
>
	{#if !actions.isLoading && !actions.error && !actions.isLoggedOut}
		<p>Are you sure you want to logout?</p>
		<div class="flex w-full gap-2">
			<button onclick={logout} class="btn btn-primary w-1/2">Yes</button>
			<button
				onclick={() => document.getElementById('logoutModal').close()}
				class="btn btn-outline w-1/2">No</button
			>
		</div>
	{:else if actions.isLoading}
		<Loading />
	{:else if actions.isLoggedOut}
		<p>Logged out successfully</p>
	{:else}
		<p>{actions.error.message}</p>
	{/if}
</Modal>
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 py-5 shadow-lg">
	<summary class="menu-title"><h2>{user.name}</h2></summary>
	<li><a href="/dashboard" class="text-base">Dashboard</a></li>
	<li>
		<button
			onclick={() => document.getElementById('logoutModal').showModal()}
			class="text-error text-base">Logout</button
		>
	</li>
</ul>
