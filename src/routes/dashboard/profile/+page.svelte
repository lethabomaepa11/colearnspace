<script>
	import Loading from '$lib/components/Loading.svelte';
	import { appState } from '$lib/states.svelte.js';

	appState.setAppTitle('Profile');

	let { data, form } = $props();
	let { userData } = data;
	let editData = $state(userData);

	//error or success info
	let info = $state({
		message: null,
		color: null,
		type: null
	});

	let loadingStates = {
		checks: false,
		save: false
	};
	const clearInfo = () => {
		info.message = null;
		info.color = null;
		info.type = null;
	};
	const setInfo = (message, color, type) => {
		info.message = message;
		info.color = color;
		info.type = type;
	};

	const checkUsername = async (username) => {
		clearInfo();
		const res = await fetch(`/api/check-username?username=${username}`);
		const data = await res.json();
		if (data.available) {
			setInfo('Username available', 'text-success', 'success');
		} else {
			setInfo('Username not available', 'text-error', 'error');
		}
	};

	if (form?.success) {
		setInfo('Changes saved', 'text-success', 'success');
	} else if (form?.error) {
		setInfo('Error saving changes', 'text-error', 'error');
	}
</script>

{#if loadingStates.save}
	<Loading text="Saving changes..." />
{:else}
	<form method={info.type == 'success' ? 'POST' : ''} class="space-y-4" name="user_data">
		<h1 class="text-2xl">Edit your profile</h1>
		{#if info.message}
			<div class="alert {info.color}">{info.message}</div>
		{/if}
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Name and Surname</legend>
			<input
				bind:value={editData.name}
				type="text"
				class="input"
				name="name"
				placeholder="Enter your name and surname"
			/>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Username</legend>
			<input
				name="username"
				onchange={() => checkUsername(editData.username)}
				bind:value={editData.username}
				type="text"
				class="input"
				placeholder="Type here"
			/>
		</fieldset>
		<button
			onclick={() => (loadingStates.save = true)}
			disabled={info.type != 'success'}
			type="submit"
			class="btn btn-primary">Save</button
		>
	</form>
{/if}
