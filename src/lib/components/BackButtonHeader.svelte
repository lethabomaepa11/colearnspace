<script>
	import { appState } from '$lib/states.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	let { title, children, backButton = false, isAppHeader = false } = $props();

	/**
	 * The backbutton must appear when needed,
	 * On mobile, if this component is app header, and the backbutton is not needed, then show the menu button
	 */
</script>

<section class="flex w-full items-center justify-between gap-1">
	<span class="flex items-center gap-1">
		{#if backButton || !appState.isMobile}
			<button onclick={() => window.history.back()} class="btn btn-ghost btn-circle"
				><ArrowLeft /></button
			>
		{/if}
		<h1 class="text-2xl font-bold">{title}</h1>
	</span>

	{#if children}
		{@render children()}
	{/if}
</section>
