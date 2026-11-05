<script>
	import { page } from '$app/state';
	import { goto, invalidateAll } from '$app/navigation';
	import ContentCard from '#lib/components/ContentCard.svelte';
	import { ArrowUpRight } from '@lucide/svelte';
	let { data } = $props();
	let message = $state('');
	async function logout() {
		try {
			const response = await fetch('/api/auth/sign-out', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: '{}'
			});
			if (!response.ok) throw new Error();
			await invalidateAll();
			await goto('/portal');
		} catch {
			message = 'Could not sign out. Please try again.';
		}
	}
</script>

<svelte:head
	><title>My space | CoLearnSpace</title><meta name="robots" content="noindex" /></svelte:head
>
<main id="app-main" class="app-main">
	<div class="catalog-heading">
		<div>
			<p class="eyebrow">A LITTLE PROGRESS, EVERY TIME</p>
			<h1>Hello, {page.data.user?.name}.</h1>
			<p>Your learning, your builds, your next step.</p>
		</div>
		<div class="inline-actions">
			<a class="text-link" href="/dashboard/settings">Account settings</a><button
				class="quiet-button"
				onclick={logout}>Sign out</button
			>
		</div>
	</div>
	{#if message}<p role="alert">{message}</p>{/if}
	<section class="catalog-section">
		<div class="catalog-heading">
			<h2>Pick up where you left off.</h2>
			<a class="text-link" href="/portal/courses">Find a course ↗</a>
		</div>
		<div class="content-grid">
			{#each data.progress as item (item.id)}<div>
					<ContentCard {item} />
					<p class="progress-caption">
						{item.completed.length} of {item.lessons.length} lessons complete
					</p>
				</div>{:else}<div class="empty-state">
					<h3>Your next step is waiting.</h3>
					<p>Open a course, complete your first lesson, and your progress will appear here.</p>
					<a class="button" href="/portal/courses"
						>Explore free courses <ArrowUpRight size={16} /></a
					>
				</div>{/each}
		</div>
	</section>
	<section class="catalog-section">
		<div class="catalog-heading">
			<h2>Made by you.</h2>
			<a class="button small" href="/portal/projects/create">Share a project ↗</a>
		</div>
		<div class="content-grid">
			{#each data.mine as item (item.id)}<ContentCard {item} />{:else}<div class="empty-state">
					<h3>Start your story.</h3>
					<p>
						A work in progress counts. Explain what you’re building and what feedback would help.
					</p>
					<a class="button secondary" href="/portal/projects/create">Share your first project ↗</a>
				</div>{/each}
		</div>
	</section>
	<section class="pro-callout">
		<div>
			<p class="eyebrow">YOUR FREE FEATURES STAY FREE</p>
			<h2>A little more momentum?</h2>
			<p>Builder Pro is coming soon. Tell us if you’re interested at R79/month.</p>
		</div>
		<a class="button" href="/pro">See the Pro waitlist ↗</a>
	</section>
</main>
