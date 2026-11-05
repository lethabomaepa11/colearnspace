<svelte:head
	><title>You’re offline | CoLearnSpace</title><meta name="robots" content="noindex" /></svelte:head
>
<main class="legal">
	<img class="offline-logo" src="/site/branding/colearn-logo.png" alt="CoLearnSpace" />
	<h1>A pause,<br />not a full stop.</h1>
	<p>
		You’re offline. Pages you opened while connected may still be available. New pages, videos,
		signing in, saving progress and publishing need a connection.
	</p>
	<p>Your last action has not been saved. Reconnect before trying again.</p>
	<a class="button" href="/portal" data-sveltekit-reload>Try Discover again</a><button
		class="button secondary"
		onclick={() => history.back()}>Go back</button
	>
</main>
