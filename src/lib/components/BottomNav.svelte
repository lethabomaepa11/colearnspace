<script>
	import { page } from '$app/state';
	import { currentUser } from '$lib/states.svelte';
	import { LogIn, LucideBook, PlusCircle, User } from '@lucide/svelte';
	import AvatarDropDown from './AvatarDropDown.svelte';
	let { user } = $props();
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

	{#if user?.isLoggedIn}
		<div class="{page.url.pathname === '/dashboard' ? 'dock-active text-primary' : ''} dock-label">
			<div class="dropdown dropdown-top dropdown-center">
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div tabindex="0" class="flex cursor-pointer flex-col items-center gap-2">
					{#if user?.user_metadata?.avatar_url}
						<img
							src={user.user_metadata.avatar_url}
							alt="user avatar"
							class="h-8 w-8 rounded-full object-cover"
						/>
					{:else}
						<User />
					{/if}
					<span class="dock-label">You</span>
				</div>
				<AvatarDropDown {user} />
			</div>
		</div>
	{:else}
		<a
			href="/auth/login"
			class="{page.url.pathname === '/auth/login' ? 'dock-active text-primary' : ''} dock-label"
			><LogIn /> <span class="dock-label">Login</span></a
		>
	{/if}
</div>
