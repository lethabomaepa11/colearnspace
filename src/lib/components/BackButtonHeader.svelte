<script>
	import { appState } from '$lib/states.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { fade, fly, slide } from 'svelte/transition';
	let { title, children, backButton = false, isAppHeader = false } = $props();

	/**
	 * The backbutton must appear when needed,
	 * On mobile, if this component is app header, and the backbutton is not needed, then show the menu button
	 */
</script>

<section transition:slide class="flex w-full items-center justify-between gap-1">
	<span class="flex items-center gap-1">
		{#if backButton || !appState.isMobile}
			<!--Show backButton when it is true,-->

			<button onclick={() => window.history.back()} class="btn btn-ghost btn-circle"
				><ArrowLeft /></button
			>
		{/if}
		<h1 transition:slide class="text-2xl font-bold">{title}</h1>
	</span>

	{#if children}
		{@render children()}
	{/if}
</section>
