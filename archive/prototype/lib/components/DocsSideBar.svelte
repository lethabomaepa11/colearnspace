<script>
	import { page } from '$app/state';
	import { sideBar, theme } from '$lib/states.svelte';
	import {
		Building,
		ChartBarIncreasing,
		Home,
		LucideBook,
		PlusCircle,
		Store,
		Swords,
		Trophy,
		CodeXml,
		Users,
		Book,
		BookOpenText
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<ul
	transition:slide
	class="menu bg-base-100 fixed top-0 left-0 mt-20 {sideBar.docsSideBar
		? 'fixed z-50 flex'
		: 'hidden w-2/12'} h-screen border-r transition {theme.darkTheme
		? 'divide-gray-500 border-gray-700'
		: 'divide-gray-200 border-gray-100'}  space-y-2 divide-y md:flex"
>
	<ul class="space-y-2">
		<li class="px-4">
			<a
				href="/portal"
				class="hover:bg-base-200
					flex flex-row items-center gap-3 rounded-lg px-3 py-2
					transition-colors"
			>
				<Home size={20} />
				<span>Portal</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/docs"
				class="flex
					 flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url.pathname === '/docs'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<BookOpenText size={20} />
				<span>Documentation</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/docs/projects"
				class="flex
					 flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url.pathname.includes(
					'/docs/projects'
				)
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<CodeXml size={20} />
				<span>Projects</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/docs/courses"
				class="flex
					 flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url.pathname.includes(
					'/docs/courses'
				)
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<LucideBook size={20} />

				<span>Courses</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="/docs/challenges"
				class="flex
					 flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url.pathname.includes(
					'/docs/challenges'
				)
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<Swords size={20} />
				<span>Challenges</span>
			</a>
		</li>
		<li class="px-4">
			<a
				href="#"
				class="flex
					 flex-row items-center gap-3 rounded-lg px-3 py-2 transition-colors {page.url.pathname ===
				'/docs/leaderboard'
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'}"
			>
				<Trophy size={20} />
				<span>Leaderboard</span>
			</a>
		</li>
	</ul>
</ul>
