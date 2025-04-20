<script>
	import { page } from '$app/state';
	import { courseSearch, sideBar, theme } from '$lib/states.svelte';
	import { LogIn, Menu, Moon, Plus, Search, Sun, User } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import CoursesTopNav from './CoursesTopNav.svelte';
	let { isLoggedIn, user } = $props();
	let infoPages = ['/about', '/contact', '/faq', '/', '/auth/login', '/auth/register'];
</script>

<div
	class="navbar bg-base-100/95 fixed z-10 rounded border-b backdrop-blur {theme.darkTheme
		? 'border-gray-700'
		: 'border-gray-100'}"
>
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<Menu />
			</div>
			<ul
				class="menu menu-xl dropdown-content bg-base-100 rounded-box z-1 mt-3 w-[50svw] p-2 shadow-xl"
			>
				{#if infoPages.includes(page.url.pathname)}
					<li><a href="/" class="text-base">Home</a></li>
					<li>
						<details>
							<summary class="text-base">Courses</summary>
							<ul class="p-2">
								<li><a class="text-base" href="/courses/categories">Categories</a></li>
								<li><a class="text-base" href="/courses">All Courses</a></li>
							</ul>
						</details>
					</li>
					<li><a class="text-base" href="/about">About</a></li>
					<li><a class="text-base" href="/contact">Contact</a></li>
					<li><a class="text-base" href="/faq">FAQ</a></li>
				{/if}
			</ul>
		</div>
		<div class="flex h-full overflow-hidden">
			<button onclick={sideBar.toggle} tabindex="0" class="btn btn-ghost hidden lg:flex">
				<Menu />
			</button>
			<a href="/" class="btn btn-ghost">
				<img src="/site/branding/ColearnSpace-full.png" class="h-[100px]" alt="ColearnSpace logo" />
			</a>
		</div>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal z-1 px-1">
			{#if infoPages.includes(page.url.pathname)}
				<li><a href="/" class="text-base">Home</a></li>
				<li>
					<details>
						<summary class="text-base">Courses</summary>
						<ul class="p-2">
							<li><a class="text-base" href="/courses/categories">Categories</a></li>
							<li><a class="text-base" href="/courses">All Courses</a></li>
						</ul>
					</details>
				</li>
				<li><a class="text-base" href="/about">About</a></li>
				<li><a class="text-base" href="/contact">Contact</a></li>
				<li><a class="text-base" href="/faq">FAQ</a></li>
			{/if}
		</ul>
	</div>
	{#if page.url.pathname === '/courses'}
		<CoursesTopNav />
	{/if}

	<div class="navbar-end flex items-center gap-4">
		{#if !infoPages.includes(page.url.pathname)}
			<a href="/courses/create" class="btn btn-outline hidden items-center justify-center md:flex"
				><Plus /> Create</a
			>
		{/if}
		<button class="btn btn-ghost btn-circle lg:hidden" onclick={courseSearch.toggleMobileSearch}
			><Search /></button
		>
		<label class="swap swap-rotate">
			<input
				type="checkbox"
				onclick={theme.toggleTheme}
				bind:checked={theme.darkTheme}
				value="dim"
				class="theme-controller hidden"
			/>
			{#if theme.darkTheme}
				<Sun />
			{:else}
				<Moon />
			{/if}
		</label>

		{#if isLoggedIn}
			<a href="/profile" class="btn btn-primary btn-circle hidden text-base text-white md:flex"
				><User /></a
			>
		{:else}
			<a href="/auth/login" class="btn btn-primary btn-circle hidden text-base text-white md:flex"
				><LogIn /></a
			>
		{/if}
	</div>
</div>
