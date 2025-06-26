<script>
	import DocsFooter from '$lib/components/DocsFooter.svelte';
	import DocsSideBar from '$lib/components/DocsSideBar.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import { appState, sideBar } from '$lib/states.svelte';
	import { slide } from 'svelte/transition';

	let { children } = $props();
	appState.setAppTitle('Docs');
</script>

<Seo title="Docs | ColearnSpace" desc="Explore Documentation on ColearnSpace" />
{#if sideBar.docsSideBar || !appState.isMobile}
	<DocsSideBar />
{/if}
<article transition:slide class="prose dark:prose-invert mx-auto max-w-none p-6 py-20 lg:w-2/3">
	{@render children()}
	<DocsFooter />
</article>
