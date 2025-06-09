<script>
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { appState } from '$lib/states.svelte.js';
	import { ArrowLeft } from '@lucide/svelte';

	let { data } = $props();
	appState.setAppTitle('Challenge');
	const metaContent = `View ${data.challenge.title} challenge on ColearnSpace`;
</script>

<!--SEO-->
<svelte:head>
	<title>{data.challenge.title} | ColearnSpace</title>
	<meta name="description" content={metaContent} />
	<meta property="og:description" content={metaContent} />
	<meta name="twitter:title" content="{data.challenge.title} | ColearnSpace" />
	<meta name="twitter:description" content={metaContent} />
	<!-- Open Graph Meta Tags for Link Previews -->
	<meta property="og:title" content="{data.challenge.title} | ColearnSpace" />
</svelte:head>

<TrixDisplay content={data.challenge.content} />
