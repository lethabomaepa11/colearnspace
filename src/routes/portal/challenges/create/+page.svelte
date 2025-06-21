<script>
	import { goto } from '$app/navigation';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { uploadImage } from '$lib/server/projects/main';
	import { appState, theme } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import moment from 'moment';
	import { onMount } from 'svelte';

	appState.setAppTitle('Create');
	let challenge = $state({
		title: '',
		content:
			'<h1>Challenge Intro Page</h1><br/><p>You can add more details about your challenge here, attach images and links</p>',
		slug: '',
		image: '',
		startDate: '',
		endDate: ''
		/*participation: 'Public - Anyone',
		code: '',
		voting: 'Public',
		
		colors: {
			light: '#FC6519',
			dark: '#FC6519'
		}*/
	});
	let error = $state({ title: '', message: '' });
	let isLoading = $state(false);
	let sameColors = $state(true);
	const generateUniqueCode = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let code = '';
		for (let i = 0; i < 8; i++) {
			code += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		challenge.code = code;
	};

	const submitChallenge = async (e) => {
		isLoading = true;
		e.preventDefault();
		localStorage.setItem('challenge', JSON.stringify(challenge)); //later features to autosave automatically

		if (moment(challenge.startDate).isAfter(moment(challenge.endDate))) {
			error.title = 'Error Occured';
			error.message = 'Start date cannot be after end date';
			document.getElementById('errorModal').show();
			isLoading = false;
			return;
		}
		//check if the cover image was uploaded successfully, if not, do not proceed
		if (!challenge.image) {
			error.title = 'Error Occured';
			error.message = 'Please make sure that your cover image is uploaded first before proceeding';
			document.getElementById('errorModal').show();
			isLoading = false;
			return;
		}
		//call the api
		const res = await fetch('/api/challenge', {
			method: 'POST',
			body: JSON.stringify({ challenge })
		});
		const response = await res.json();
		if (response.status === 200) {
			goto(`/portal/challenges/${response.data.slug}`);
		} else {
			error.title = 'Error Occured';
			error.message = response.message;
			document.getElementById('errorModal').show();
		}

		isLoading = false;
	};

	const onFileChange = async (e) => {
		//check file size, return if it exceeds 50mb
		if (e.target.files[0].size > 50000000) {
			e.target.value = null;
			error.title = 'Max File Size Exceeded';
			error.message =
				'Failed to upload your image, please make sure the file is less than 50mb, and try again.';
			document.getElementById('errorModal').show();
			return;
		}
		//check file type if its of type image, if not return
		if (!e.target.files[0].type.includes('image/')) {
			e.target.value = null;
			error.title = 'Invalid File Type';
			error.message =
				'Failed to upload your image, please make sure the file is an image, and try again.';
			document.getElementById('errorModal').show();
			return;
		}
		const coverImage = document.getElementById('coverImage').files[0];

		//upload the file if the challenge.image is empty, else update the image
		if (!challenge.image) {
			//insert new image
			if (coverImage) {
				challenge.image = await uploadImage(coverImage, 'challenges', supabase);
			}
			//cannot update image yet
		}
	};

	const generateSlug = (text) => {
		let slug = text;

		if (text.length > 25) {
			slug = text.substring(0, 25);
		}
		challenge.slug = slug
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
	};
	const metaContent = `Create a new challenge on ColearnSpace`;
</script>

<!--SEO-->
<svelte:head>
	<title>Create challenge | ColearnSpace</title>
	<meta name="description" content={metaContent} />
	<meta property="og:description" content={metaContent} />
	<meta name="twitter:title" content="Create challenge | ColearnSpace" />
	<meta name="twitter:description" content={metaContent} />
	<!-- Open Graph Meta Tags for Link Previews -->
	<meta property="og:title" content="Create challenge | ColearnSpace" />
</svelte:head>

<Modal title={error.title} id="errorModal">
	<p class=" text-error">{error.message}</p>
	<button
		onclick={() => document.getElementById('errorModal').close()}
		class="btn btn-ghost mt-5 w-full">Try again</button
	>
</Modal>

<BackButtonHeader title="Create a Challenge" />
{#if isLoading}
	<main class="flex min-h-screen items-center justify-center rounded-2xl p-10 shadow-2xl">
		<Loading />
	</main>
{:else}
	<form class="space-y-4" onsubmit={submitChallenge}>
		<span class="flex w-full flex-col items-start justify-between gap-5 lg:flex-row">
			<section class="w-full space-y-4">
				<div class="form-control flex w-full flex-col">
					<label class="label" for="title">
						<span class="label-text">Title</span>
					</label>
					<input
						id="title"
						type="text"
						placeholder="Challenge title"
						class="input input-bordered w-full"
						required
						minlength="5"
						bind:value={challenge.title}
					/>
				</div>
				<div class="form-control flex w-full flex-col">
					<label class="label" for="url">
						<span class="label-text">Unique name</span>
					</label>
					<span class="input input-bordered w-full overflow-hidden p-0">
						<input
							id="url"
							type="text"
							placeholder="Provide a unique name for your challenge"
							required
							minlength="5"
							maxlength="25"
							bind:value={challenge.slug}
							onchange={() => {
								challenge.slug = challenge.slug
									.toLowerCase()
									.replace(/[^a-z0-9]+/g, '-') // replace non-alphanumerics with dashes
									.replace(/(^-|-$)+/g, '') // trim dashes from start/end
									.slice(0, 50); //Create a slug by replacing spaces and / \ characters
							}}
						/>
						<button class="btn rounded-none" onclick={() => generateSlug(challenge.title)}
							>Generate</button
						>
					</span>
				</div>
				<!-- Display the url of the challenge onchange of the title, use the title to create a slug-->
				{#if challenge.slug}
					<p class="my-2 text-sm">Your challenge link will be as follows:</p>
					<p class="link link-primary my-2 text-sm">
						https://colearnspace.netlify.app/portal/challenges/{challenge.slug}
					</p>
				{/if}
				<div class="form-control flex w-full flex-col">
					<label class="label" for="coverImage">
						<span class="label-text">Cover Image</span>
					</label>
					<input
						id="coverImage"
						type="file"
						placeholder="Cover Image"
						class="file-input file-input-bordered w-full"
						onchange={onFileChange}
						accept="image/*"
					/>
				</div>
				<div class="form-control flex w-full flex-col">
					<label class="label" for="startDate">
						<span class="label-text">Start Date</span>
					</label>
					<input
						id="startDate"
						type="datetime-local"
						placeholder="Challenge Start Date"
						class="input input-bordered w-full"
						required
						bind:value={challenge.startDate}
					/>
				</div>
				<div class="form-control flex w-full flex-col">
					<label class="label" for="endDate">
						<span class="label-text">End Date</span>
					</label>
					<input
						id="endDate"
						type="datetime-local"
						placeholder="Challenge End Date"
						class="input input-bordered w-full"
						required
						bind:value={challenge.endDate}
					/>
				</div>
			</section>

			{#if !appState.isMVP}
				<!--Extra settings: Disabled in first MVP version-->
				<section class="w-full">
					<fieldset class="fieldset border-base-300 rounded-box border p-4">
						<legend class="fieldset-legend">Extra Settings</legend>
						<label class="label" for="code">Colors & Theme</label>
						<span
							id="code"
							type="text"
							class="input w-full p-0"
							placeholder="Create an 8 character code"
						>
							<span type="button" class="btn rounded-none">Color in light mode</span>
							<input
								type="color"
								bind:value={challenge.colors.light}
								onchange={() => {
									if (sameColors) {
										challenge.colors.dark = challenge.colors.light;
									}
								}}
							/>
						</span>
						<div class="join flex items-center gap-3">
							<span class="join-item">Same Colors for dark and light mode?</span>
							<input
								class="join-item btn {sameColors ? 'bg-primary' : ''}"
								type="radio"
								onclick={() => (sameColors = true)}
								name="options"
								aria-label="Yes"
							/>
							<input
								class="join-item btn {!sameColors ? 'bg-primary' : ''}"
								type="radio"
								name="options"
								aria-label="No"
								onclick={() => (sameColors = false)}
							/>
						</div>
						{#if !sameColors}
							<span
								id="code"
								type="text"
								class="input w-full p-0"
								placeholder="Create an 8 character code"
							>
								<span type="button" class="btn rounded-none">Color in dark mode</span>
								<input type="color" bind:value={challenge.colors.dark} />
							</span>
						{/if}
						<label class="label" for="participation">Who can participate?</label>
						<select
							id="participation"
							class="select select-bordered w-full"
							placeholder="Who can participate?"
							bind:value={challenge.participation}
						>
							<option>Public - Anyone</option>
							<option>Private - Anyone with a link</option>
							<option>Private - Use a private code to join</option>
							<option disabled>Organization Members - Coming soon</option>
						</select>
						<!--If the challenge is private in which the creator prefers participants to join using a private code-->
						{#if challenge.participation === 'Private - Use a private code to join'}
							<label class="label" for="code">Private code</label>
							<span
								id="code"
								type="text"
								class="input w-full p-0"
								placeholder="Create an 8 character code"
							>
								<input
									type="text"
									placeholder="Create a 6 character code"
									bind:value={challenge.code}
									required
									length="8"
								/>
								<button type="button" class="btn rounded-none" onclick={generateUniqueCode}
									>Generate</button
								>
							</span>
						{/if}
						<label class="label" for="voting">Who can vote for submissions?</label>
						<select
							bind:value={challenge.voting}
							id="voting"
							class="select select-bordered w-full"
							placeholder="Who can Vote?"
						>
							<option>Public</option>
							<option>Judges</option>
							<option>Participants</option>
						</select>
					</fieldset>
				</section>
			{/if}
		</span>
		<!-- Trix Editor for challenge page content-->
		<div class="form-control flex flex-col">
			<label class="label" for="content">
				<span class="label-text w-full"
					>Content
					<p class="text-sm text-wrap">
						This will be displayed on the challenge page, customize as you see fit
					</p></span
				>
			</label>
			<TrixEditor id="challenges" bind:value={challenge.content} colors={challenge.colors} />
		</div>

		<button type="submit" class="btn btn-primary mb-10 w-full">Create Challenge</button>
	</form>
{/if}
