<script>
	import { appState } from '$lib/states.svelte';
	import { onMount } from 'svelte';
	import Seo from '$lib/components/SEO.svelte';

	appState.setAppTitle('Search');
</script>

<Seo title="Search | ColearnSpace" desc="Search" />
