<script>
	import DocsFooter from '$lib/components/DocsFooter.svelte';
	import DocsSideBar from '$lib/components/DocsSideBar.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import { slide } from 'svelte/transition';

	let { children } = $props();
</script>

<Seo title="Docs | ColearnSpace" desc="Explore Documentation on ColearnSpace" />
<DocsSideBar />
<article transition:slide class="prose dark:prose-invert mx-auto max-w-none p-6 py-20 lg:w-2/3">
	{@render children()}
	<DocsFooter />
</article>
