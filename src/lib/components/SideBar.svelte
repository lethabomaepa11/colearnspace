<script>
	import { page } from '$app/state';
	import { ChartBarIncreasing, LucideBook, PlusCircle } from '@lucide/svelte';
</script>

<ul
	class="menu bg-base-100 fixed top-0 left-0 mt-16 hidden h-screen w-[250px] border-r border-gray-200 md:flex"
>
	<li class="px-4 pt-6">
		<a
			href="/courses"
			class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
				page.url.pathname === '/courses' ? 'bg-primary text-white shadow' : 'hover:bg-base-200'
			}`}
		>
			<LucideBook size={20} />
			<span>Courses</span>
		</a>
	</li>

	<li class="px-4">
		<a
			href="/courses/create"
			class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
				page.url.pathname.includes('/courses/create')
					? 'bg-primary text-white shadow'
					: 'hover:bg-base-200'
			}`}
		>
			<PlusCircle size={20} />
			<span>Create</span>
		</a>
	</li>

	<li class="px-4">
		<a
			href="/courses/rankings"
			class="hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
		>
			<ChartBarIncreasing size={20} />
			<span>Rankings</span>
		</a>
	</li>
</ul>
