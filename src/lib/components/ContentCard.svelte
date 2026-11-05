<script lang="ts">
	import { ArrowUpRight, BookOpen, Code2, Layers } from '@lucide/svelte';
	import type { Content } from '#lib/server/platform/content.js';
	let { item }: { item: Content } = $props();
</script>

<a class="content-card" href={'/portal/' + item.kind + '/' + item.slug}
	><div
		class="content-card-art"
		class:challenge={item.kind === 'challenges'}
		class:project={item.kind === 'projects'}
	>
		<span
			>{item.kind === 'courses'
				? 'LEARN SOMETHING'
				: item.kind === 'challenges'
					? 'MAKE IT HAPPEN'
					: 'MADE BY THE COMMUNITY'}</span
		>{#if item.kind === 'courses'}<BookOpen size={46} />{:else if item.kind === 'challenges'}<Code2
				size={46}
			/>{:else}<Layers size={46} />{/if}<span>{item.track}</span>
	</div>
	<div class="content-card-body">
		<div class="card-meta">
			<span>{item.level}</span><span
				>{item.kind === 'courses'
					? item.lessons.length + ' lessons'
					: item.kind === 'projects'
						? 'Community project'
						: 'Practical brief'}</span
			>
		</div>
		<h3>{item.title}</h3>
		<p>{item.description}</p>
		<div class="card-credit"><span>{item.author_name}</span><ArrowUpRight size={18} /></div>
	</div></a
>
