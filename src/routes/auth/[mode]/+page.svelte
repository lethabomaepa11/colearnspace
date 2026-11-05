<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import AppHeader from '#lib/components/AppHeader.svelte';
	import { ArrowUpRight, LoaderCircle } from '@lucide/svelte';
	let { data } = $props();
	let busy = $state(false);
	let message = $state('');
	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (busy) return;
		busy = true;
		message = '';
		const form = new FormData(event.currentTarget as HTMLFormElement);
		try {
			const response = await fetch(
				'/api/auth/' + (data.mode === 'register' ? 'sign-up/email' : 'sign-in/email'),
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: String(form.get('email')).trim().toLowerCase(),
						password: form.get('password'),
						...(data.mode === 'register' ? { name: String(form.get('name')).trim() } : {}),
						rememberMe: true
					})
				}
			);
			if (!response.ok) {
				const result = await response.json();
				throw new Error(result.message || 'Please check your details and try again.');
			}
			await invalidateAll();
			await goto('/dashboard');
		} catch (error) {
			message = error instanceof Error ? error.message : 'Could not connect. Please try again.';
		} finally {
			busy = false;
		}
	}
</script>

<svelte:head
	><title>{data.mode === 'register' ? 'Join free' : 'Welcome back'} | CoLearnSpace</title
	></svelte:head
><AppHeader />
<main id="app-main" class="auth-layout">
	<div>
		<p class="eyebrow">YOUR CURIOSITY BELONGS HERE</p>
		<h1>
			{data.mode === 'register' ? `A little courage.\nA new beginning.` : `Good to see\nyou again.`}
		</h1>
		<p>Free courses. Real-world challenges. A place to show your work.</p>
		<a class="text-link" href="/portal">Just exploring? Browse without an account ↗</a>
	</div>
	<form class="editor-form auth-form" onsubmit={submit}>
		<h2>{data.mode === 'register' ? 'Make yourself at home.' : 'Back to your next chapter.'}</h2>
		{#if message}<p class="form-error" role="alert">
				{message}
			</p>{/if}{#if data.mode === 'register'}<label for="name">Your name</label><input
				id="name"
				name="name"
				required
				minlength="2"
				maxlength="60"
				autocomplete="name"
			/>{/if}<label for="email">Email address</label><input
			id="email"
			name="email"
			type="email"
			required
			maxlength="254"
			autocomplete="email"
		/><label for="password">Password</label><input
			id="password"
			name="password"
			type="password"
			required
			minlength="10"
			maxlength="128"
			autocomplete={data.mode === 'register' ? 'new-password' : 'current-password'}
		/>
		<p class="field-help">At least 10 characters. Use a unique password.</p>
		{#if data.mode === 'register'}<label class="consent"
				><input type="checkbox" required /><span
					>I agree to the <a href="/privacy">privacy details</a>. My name will appear on work I
					publish.</span
				></label
			>{/if}<button class="button" disabled={busy}
			>{#if busy}<LoaderCircle class="spin" size={16} /> Please wait…{:else}{data.mode ===
				'register'
					? 'Create my free account'
					: 'Sign in'}
				<ArrowUpRight size={17} />{/if}</button
		>
		<p>
			{data.mode === 'register' ? 'Already have an account?' : 'New here?'}
			<a href={data.mode === 'register' ? '/auth/login' : '/auth/register'}
				>{data.mode === 'register' ? 'Sign in' : 'Join free'}</a
			>
		</p>
		<p class="field-help">
			Need help accessing your account? <a href="mailto:lethabomaepa11@gmail.com">Contact support</a
			>.
		</p>
	</form>
</main>
