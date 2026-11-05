<script>
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { appState } from '$lib/states.svelte';
	import moment from 'moment';
	import Seo from '$lib/components/SEO.svelte';

	appState.setAppTitle('Community');
	let { data } = $props();

	const topics = data.topics;
	const metaContent = `View ${data.challenge.title} challenge community on ColearnSpace`;
</script>

<!--SEO-->
<Seo title="{data.challenge.title} Community | ColearnSpace" desc={metaContent} />

<section class="flex w-full items-center justify-between">
	<h1 class="text-2xl font-bold">Discussion</h1>
	<a href="/portal/challenges/{data.challenge.slug}/community/new" class="btn btn-primary"
		>New Topic</a
	>
</section>
<main class="divide-base-300 flex w-full flex-col gap-2 divide-y">
	{#each topics as topic}
		<a
			href="/portal/challenges/{data.challenge.slug}/community/{topic.id}"
			class="hover:bg-base-200 w-full space-y-4 p-4 hover:rounded-xl"
		>
			<h2>{topic.title}</h2>
			<p class=" text-xs">By {topic.user.name} {moment(topic.created_at).fromNow()}</p>
		</a>
	{/each}
</main>
