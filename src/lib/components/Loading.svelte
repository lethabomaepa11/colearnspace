<script>
	import { fly, slide } from 'svelte/transition';
	let { text = 'Loading...', textClass = 'text-lg' } = $props();
</script>

<div transition:fly class=" flex h-full w-full items-center justify-center rounded-2xl py-5">
	<span class="loading loading-ring loading-xl text-primary"></span>
	<p class={textClass}>{text}</p>
</div>
