<script>
	let { data } = $props();
</script>

<svelte:head
	><title>Owner interest overview | CoLearnSpace</title><meta
		name="robots"
		content="noindex,nofollow"
	/></svelte:head
>
<main class="legal">
	<a href="/">← CoLearnSpace</a>
	<h1>Is it resonating?</h1>
	<p>
		Private waitlist overview. These are expressions of interest, not paying customers or guaranteed
		purchases.
	</p>
	<div class="admin-grid">
		<div class="admin-stat">
			<strong>{data.totals.total}</strong><span>Pro waitlist emails</span>
		</div>
		<div class="admin-stat">
			<strong>{data.totals.pro}</strong><span>Interested at R79/month</span>
		</div>
		<div class="admin-stat"><strong>{data.totals.recent}</strong><span>Joined in 7 days</span></div>
	</div>
	<h2>Paid upgrade interest</h2>
	<table class="admin-table">
		<thead><tr><th>Plan</th><th>People</th></tr></thead><tbody
			>{#each data.plans as item (item.plan)}<tr><td>{item.plan}</td><td>{item.total}</td></tr
				>{/each}</tbody
		>
	</table>
	<h2>Learning paths</h2>
	<table class="admin-table">
		<thead><tr><th>Path</th><th>People</th></tr></thead><tbody
			>{#each data.tracks as item (item.track)}<tr><td>{item.track}</td><td>{item.total}</td></tr
				>{/each}</tbody
		>
	</table>
</main>
