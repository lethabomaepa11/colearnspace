<script>
	import { page } from '$app/state';
	import { course, session } from '$lib/states.svelte';
	import { Code, CodeXml, Home, LogIn, LucideBook, PlusCircle, Swords, User } from '@lucide/svelte';
	import AvatarDropDown from './AvatarDropDown.svelte';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	let localCourse = $state();

	onMount(() => {
		localCourse = JSON.parse(localStorage.getItem('course'));
	});
</script>

{#if page.url.pathname.includes('/portal') || page.url.pathname.includes('/dashboard')}
	<div class="dock md:hidden" transition:slide>
		<a
			href="/portal"
			class="{page.url.pathname === '/portal' ? 'dock-active text-primary' : ''} dock-label"
		>
			<Home />
			<span class="dock-label">Discover</span>
		</a>

		<a
			href="/portal/projects"
			class="{page.url.pathname.includes('/portal/projects')
				? 'dock-active text-primary'
				: ''} dock-label"
		>
			<CodeXml />
			<span class="dock-label">Projects</span>
		</a>
		<div class="dock-label">
			<div class="dropdown dropdown-top dropdown-center">
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div tabindex="0" class="flex cursor-pointer flex-col items-center gap-2">
					<PlusCircle />
					<span class="dock-label">Create</span>
				</div>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 py-5 shadow-lg"
				>
					<summary class="menu-title"><h2>Click one option</h2></summary>
					<li>
						<a href="/portal/projects/create" class="text-base">Showcase a project</a>
					</li>
					<li>
						<a href="/portal/challenges/create" class="text-base">Create a challenge</a>
					</li>
					<li>
						<a href="/portal/courses/create" class="text-base">Create a Course</a>
					</li>
				</ul>
			</div>
		</div>
		<a
			href="/portal/courses"
			class="{page.url.pathname.includes('/portal/courses')
				? 'dock-active text-primary'
				: ''} dock-label"
		>
			<LucideBook />
			<span class="dock-label">Courses</span>
		</a>
		<a
			href="/portal/challenges"
			class="{page.url.pathname.includes('/portal/challenges')
				? 'dock-active text-primary'
				: ''} dock-label"
		>
			<Swords />
			<span class="dock-label">Challenges</span>
		</a>
	</div>
{/if}
