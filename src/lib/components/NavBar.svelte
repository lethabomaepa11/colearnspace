<script>
	import { page } from '$app/state';
	import { LogIn, Menu, User } from '@lucide/svelte';
	let { isLoggedIn, user } = $props();
	let infoPages = ['/about', '/contact', '/faq', '/', '/auth/login', '/auth/register'];
</script>

<div class="navbar bg-base-100/95 fixed z-10 rounded border-b border-gray-200 backdrop-blur">
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
		<a href="/" class="btn btn-ghost text-xl">
			<img src="/site/branding/ColearnSpace-full.png" class="h-[120px]" alt="ColearnSpace logo" />
		</a>
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
	<div class="navbar-end">
		{#if isLoggedIn}
			<a href="/profile" class="btn btn-primary btn-circle text-base text-white"><User /></a>
		{:else}
			<a href="/auth/login" class="btn btn-primary text-base text-white"><LogIn /> Login</a>
		{/if}
	</div>
</div>
