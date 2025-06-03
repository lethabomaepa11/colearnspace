<script>
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft } from '@lucide/svelte';

	let { data } = $props();
</script>

<TrixDisplay content={data.challenge.content} />
