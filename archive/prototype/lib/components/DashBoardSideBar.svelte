<script>
	import { page } from '$app/state';
	import { sideBar, theme } from '$lib/states.svelte';
	import {
		Activity,
		AlertCircle,
		Award,
		BellDot,
		BookKey,
		BookOpenText,
		Building,
		ChartBarIncreasing,
		CloudCog,
		Home,
		LayoutDashboard,
		Link,
		LucideBook,
		NotebookTabs,
		PlusCircle,
		Settings,
		UserCog
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<ul
	transition:slide
	class="menu bg-base-100 fixed top-0 left-0 mt-20 {sideBar.dashboardSideBar
		? 'fixed z-50 flex'
		: 'hidden'}  h-screen w-[250px] border-r
		 transition {theme.darkTheme ? ' border-gray-700' : ' border-gray-100'}  space-y-2 md:flex"
>
	<ul class="space-y-2">
		<li class="px-4">
			<a
				href="/dashboard"
				class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/dashboard'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<LayoutDashboard size={20} />

				<span>Dashboard</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/dashboard/profile"
				class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/dashboard/profile'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<UserCog size={20} />

				<span>Profile</span>
			</a>
		</li>

		<li class="px-4">
			<details open class="space-y-2">
				<summary><NotebookTabs size={20} /> My Content</summary>

				<ul>
					<li class="">
						<a
							href="/dashboard/projects"
							class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url.pathname.includes(
								'/dashboard/projects'
							)
								? 'bg-primary text-white shadow'
								: 'hover:bg-base-200'}"
						>
							<CloudCog size={20} />

							<span>Projects</span>
						</a>
					</li>
					<li class="">
						<a
							href="/dashboard/courses"
							class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url.pathname.includes(
								'/dashboard/courses'
							)
								? 'bg-primary text-white shadow'
								: 'hover:bg-base-200'}"
						>
							<BookKey size={20} />

							<span>Courses</span>
						</a>
					</li>
				</ul>
			</details>
		</li>
		<li class="px-4">
			<details class="space-y-2">
				<summary><Link size={20} /> Pages</summary>

				<ul>
					<li class="">
						<a
							href="/portal"
							class="hover:bg-base-200 flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors"
						>
							<Home size={20} />

							<span>Portal</span>
						</a>
					</li>
					<li class="">
						<a
							href="/docs"
							class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page
								.url.pathname === '/docs'
								? 'bg-primary text-white shadow'
								: 'hover:bg-base-200'}"
						>
							<BookOpenText size={20} />
							<span>Documentation</span>
						</a>
					</li>
				</ul>
			</details>
		</li>

		<li class="fixed bottom-5 w-[200px] px-4">
			<a
				href="/dashboard/settings"
				class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/dashboard/settings'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<Settings size={20} />

				<span>Settings</span>
			</a>
		</li>
	</ul>
</ul>
