<script>
	import { page } from '$app/state';
	import Loading from '$lib/components/Loading.svelte';
	import { githubAuth } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { Github, XCircle } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	let form = $state({ email: '', password: '', emailError: '', passwordError: '', mainError: '' });
	const redirectTo = page.url.searchParams.get('goto');

	let isLoading = $state(false);
	const login = async (withGithub = false) => {
		isLoading = true;
		if (withGithub) {
			githubAuth.default();
			return;
		}
		form.emailError = '';
		form.passwordError = '';
		form.mainError = '';
		if (!form.email.includes('@') || !form.email.includes('.')) {
			form.emailError = 'Invalid email';
			isLoading = false;
			return;
		}
		if (form.password.length < 8) {
			form.passwordError = 'Password must be at least 8 characters';
			isLoading = false;
			return;
		}
		const res = await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ email: form.email, password: form.password })
		});
		const result = await res.json();
		if (result.success) {
			window.location.href = redirectTo;
		} else {
			isLoading = false;
			form.mainError = 'Invalid email or password';
		}
	};
</script>

<svelte:head>
	<title>Login | ColearnSpace</title>
	<meta
		name="description"
		content="Login to experience the ultimate collaborative learning community"
	/>
</svelte:head>

<main transition:slide class="flex min-h-screen flex-col items-center justify-center">
	<div class="flex flex-col items-center justify-center space-y-2">
		<h1 class="mb-4 text-2xl font-bold">Login to your account</h1>
		{#if isLoading}
			<Loading />
		{:else}
			<button class="btn z-10 bg-black text-white" onclick={() => login(true)}
				><Github />Continue with Github</button
			>

			<p class="divider mt-4 text-sm text-gray-500">Or continue with email</p>
			<form onsubmit={() => login(false)} class="flex flex-col items-center justify-center">
				{#if form.mainError}<div transition:slide role="alert" class="alert alert-error w-full p-3">
						<span>{form.mainError}</span>
						<button class="btn" type="button" onclick={() => (form.mainError = '')}
							><XCircle /></button
						>
					</div>{/if}
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Email</legend>
					<input
						type="email"
						autocomplete="email"
						class="input"
						placeholder="example@domain"
						bind:value={form.email}
					/>
					{#if form.emailError}<p transition:slide class="label text-error">
							{form.emailError}
						</p>{/if}
				</fieldset>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Password</legend>
					<input
						type="password"
						class="input"
						autocomplete="current-password"
						placeholder="*********"
						bind:value={form.password}
					/>
					{#if form.passwordError}<p transition:slide class="label text-error">
							{form.passwordError}
						</p>{/if}
				</fieldset>
				<button onclick={() => login(false)} type="submit" class="btn btn-primary w-full"
					>Login</button
				>
			</form>
			<a href="/auth/register" class="link link-primary">Do not have an account? Register</a>
		{/if}
	</div>
</main>
