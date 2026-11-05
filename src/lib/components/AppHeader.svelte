<script lang="ts">
	import { page } from '$app/state';
	import { ArrowUpRight, Menu, X } from '@lucide/svelte';
	let open = $state(false);
</script>

<a class="skip-link" href="#app-main">Skip to content</a>
<header class="app-header">
	<a class="brand" href="/" aria-label="CoLearnSpace home"
		><img src="/site/branding/colearn-logo.png" alt="CoLearnSpace" width="174" height="78" /></a
	>
	<nav aria-label="App navigation" class:open>
		<a href="/portal" class:active={page.url.pathname === '/portal'}>Discover</a><a
			href="/portal/courses"
			class:active={page.url.pathname.includes('/courses')}>Courses</a
		><a href="/portal/challenges" class:active={page.url.pathname.includes('/challenges')}
			>Challenges</a
		><a href="/portal/projects" class:active={page.url.pathname.includes('/projects')}>Projects</a
		><a href="/pro">Pro <span class="app-soon">soon</span></a>
	</nav>
	<div class="account-actions">
		{#if page.data.user}<a class="button small secondary" href="/dashboard">My space</a>{:else}<a
				class="signin-link"
				href="/auth/login">Sign in</a
			><a class="button small" href="/auth/register">Join free <ArrowUpRight size={15} /></a>{/if}
	</div>
	<button
		class="menu-toggle"
		aria-label={open ? 'Close navigation' : 'Open navigation'}
		aria-expanded={open}
		onclick={() => (open = !open)}
		>{#if open}<X />{:else}<Menu />{/if}</button
	>
</header>
