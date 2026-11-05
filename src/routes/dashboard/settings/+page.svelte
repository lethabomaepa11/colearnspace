<script lang="ts">
	import { page } from '$app/state';
	import { goto, invalidateAll } from '$app/navigation';
	let message = $state('');
	let busy = $state(false);
	let confirmDelete = $state(false);
	async function update(event: SubmitEvent) {
		event.preventDefault();
		busy = true;
		message = '';
		const form = new FormData(event.currentTarget as HTMLFormElement);
		try {
			const response = await fetch('/api/auth/update-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: form.get('name') })
			});
			if (!response.ok) throw new Error('Could not update your name. Please try again.');
			await invalidateAll();
			message = 'Name updated.';
		} catch (error) {
			message = error instanceof Error ? error.message : 'Please try again.';
		} finally {
			busy = false;
		}
	}
	async function remove(event: SubmitEvent) {
		event.preventDefault();
		busy = true;
		const form = new FormData(event.currentTarget as HTMLFormElement);
		try {
			const response = await fetch('/api/auth/delete-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: form.get('password') })
			});
			if (!response.ok)
				throw new Error('Could not delete the account. Check your password and try again.');
			await invalidateAll();
			await goto('/portal');
		} catch (error) {
			message = error instanceof Error ? error.message : 'Please try again.';
		} finally {
			busy = false;
		}
	}
</script>

<svelte:head
	><title>Account settings | CoLearnSpace</title><meta
		name="robots"
		content="noindex"
	/></svelte:head
>
<main id="app-main" class="app-main narrow">
	<a class="back-link" href="/dashboard">← My space</a>
	<h1>Your account.</h1>
	<p>Your email: {page.data.user?.email}</p>
	{#if message}<p class="action-message" role="status">{message}</p>{/if}
	<form class="editor-form" onsubmit={update}>
		<label for="name">Display name</label><input
			id="name"
			name="name"
			value={page.data.user?.name}
			required
			minlength="2"
			maxlength="60"
		/>
		<p class="field-help">
			Your name is visible on your contributions. Existing published bylines retain the name used at
			publication.
		</p>
		<button class="button" disabled={busy}>Save name</button>
	</form>
	<section class="danger-zone">
		<h2>Delete your account</h2>
		<p>
			This deletes your account, progress, comments and votes. Your public courses, challenges and
			projects stay available with a “Deleted member” byline. Delete any work you want removed from
			its page first.
		</p>
		<button class="button secondary" onclick={() => (confirmDelete = !confirmDelete)}
			>Review account deletion</button
		>{#if confirmDelete}<form class="editor-form" onsubmit={remove}>
				<label for="confirm-password">Confirm your password</label><input
					id="confirm-password"
					name="password"
					type="password"
					required
					autocomplete="current-password"
				/><button class="button danger" disabled={busy}>Permanently delete my account</button>
			</form>{/if}
	</section>
</main>
