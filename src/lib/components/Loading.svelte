<script>
	import { fly, slide } from 'svelte/transition';
	let { text = 'Loading...', textClass = 'text-lg' } = $props();
</script>

<div transition:slide class="flex items-center">
	<span class="loading loading-ring loading-xl text-primary"></span>
	<p class={textClass}>{text}</p>
</div>
