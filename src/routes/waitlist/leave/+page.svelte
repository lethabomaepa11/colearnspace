<script>
	let { data, form } = $props();
</script>

<svelte:head
	><title>Leave the waitlist | CoLearnSpace</title><meta
		name="robots"
		content="noindex,nofollow"
	/></svelte:head
>
<main class="legal">
	<a href="/">← CoLearnSpace</a>{#if form?.success}<h1>You’ve left the list.</h1>
		<p>Your waitlist details have been deleted. You can join again whenever you like.</p>{:else}<h1>
			A change of plans?
		</h1>
		<p>Leaving deletes your waitlist details and stops early-access updates.</p>
		{#if form?.message}<p role="alert">{form.message}</p>{/if}{#if data.valid}<form method="POST">
				<button class="button">Leave the waitlist</button>
			</form>{:else}<p>
				This link is incomplete. Use the link in your email or <a
					href="mailto:lethabomaepa11@gmail.com">contact us</a
				>.
			</p>{/if}{/if}
</main>
