<script>
	import Seo from '$lib/components/SEO.svelte';
	import { appState } from '$lib/states.svelte.js';
	let { data } = $props();
	let { isLoggedIn, userData } = data;

	appState.setAppTitle('Dashboard');

	const { project, challenges, challenge_submission, course, api_keys, challenge_topics } =
		userData;
</script>

<Seo title="Dashboard | ColearnSpace" desc="Your learning and contribution summary." />

<div class="flex w-full flex-col">
	<h2 class="mt-4 text-2xl font-bold">Hello, {userData.name} 👋</h2>
	<p class="mb-6 text-gray-500 dark:text-gray-400">
		Welcome back! Here's your ColearnSpace journey at a glance.
	</p>

	<div class="stats stats-vertical md:stats-horizontal m-0 mb-8 w-full max-w-4xl p-0 shadow">
		<div class="stat">
			<div class="stat-title">Projects Created</div>
			<div class="stat-value">{project?.[0]?.count ?? 0}</div>
			<div class="stat-desc">Personal & collaborative</div>
		</div>

		<div class="stat">
			<div class="stat-title">Challenges Solved</div>
			<div class="stat-value text-primary">{challenge_submission?.[0]?.count ?? 0}</div>
			<div class="stat-desc">All time</div>
		</div>

		<div class="stat">
			<div class="stat-title">Topics Explored</div>
			<div class="stat-value text-secondary">{challenge_topics?.[0]?.count ?? 0}</div>
			<div class="stat-desc">Learning in progress</div>
		</div>
	</div>

	<div class="stats stats-vertical md:stats-horizontal w-full max-w-4xl shadow">
		<div class="stat">
			<div class="stat-title">Courses Enrolled</div>
			<div class="stat-value">{course?.[0]?.count ?? 0}</div>
			<div class="stat-desc">Keep learning 🎓</div>
		</div>

		<div class="stat">
			<div class="stat-title">API Keys Issued</div>
			<div class="stat-value text-accent">{api_keys?.[0]?.count ?? 0}</div>
			<div class="stat-desc">For personal integration</div>
		</div>

		<div class="stat">
			<div class="stat-title">Challenge Sets</div>
			<div class="stat-value">{challenges?.[0]?.count ?? 0}</div>
			<div class="stat-desc">Topics you’ve tried</div>
		</div>
	</div>
</div>
