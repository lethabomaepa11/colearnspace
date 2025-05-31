<script>
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	let challenge = $state({
		title: '',
		content:
			'<h1>Challenge Intro Page</h1><br/><p>You can add more details about your challenge here, attach images and links</p>',
		slug: '',
		participation: 'Public - Anyone',
		code: '',
		voting: 'Public',
		image: '',
		startDate: '',
		endDate: ''
	});

	const generateUniqueCode = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let code = '';
		for (let i = 0; i < 8; i++) {
			code += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		challenge.code = code;
	};

	const submitChallenge = () => {
		localStorage.setItem('challenge', JSON.stringify(challenge));
	};
</script>

<BackButtonHeader title="Create a Challenge" />

<form class="space-y-4">
	<span class="flex w-full flex-col items-start justify-between gap-5 lg:flex-row">
		<section class="w-full">
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
					onchange={() => (challenge.slug = challenge.title.replace(/\s+/g, '-').toLowerCase())}
				/>
			</div>
			<!-- Display the url of the challenge onchange of the title, use the title to create a slug-->
			{#if challenge.slug}
				<p class="text-sm">Your challenge link will be as follows:</p>
				<p class="link link-primary text-sm">
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
					class="file-input file-input-primary w-full"
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
					bind:value={challenge.endDate}
				/>
			</div>
		</section>
		<!--Extra settings-->
		<section class="w-full">
			<fieldset class="fieldset border-base-300 rounded-box border p-4">
				<legend class="fieldset-legend">Extra Settings</legend>
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
	</span>
	<!-- Trix Editor for challenge page content-->
	<div class="form-control flex flex-col">
		<label class="label" for="content">
			<span class="label-text"
				>Content
				<p class="text-sm">
					This will be displayed on the challenge page, customize as you see fit
				</p></span
			>
		</label>
		<TrixEditor id="content" bind:value={challenge.content} />
	</div>

	<button type="submit" class="btn btn-primary">Create Challenge</button>
</form>
