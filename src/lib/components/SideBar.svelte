<script>
	import { page } from '$app/state';
	import { sideBar, theme } from '$lib/states.svelte';
	import { Building, ChartBarIncreasing, LucideBook, PlusCircle } from '@lucide/svelte';
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
	let categories = ['All', ...new Set(courses.map((c) => c.category))];
	onMount(() => {
		sideBar.open = localStorage.getItem('sbstate') === 'true';
	});
</script>

<ul
	transition:slide
	class="menu bg-base-100 fixed top-0 left-0 mt-20 hidden h-screen transition {sideBar.open
		? 'w-[250px]'
		: 'w-[150px]'} border-r {theme.darkTheme
		? 'divide-gray-500 border-gray-700'
		: 'divide-gray-200 border-gray-100'}  space-y-2 divide-y md:flex"
>
	<ul class="space-y-2">
		<li class="px-4">
			<a
				href="/courses"
				class="{sideBar.open
					? 'flex-row'
					: 'flex-col'} flex items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/courses'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<LucideBook size={20} />

				<span class={!sideBar.open && 'text-xs'}>Courses</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/courses/org"
				class="{sideBar.open
					? 'flex-row'
					: 'flex-col'} flex items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/courses/org'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<Building size={20} />
				<span class={!sideBar.open && 'text-xs'}>Organizations</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/courses/rankings"
				class="{sideBar.open
					? 'flex-row'
					: 'flex-col'} flex items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url
					.pathname === '/courses/rankings'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<ChartBarIncreasing size={20} />
				<span class={!sideBar.open && 'text-xs'}>Rankings</span>
			</a>
		</li>
	</ul>
	{#if sideBar.open}
		<li>
			<details open>
				<summary> <h2 class="menu-title text-neutral-content">Categories</h2></summary>
				<ul>
					{#each categories as category}
						<li><a>{category}</a></li>
					{/each}
				</ul>
			</details>
		</li>
	{/if}
</ul>
