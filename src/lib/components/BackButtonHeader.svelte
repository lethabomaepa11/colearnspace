<script>
	import { ArrowLeft } from '@lucide/svelte';
	let { title, children } = $props();
</script>

<section class="flex w-full items-center justify-between gap-1">
	<span class="flex items-center gap-1">
		<button onclick={() => window.history.back()} class="btn btn-ghost btn-circle"
			><ArrowLeft /></button
		>
		<h1 class="text-2xl font-bold">{title}</h1>
	</span>

	{#if children}
		{@render children()}
	{/if}
</section>
