<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { Github, XCircle } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	let form = $state({ email: '', password: '', emailError: '', passwordError: '', mainError: '' });
	let redirectTo = $state(page.url.searchParams.get('goto'));

	let isLoading = $state(false);
	const login = async (withGithub = false) => {
		isLoading = true;
		if (withGithub) {
			location.href = '/auth/github';
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
			if (!redirectTo) redirectTo = '/dashboard';
			successModal.showModal();
			window.location.href = redirectTo;
		} else {
			isLoading = false;
			form.mainError = 'Invalid email or password';
		}
	};
</script>

<Seo title="Login | ColearnSpace" desc="Login to your account" />
<Modal title="Successfully logged in" id="successModal">
	<Loading text="Redirecting you to {redirectTo}..." textClass="text-md" />
</Modal>
<main transition:slide class="flex min-h-screen w-screen flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center space-y-2 p-5 lg:w-[400px]">
		<h1 class="mb-4 text-2xl font-bold">Login to your account</h1>
		{#if isLoading}
			<Loading />
		{:else}
			<button class="btn z-10 bg-black text-white" onclick={() => login(true)}
				><Github />Continue with Github</button
			>

			<p class="divider mt-4 text-sm text-gray-500">Or continue with email</p>
			<form onsubmit={() => login(false)} class="flex w-full flex-col items-center justify-center">
				{#if form.mainError}<div
						transition:slide
						role="alert"
						class=" text-error-content bg-error/80 flex w-full justify-between rounded p-3"
					>
						<span>{form.mainError}</span>
						<button class="" type="button" onclick={() => (form.mainError = '')}><XCircle /></button
						>
					</div>{/if}
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Email</legend>
					<input
						type="email"
						autocomplete="email"
						class="input input-lg w-full"
						placeholder="example@domain"
						bind:value={form.email}
					/>
					{#if form.emailError}<p transition:slide class="label text-error">
							{form.emailError}
						</p>{/if}
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Password</legend>
					<input
						type="password"
						class="input input-lg w-full"
						autocomplete="current-password"
						placeholder="*********"
						bind:value={form.password}
					/>
					{#if form.passwordError}<p transition:slide class="label text-error">
							{form.passwordError}
						</p>{/if}
				</fieldset>
				<button onclick={() => login(false)} type="submit" class="btn btn-primary my-5 w-full"
					>Login</button
				>
			</form>
			<a href="/auth/register" class="link link-primary">Do not have an account? Register</a>
		{/if}
	</div>
</main>
