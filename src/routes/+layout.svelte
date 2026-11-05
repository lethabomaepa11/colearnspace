<script>
	import '../app.css';
	import PwaControls from '#lib/components/PwaControls.svelte';
	let { children } = $props();
</script>

{@render children()}<PwaControls />
