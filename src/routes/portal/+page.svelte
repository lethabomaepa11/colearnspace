<script>
	import ContentCard from '#lib/components/ContentCard.svelte';
	import { ArrowUpRight, BookOpen, Code2, Users } from '@lucide/svelte';
	let { data } = $props();
</script>

<svelte:head
	><title>Discover your next step | CoLearnSpace</title><meta
		name="description"
		content="Free courses, practical challenges and community projects. Start learning and building on CoLearnSpace."
	/></svelte:head
>
<main id="app-main" class="app-main">
	<section class="app-welcome">
		<div>
			<p class="eyebrow">YOUR NEXT CHAPTER IS OPEN</p>
			<h1>Pick a spark.<br />Make <em>something.</em></h1>
			<p>
				Learn the essentials, take on a real-world brief, and share what you make.<br />Courses,
				challenges and project showcases are free.
			</p>
			<a class="button" href="/portal/courses">Find my first course <ArrowUpRight size={17} /></a>
		</div>
		<div class="welcome-note">
			<span>✳</span>
			<h2>You don’t have to<br />figure it out alone.</h2>
			<p>Start small. Share a question.<br />Show your progress.</p>
			<a href="/portal/challenges">Explore a challenge ↗</a>
		</div>
	</section>
	<div class="quick-paths">
		<a href="/portal/courses"
			><BookOpen size={20} />
			<div><strong>Learn the essentials</strong><span>Short, practical lessons</span></div>
			<ArrowUpRight size={17} /></a
		><a href="/portal/challenges"
			><Code2 size={20} />
			<div><strong>Put it into practice</strong><span>Build from a clear brief</span></div>
			<ArrowUpRight size={17} /></a
		><a href="/portal/projects"
			><Users size={20} />
			<div><strong>Show your work</strong><span>Projects and feedback</span></div>
			<ArrowUpRight size={17} /></a
		>
	</div>
	{#each ['courses', 'challenges', 'projects'] as section (section)}<section
			class="catalog-section"
		>
			<div class="catalog-heading">
				<div>
					<p class="eyebrow">
						{section === 'courses'
							? 'A CLEAR NEXT STEP'
							: section === 'challenges'
								? 'LEARN BY DOING'
								: 'FROM THE COMMUNITY'}
					</p>
					<h2>
						{section === 'courses'
							? 'A little structure goes a long way.'
							: section === 'challenges'
								? 'A brief. A build. A breakthrough.'
								: 'Something worth sharing.'}
					</h2>
				</div>
				<a class="text-link" href={'/portal/' + section}
					>See all {section} <ArrowUpRight size={16} /></a
				>
			</div>
			<div class="content-grid">
				{#each data.items
					.filter((item) => item.kind === section)
					.slice(0, 3) as item (item.id)}<ContentCard {item} />{:else}<div class="empty-state">
						<h3>The first story could be yours.</h3>
						<p>Share your work and help this community grow.</p>
						<a class="button secondary" href={'/portal/' + section + '/create'}
							>Create a {section === 'projects'
								? 'project'
								: section === 'courses'
									? 'course'
									: 'challenge'} ↗</a
						>
					</div>{/each}
			</div>
		</section>{/each}
</main>
