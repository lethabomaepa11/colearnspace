<script>
	import { Check } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { appState } from '$lib/states.svelte';

	appState.setAppTitle("Settings");
	let { data } = $props();
	const { apiKeys, initialKey } = data;

	let isCopied = $state(false);
	const copyKey = (key) => {
		navigator.clipboard.writeText(key.id);
		isCopied = true;
		setTimeout(() => {
			clearIsCopied();
		}, 2000);
	};
	const clearIsCopied = () => {
		isCopied = false;
	};
</script>

{#if isCopied}
	<div
		transition:slide
		role="alert"
		class="alert alert-info alert-soft fixed right-0 bottom-20 z-50"
	>
		<span>Key Copied</span>
		<Check />
	</div>
{/if}
{#if initialKey}
	<div
		transition:slide
		role="alert"
		class="alert alert-info alert-soft fixed right-0 bottom-20 z-50"
	>
		<span>We have created you an API Key</span>
		<Check />
	</div>
{/if}

<div>
	<div class="flex items-center justify-between">
		<h1>API Keys</h1>
	</div>

	<div class="my-3 grid gap-8 space-y-2 sm:grid-cols-2 lg:grid-cols-3">
		{#each apiKeys as key}
			<div class="card bg-base-200 w-full">
				<div class="flex items-center justify-between p-5">
					<h2 class="card-title">{key.name}</h2>

					<button
						class="btn btn-primary {isCopied ? 'btn-disabled' : ''}"
						onclick={() => copyKey(key)}
					>
						{#if isCopied}
							Copied<Check />
						{:else}
							Copy
						{/if}
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
