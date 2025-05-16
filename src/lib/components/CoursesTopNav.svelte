<script>
	import { page } from '$app/state';
	import { courseSearch } from '$lib/states.svelte';
	import { ArrowLeft, Mic, Plus, Search } from '@lucide/svelte';
	import { Popover } from 'melt/builders';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	/**
	 * The history feature is incomplete and will be added in the future
	 */
	const handleSpeechToText = () => {
		if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
			try {
				const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
				const recognition = new SpeechRecognition();
				recognition.lang = 'en-US';
				recognition.interimResults = false;
				recognition.maxAlternatives = 1;

				recognition.onresult = (event) => {
					const voiceInput = event.results[0][0].transcript;
					courseSearch.text = voiceInput;
					addToHistory(courseSearch.text);
				};

				recognition.start();
			} catch (error) {
				alert('Something went wrong while starting speech recognition.');
			}
		} else {
			alert(
				"Sorry, your browser doesn't support voice search. Please use Chrome on desktop or Android."
			);
		}
	};
	const addToHistory = (text) => {
		if (text.trim().length < 4) return;
		let history = JSON.parse(localStorage.getItem('courseSearchHistory'));
		if (!history) {
			history = [text];
			localStorage.setItem('courseSearchHistory', JSON.stringify(history));
		} else {
			if (!history.includes(text)) {
				history.push(text);
				localStorage.setItem('courseSearchHistory', JSON.stringify(history));
			}
		}
		courseSearch.history = history;
	};
</script>

<div transition:slide class="hidden w-full items-center gap-4 lg:flex">
	<div class="dropdown w-full" role="button">
		<label class="input w-full">
			<Search />

			<input
				type="search"
				class=" w-full grow focus:outline-0 active:outline-0"
				placeholder="Search"
				bind:value={courseSearch.text}
				onchange={addToHistory(courseSearch.text)}
			/>

			<button class="btn btn-ghost"><Search /></button>
		</label>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<ul
			tabindex="0"
			class="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 py-5 shadow-sm"
		>
			{#if courseSearch.history.length > 0}
				{#each courseSearch.history as history}
					<li><button onclick={() => (courseSearch.text = history)}>{history}</button></li>
				{/each}
			{:else}
				<li>No history</li>
			{/if}
		</ul>
	</div>
	<button onclick={handleSpeechToText} class="btn btn-outline btn-circle">
		<Mic />
	</button>
</div>

<!--- For Mobile-->
{#if courseSearch.mobileSearch}
	<div
		transition:slide
		class="bg-base-100 fixed top-0 z-50 flex w-full items-center gap-4 px-4 py-5"
	>
		<button onclick={courseSearch.toggleMobileSearch} class="btn btn-ghost btn-circle">
			<ArrowLeft />
		</button>
		<div class="dropdown w-full" role="button">
			<label class="input w-full">
				<Search />

				<input
					type="search"
					class=" w-full grow focus:outline-0 active:outline-0"
					placeholder="Search"
					bind:value={courseSearch.text}
					onchange={addToHistory(courseSearch.text)}
				/>

				<button class="btn btn-ghost"><Search /></button>
			</label>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 py-5 shadow-sm"
			>
				{#if courseSearch.history.length > 0}
					{#each courseSearch.history as history}
						<li><button onclick={() => (courseSearch.text = history)}>{history}</button></li>
					{/each}
				{:else}
					<li>No history</li>
				{/if}
			</ul>
		</div>
		<button onclick={handleSpeechToText} class="btn btn-ghost btn-circle">
			<Mic />
		</button>
	</div>
{/if}
