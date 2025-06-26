<script>
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { Github } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	let form = $state({
		email: '',
		password: '',
		name: '',
		emailError: '',
		passwordError: '',
		nameError: ''
	});
	let isLoading = $state(false);

	const register = async (withGithub = false) => {
		isLoading = true;
		if (withGithub) {
			location.href = '/auth/github';
			return;
		}
		form.emailError = '';
		form.passwordError = '';
		form.nameError = '';
		if (
			!form.email.includes('@') ||
			!form.email.includes('.') ||
			form.password.length < 8 ||
			form.name.length < 3
		) {
			if (!form.email.includes('@') || !form.email.includes('.')) {
				form.emailError = 'Invalid email';
			}
			if (form.password.length < 8) {
				form.passwordError = 'Password must be at least 8 characters';
			}
			if (form.name.length < 3) {
				form.nameError = 'Please enter your full name';
			}

			isLoading = false;
			return;
		}

		const res = await fetch('/api/user/register', {
			method: 'POST',
			body: JSON.stringify({ email: form.email, password: form.password, name: form.name })
		});
		const result = await res.json();
		if (result.success) {
			window.location.href = '/auth/login';
		}
	};
</script>

<Seo title="Register | ColearnSpace" desc="Register to your account" />

<main transition:slide class="flex min-h-screen w-screen flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center space-y-2 p-5 lg:w-[400px]">
		<h1 class="mb-4 text-2xl font-bold">Create an account</h1>
		{#if isLoading}
			<Loading />
		{:else}
			<button class="btn z-10 bg-black text-white" onclick={() => register(true)}
				><Github />Continue with Github</button
			>
			<p class="divider mt-4 text-sm text-gray-500">Or continue with email</p>
			<form
				onsubmit={() => register(false)}
				class="flex w-full flex-col items-center justify-center"
			>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Your full name</legend>
					<input
						type="text"
						class="input input-lg w-full"
						placeholder="John Doe"
						bind:value={form.name}
					/>
					{#if form.nameError}<p transition:slide class="label text-error">
							{form.nameError}
						</p>{/if}
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Email</legend>
					<input
						name="email"
						autocomplete="email"
						type="email"
						class="input input-lg w-full"
						placeholder="example@domain"
						bind:value={form.email}
					/>
					{#if form.emailError}<p transition:slide class="label text-error">
							{form.emailError}
						</p>{/if}
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">Create Password</legend>
					<input
						name="password"
						type="password"
						class="input input-lg w-full"
						placeholder="*********"
						bind:value={form.password}
					/>
					{#if form.passwordError}<p transition:slide class="label text-error">
							{form.passwordError}
						</p>{/if}
				</fieldset>
				<button type="submit" onclick={() => register(false)} class="btn btn-primary my-5 w-full"
					>Register</button
				>
			</form>
			<a href="/auth/login" class="link link-primary">Already have an account? Login</a>
		{/if}
	</div>
</main>
