<script>
	import { page } from '$app/state';
	import { LogIn, LucideBook, PlusCircle, User } from '@lucide/svelte';
	let { isLoggedIn } = $props();
</script>

<div class="dock md:hidden">
	<a
		href="/courses"
		class="{page.url.pathname === '/courses' ? 'dock-active text-primary' : ''} dock-label"
	>
		<LucideBook />
		<span class="dock-label">Courses</span>
	</a>

	<a
		href="/courses/create"
		class="{page.url.pathname.includes('/courses/create')
			? 'dock-active text-primary'
			: ''} dock-label"
	>
		<PlusCircle />
		<span class="dock-label">Create</span>
	</a>

	{#if isLoggedIn}
		<a
			href="/profile"
			class="{page.url.pathname === '/profile' ? 'dock-active text-primary ' : ''} dock-label"
			><User /> <span class="dock-label">You</span></a
		>
	{:else}
		<a
			href="/auth/login"
			class="{page.url.pathname === '/auth/login' ? 'dock-active text-primary' : ''} dock-label"
			><LogIn /> <span class="dock-label">Login</span></a
		>
	{/if}
</div>
