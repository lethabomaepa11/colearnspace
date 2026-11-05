<script>
	import { page } from '$app/state';
	import Seo from '$lib/components/SEO.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	const { data } = $props();
	const topic = data.topic;

	const metaContent = `View ${topic.title} topic from ${data.challenge.title} challenge on ColearnSpace`;
</script>

<!--SEO-->
<Seo title="{topic.title} | ColearnSpace" desc={metaContent} />

<main>
	<h2>{topic.title}</h2>
	<TrixDisplay content={topic.content} />
</main>
