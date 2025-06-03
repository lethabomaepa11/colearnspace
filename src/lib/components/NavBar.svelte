<script>
	import { page } from '$app/state';
	import { course, courseSearch, currentUser, sideBar, theme } from '$lib/states.svelte';
	import { LogIn, Menu, Moon, Plus, Search, Sun, UploadCloud, User } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import CoursesTopNav from './CoursesTopNav.svelte';
	import AvatarDropDown from './AvatarDropDown.svelte';
	import Modal from './Modal.svelte';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	let { user } = $props();
	let infoPages = ['/about', '/contact', '/faq', '/', '/auth/login', '/auth/register'];
	let localCourse = $state();
	let pathname = $state(page.url.pathname);
	onMount(() => {
		localCourse = JSON.parse(localStorage.getItem('course'));
	});
	let isPublishing = $state(false);
</script>

<main
	transition:slide
	class="fixed z-50 flex w-full {page.url.pathname == '/'
		? 'items-center justify-center pt-10'
		: ''}"
>
	<div
		class="navbar bg-base-100 fixed z-10 border-b backdrop-blur {theme.darkTheme
			? 'border-gray-700'
			: 'border-gray-100'}  {page.url.pathname == '/' ? 'mt-10 w-[90svw] rounded-2xl border' : ''}"
	>
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<Menu />
				</div>
				<ul
					transition:slide
					class="menu menu-xl dropdown-content bg-base-100 rounded-box z-1 mt-3 w-[50svw] p-2 shadow-xl"
				>
					{#if infoPages.includes(pathname)}
						<li><a href="/" class="text-base">Home</a></li>
						<li>
							<details>
								<summary class="text-base">Discover</summary>
								<ul class="p-2">
									<li><a class="text-base" href="/portal">Portal</a></li>
									<li><a class="text-base" href="/portal/showcase">Showcase</a></li>
									<li><a class="text-base" href="/portal/courses">Courses</a></li>
								</ul>
							</details>
						</li>
						<li><a class="text-base" href="/about">About</a></li>
						<li><a class="text-base" href="/contact">Contact</a></li>
						<li><a class="text-base" href="/faq">FAQ</a></li>
					{/if}
				</ul>
			</div>
			<div class="m-0 flex h-full overflow-hidden p-0">
				<button
					onclick={() => sideBar.toggle(page.url.pathname)}
					tabindex="0"
					class="btn btn-ghost m-0 hidden rounded-full p-2 lg:flex"
				>
					<Menu />
				</button>
				<a href="/" class="btn btn-ghost">
					<img
						src="/site/branding/ColearnSpace-text{theme.darkTheme ? '-white' : ''}.png"
						class="m-0 h-[80px] p-0"
						alt="ColearnSpace logo"
					/>
				</a>
			</div>
		</div>
		<!-- Visible on Desktop-->
		<div class="navbar-center hidden lg:flex" transition:slide>
			<ul class="menu menu-horizontal z-1 px-1" transition:slide>
				{#if infoPages.includes(page.url.pathname)}
					<li><a href="/" class="text-base">Home</a></li>
					<li>
						<details>
							<summary class="text-base">Discover</summary>
							<ul class="p-2">
								<li><a class="text-base" href="/portal">Portal</a></li>
								<li><a class="text-base" href="/portal/showcase">Showcase</a></li>
								<li><a class="text-base" href="/portal/courses">Courses</a></li>
							</ul>
						</details>
					</li>
					<li><a class="text-base" href="/about">About</a></li>
					<li><a class="text-base" href="/contact">Contact</a></li>
					<li><a class="text-base" href="/faq">FAQ</a></li>
				{/if}
			</ul>
		</div>
		<!-- Ends here-->
		{#if page.url.pathname.includes('/portal')}
			<CoursesTopNav />
		{/if}

		<div class="navbar-end flex items-center gap-4">
			{#if !infoPages.includes(page.url.pathname)}
				<div class="dropdown" role="button">
					{#if !localCourse}
						<a
							href="/portal/courses/create"
							class="btn btn-outline hidden items-center justify-center md:flex"><Plus /> Create</a
						>
					{:else}
						<button class="btn btn-outline hidden items-center justify-center md:flex"
							><Plus /> Create</button
						>
						<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
						<ul
							tabindex="0"
							class="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 py-5 shadow-lg"
						>
							<summary class="menu-title"><h2>Click one option</h2></summary>
							<li>
								<a href="/portal/challenges/create" class="text-base">Create a challenge</a>
							</li>
							<li>
								<a href="/portal/courses/create" class="text-base">Create a Course</a>
							</li>
						</ul>
					{/if}
				</div>
				{#if page.url.pathname == '/portal/courses/preview' || page.url.pathname.includes('/portal/courses/preview/')}
					<button
						onclick={() => {
							isPublishing = true;
							course.publish(user);
						}}
						class="btn btn-primary hidden items-center justify-center md:flex"
						>{#if isPublishing}
							<Loading />
						{:else}
							<UploadCloud /> Publish
						{/if}</button
					>
				{/if}
			{/if}
			<button
				class="btn btn-ghost btn-circle {page.url.pathname.includes('/portal') ? 'lg:hidden' : ''} "
				onclick={() => {
					//display this search bar icon everywhere except portal when on desktop
					//
					if (page.url.pathname.includes('/portal')) {
						courseSearch.toggleMobileSearch();
					} else {
						//on mobile and in /portal, when this button is clicked, show the mobile search bar, otherwise do nothing
						//if not in /portal, navigate to portal, and show the mobile search bar if on mobile
						if (screen.availWidth < 768) {
							courseSearch.toggleMobileSearch();
						}
						//navigating to portal
						goto('/portal/');
					}
				}}><Search /></button
			>
			<label class="swap swap-rotate">
				<input
					type="checkbox"
					onclick={theme.toggleTheme}
					bind:checked={theme.darkTheme}
					value="dark"
					class="theme-controller hidden"
				/>
				{#if theme.darkTheme}
					<Sun />
				{:else}
					<Moon />
				{/if}
			</label>

			{#if user?.isLoggedIn}
				<div class="dropdown dropdown-left" role="button">
					<button class="btn btn-primary btn-circle hidden text-base text-white md:flex">
						{#if user?.user_metadata?.avatar_url}
							<img
								src={user.user_metadata.avatar_url}
								alt="user avatar"
								class="h-8 w-8 rounded-full object-cover"
							/>
						{:else}
							<User />
						{/if}
					</button>
					<AvatarDropDown {user} />
				</div>
			{:else}
				<a
					href="/auth/login?goto={page.url.pathname}"
					class="btn btn-primary btn-circle hidden text-base text-white md:flex"><LogIn /></a
				>
			{/if}
		</div>
	</div>
</main>
