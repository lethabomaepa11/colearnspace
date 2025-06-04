<script>
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { appState } from '$lib/states.svelte.js';
	import { ArrowLeft } from '@lucide/svelte';

	let { data } = $props();
	appState.setAppTitle('Challenge');
</script>

<TrixDisplay content={data.challenge.content} />
