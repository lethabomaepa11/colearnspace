<script>
	import { fly, slide } from 'svelte/transition';
</script>

<div transition:slide class="flex items-center">
	<span class="loading loading-ring loading-xl text-primary"></span>
	<h3 class="text-lg">Loading...</h3>
</div>
