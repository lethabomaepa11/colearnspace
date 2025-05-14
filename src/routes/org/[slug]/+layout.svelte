<script>
	import { page } from '$app/state';
	let { children } = $props();
</script>

{@render children()}
<p class="mt-20 text-9xl">{page.params.slug}</p>
