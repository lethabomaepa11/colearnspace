<script>
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import moment from 'moment';
	import { fly, slide } from 'svelte/transition';

	let { children, data } = $props();
	const challenge = data.challenge;
</script>

<main transition:fly class="flex w-full flex-col gap-2">
	<BackButtonHeader title={challenge.title} />
	<p class="text-sm">
		A challenge by <a
			href="/{challenge.user.username}"
			onclick={(e) => {
				e.preventDefault();
				alert('User profiles are Coming soon.');
			}}
			class="link link-primary">{challenge.user.name}</a
		>
		created {moment(challenge.created_at).fromNow()}
	</p>

	<div role="tablist" class="tabs tabs-box">
		<a
			role="tab"
			href="/portal/challenges/{challenge.slug}"
			class="tab {page.route.id == '/portal/challenges/[challenge_slug]' ? 'tab-active' : ''}"
			>Overview</a
		>
		<a
			role="tab"
			href="/portal/challenges/{challenge.slug}/community"
			class="tab {page.route.id.includes('/portal/challenges/[challenge_slug]/community')
				? 'tab-active'
				: ''}">Community</a
		>
		<a
			role="tab"
			href="/portal/challenges/{challenge.slug}/submissions"
			class="tab {page.route.id.includes('/portal/challenges/[challenge_slug]/submissions')
				? 'tab-active'
				: ''}">Submissions</a
		>
	</div>
	{#if page.url.pathname == '/portal/challenges/' + challenge.slug}
		<figure class="relative flex w-full items-center justify-center overflow-hidden">
			<img src={challenge.image} alt={challenge.image} class="" />
		</figure>
	{/if}

	{@render children()}
</main>
