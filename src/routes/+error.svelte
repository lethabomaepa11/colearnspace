<script>
	import { page } from '$app/state';
</script>

<svelte:head
	><title>{page.status} | CoLearnSpace</title><meta name="robots" content="noindex" /></svelte:head
>
<main class="legal">
	<a href="/">← CoLearnSpace</a>
	<h1>
		{page.status === 401
			? 'Owner sign-in required.'
			: page.status === 404
				? 'A little off track.'
				: 'Something interrupted the journey.'}
	</h1>
	<p>
		{page.status === 401
			? 'Use your private owner credentials to see the interest overview.'
			: page.status === 404
				? 'This page doesn’t exist. Explore free courses, challenges and projects from Discover.'
				: 'Please try again in a moment.'}
	</p>
	<a class="button" href="/portal">Back to Discover</a>
</main>
