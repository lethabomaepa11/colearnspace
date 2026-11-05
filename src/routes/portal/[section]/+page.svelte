<script>
	import ContentCard from '#lib/components/ContentCard.svelte';
	import { Search, Plus, ArrowRight } from '@lucide/svelte';
	let { data } = $props();
	const singular = { courses: 'course', challenges: 'challenge', projects: 'project' };
</script>

<svelte:head
	><title>{data.section[0].toUpperCase() + data.section.slice(1)} | CoLearnSpace</title
	></svelte:head
>
<main id="app-main" class="app-main">
	<a class="back-link" href="/portal">← Discover</a>
	<div class="catalog-heading">
		<div>
			<p class="eyebrow">FREE TO EXPLORE. YOURS TO BUILD ON.</p>
			<h1>
				{data.section === 'courses'
					? 'Learn with direction.'
					: data.section === 'challenges'
						? 'Turn knowing into doing.'
						: 'Proof of your progress.'}
			</h1>
			<p>
				{data.section === 'courses'
					? 'Practical lessons, clear steps, no paywall.'
					: data.section === 'challenges'
						? 'Pick a brief. Build your version. Share it for feedback.'
						: 'Explore what people are making, or share a project of your own.'}
			</p>
		</div>
		<a class="button" href={'/portal/' + data.section + '/create'}
			><Plus size={17} />Create {singular[data.section]}</a
		>
	</div>
	<form class="search-form" method="GET">
		<Search size={18} /><input
			name="q"
			aria-label={'Search ' + data.section}
			value={data.query}
			placeholder={'Find ' + data.section + ' by title or topic'}
		/><button class="button small">Search <ArrowRight size={15} /></button>{#if data.query}<a
				href={'/portal/' + data.section}>Clear</a
			>{/if}
	</form>
	<p class="results-count">
		{data.items.length}
		{data.items.length === 1 ? 'result' : 'results'}{data.query ? ' for “' + data.query + '”' : ''}
	</p>
	<div class="content-grid">
		{#each data.items as item (item.id)}<ContentCard {item} />{:else}<div class="empty-state">
				<h2>Room for something new.</h2>
				<p>
					{data.query
						? 'Try a different search, or clear your filters.'
						: 'Be the first to share something here.'}
				</p>
				<a
					class="button secondary"
					href={data.query ? '/portal/' + data.section : '/portal/' + data.section + '/create'}
					>{data.query ? 'Clear search' : 'Create ' + singular[data.section]}</a
				>
			</div>{/each}
	</div>
</main>
