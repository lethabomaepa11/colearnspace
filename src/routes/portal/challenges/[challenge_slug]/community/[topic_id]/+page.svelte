<script>
	import { page } from '$app/state';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	const { data } = $props();
	const topic = data.topic;

	const metaContent = `View ${topic.title} topic from ${data.challenge.title} challenge on ColearnSpace`;
</script>

<!--SEO-->
<svelte:head>
	<title>{topic.title} | ColearnSpace</title>
	<meta name="description" content={metaContent} />
	<meta property="og:description" content={metaContent} />
	<meta name="twitter:title" content="{topic.title} | ColearnSpace" />
	<meta name="twitter:description" content={metaContent} />
	<!-- Open Graph Meta Tags for Link Previews -->
	<meta property="og:title" content="{topic.title} | ColearnSpace" />
</svelte:head>

<main>
	<h2>{topic.title}</h2>
	<TrixDisplay content={topic.content} />
</main>
