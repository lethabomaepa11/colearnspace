<script>
	import AppHeader from '#lib/components/AppHeader.svelte';
	let { children } = $props();
</script>

<div class="platform" data-sveltekit-reload>
	<AppHeader />{@render children()}
	<footer class="app-footer">
		Keep making. Keep growing. <a href="/privacy">Privacy</a><a href="/pro"
			>Builder Pro · coming soon</a
		>
	</footer>
</div>
