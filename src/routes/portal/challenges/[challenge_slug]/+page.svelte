<script>
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { appState } from '$lib/states.svelte.js';
	import { ArrowLeft } from '@lucide/svelte';
	import Seo from '$lib/components/SEO.svelte';

	let { data } = $props();
	appState.setAppTitle('Challenge');
	const metaContent = `View ${data.challenge.title} challenge on ColearnSpace`;
</script>

<!--SEO-->
<Seo title="{data.challenge.title} | ColearnSpace" desc={metaContent} />

<TrixDisplay content={data.challenge.content} />
