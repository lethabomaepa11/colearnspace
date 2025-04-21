<script>
	import { page } from '$app/state';
	import { sideBar, theme } from '$lib/states.svelte';
	import {
		Activity,
		Building,
		ChartBarIncreasing,
		LayoutDashboard,
		LucideBook,
		PlusCircle,
		Settings,
		UserCog
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	let courses = [
		{
			title: 'HTML, CSS & JavaScript 101',
			category: 'Web Development',
			author: 'MusaTech',
			videoId: 'dD2EISBDjWM',
			slug: 'web-dev-basics'
		},
		{
			title: 'UI Design Fundamentals',
			category: 'UI/UX Design',
			author: 'KeaLearn',
			videoId: '3a4J2U8vHvg',
			slug: 'ui-design-fundamentals'
		},
		{
			title: 'Python for Beginners',
			category: 'Programming',
			author: 'CodeBro',
			videoId: 'rfscVS0vtbw',
			slug: 'python-data-basics'
		},
		{
			title: 'Graphic Design Basics',
			category: 'Design',
			author: 'CreativeBae',
			videoId: '8g3YzN6q7Zk',
			slug: 'graphic-design-basics'
		}
	];
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<ul
	transition:slide
	class="menu bg-base-100 fixed top-0 left-0 mt-20 hidden h-screen w-[250px] border-r
		 transition {theme.darkTheme
		? 'divide-gray-500 border-gray-700'
		: 'divide-gray-200 border-gray-100'}  space-y-2 divide-y md:flex"
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
				href="/courses"
				class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/courses'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<LucideBook size={20} />

				<span>Courses</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/dashboard"
				class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/courses'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<UserCog size={20} />

				<span>Profile</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/dashboard"
				class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/courses'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<Activity size={20} />

				<span>Account Activity</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/dashboard"
				class="flex flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/courses'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<Settings size={20} />

				<span>Settings</span>
			</a>
		</li>
	</ul>
	<li>
		<details open>
			<summary> <h2 class="menu-title text-neutral-content">My Courses</h2></summary>
			<ul>
				{#each courses as course}
					<li><a href="/courses/{course.slug}">{course.title}</a></li>
				{/each}
			</ul>
		</details>
	</li>
</ul>
