<script>
	import { goto } from '$app/navigation';
	import { uploadImage } from '$lib';
	import Modal from '$lib/components/Modal.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { Link, X } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const metaContent = 'Showcase your project on ColearnSpace';
	const MAX_NUM_LINKS = 3;
	let error = $state({ title: '', message: '' });
	let progress = $state({ title: '', message: '' });
	let { data } = $props();
	const { isLoggedIn } = data;
	let hasAutoSaved = $state(false);
	//set the header of the app
	appState.setAppTitle('Create');
	let project = $state({
		title: '',
		description: '',
		content:
			'<blockquote>Upload screenshots and files that are less than 50mb, add more details about the project',
		image: '',
		technologies: '',
		links: []
	});
	const addLink = () => {
		if (project.links.length == MAX_NUM_LINKS) {
			alert('You have reached a maximum number of 3 links');
			return;
		}
		//this runs if the max has not been reached
		project.links.push({ name: '', url: '' });
	};
	const removeLink = (index) => {
		project.links.splice(index, 1);
	};
	const publishProject = async (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			error.title = 'You need to login to create a project';
			error.message = `Click on the orange login button on the top right corner to login<br/>
				Your project has been saved in localstorage, you can still edit it.
		`;
			document.getElementById('errorModal').show();
			localStorage.setItem('project', JSON.stringify(project));
			return;
		}
		progress.title = 'Submitting Project';
		progress.message = 'Please wait...';
		document.getElementById('progressModal').show();
		//split the technologies into an array
		project.technologies = project.technologies.split(',');
		//upload the image from client side
		//upload the image first then proceed with the rest
		progress.message = 'Uploading your image...';
		const image_url = await uploadImage(project.image, 'user_project_logo', supabase);

		if (!image_url) {
			document.getElementById('progressModal').close();
			error.title = 'Failed to upload your image';
			error.message =
				'Failed to upload your image, please make sure the file is less than 5mb, and try again.';
			document.getElementById('errorModal').show();
			return;
		}
		project.image = image_url;
		progress.message = 'Finishing up...';
		const res = await fetch('/api/projects', {
			method: 'POST',
			body: JSON.stringify({ project })
		});
		const data = await res.json();
		if (data.success) {
			progress.message = 'Project created successfully...';
			progress.title = 'Project Created, Redirecting...';
			document.getElementById('progressModal').close();
			localStorage.removeItem('project'); //remove any locally saved project
			goto(`/portal/projects/${data.data.id}`);
		} else {
			errorMessage = data.message;
			document.getElementById('errorModal').show();
		}
		//console.log(data);
	};
	const fileLimitError = () => {
		error.title = 'Max File Size Exceeded';
		error.message =
			'Failed to upload your image, please make sure the file is less than 5mb, and try again.';
		document.getElementById('errorModal').show();
	};
	const fileTypeError = () => {
		error.title = 'Invalid File Type';
		error.message =
			'Failed to upload your image, please make sure the file is an image, and try again.';
		document.getElementById('errorModal').show();
	};
	const autoSave = () => {
		localStorage.setItem('project', JSON.stringify(project));
		hasAutoSaved = true;
		setTimeout(clearHasAutoSaved, 2000);
	};
	const clearHasAutoSaved = () => {
		hasAutoSaved = false;
	};

	onMount(() => {
		if (localStorage.getItem('project')) {
			project = JSON.parse(localStorage.getItem('project'));
			progress.title = 'Welcome Back!';
			progress.message = 'Your project was saved on your localstorage, you can still edit it.';
			document.getElementById('progressModal').show();
		}
	});
</script>

<!--SEO-->
<svelte:head>
	<title>Showcase a project | ColearnSpace</title>
	<meta name="description" content={metaContent} />
	<meta property="og:description" content={metaContent} />
	<meta name="twitter:title" content="Showcase a project  | ColearnSpace" />
	<meta name="twitter:description" content={metaContent} />
	<!-- Open Graph Meta Tags for Link Previews -->
	<meta property="og:title" content="Showcase a project  | ColearnSpace" />
</svelte:head>
<Modal title={progress.title} id="progressModal">
	<p class="text-info">{progress.message}</p>
</Modal>
<Modal title={error.title} id="errorModal">
	<p class=" text-error">{@html error.message ? error.message : 'Something went wrong'}</p>
	<button
		class="btn btn-primary w-full"
		onclick={() => document.getElementById('errorModal').close()}>Close</button
	>
</Modal>
{#if hasAutoSaved}
	<div role="alert" class="alert alert-info alert-soft fixed right-0 bottom-0 z-50">
		<span>Project Auto Saved</span>
		<span class="loading loading-infinity"></span>
	</div>
{/if}
<form onchange={autoSave} onsubmit={publishProject} class="space-y-4 p-5 py-20">
	<div class="from-accent to-primary w-full rounded-2xl bg-gradient-to-br p-5">
		<h2 class="text-2xl">Showcase your project</h2>
		<code class="font-mono text-xs"
			>You can display your projects on your portfolio from our api, <a
				href="/docs/projects"
				class="link link-neutral">learn how..</a
			></code
		>
	</div>
	<span class="flex w-full flex-col items-start justify-between gap-5 lg:flex-row">
		<section class="w-full space-y-4">
			<div class="form-control flex w-full flex-col">
				<label class="label" for="title">
					<span class="label-text">Title *</span>
				</label>
				<input
					id="title"
					type="text"
					placeholder="Your project title"
					class="input input-bordered w-full"
					required
					minlength="5"
					bind:value={project.title}
				/>
			</div>
			<div class="form-control flex w-full flex-col">
				<label class="label" for="description">
					<span class="label-text">Short description *</span>
				</label>
				<input
					id="description"
					type="text"
					placeholder="A short description about your project"
					class="input input-bordered w-full"
					required
					minlength="5"
					bind:value={project.description}
				/>
			</div>
			<div class="form-control flex w-full flex-col">
				<label class="label" for="title">
					<span class="label-text">Technologies, comma separated *</span>
				</label>
				<input
					id="technologies"
					type="text"
					placeholder="Enter technologies you used in this project, comma separated"
					class="input input-bordered w-full"
					required
					minlength="5"
					bind:value={project.technologies}
				/>
			</div>
			<div class="form-control flex w-full flex-col">
				<label class="label" for="logo">
					<span class="label-text">Logo *</span>
				</label>
				<input
					id="logo"
					type="file"
					accept="image/*"
					class="file-input file-input-bordered w-full"
					required
					minlength="5"
					onchange={(e) => {
						project.image = e.target.files[0];
						if (project.image.size > 5000000) {
							e.target.value = null;
							project.image = null;
							fileLimitError();
						}
						if (!project.image.type.includes('image/')) {
							e.target.value = null;
							project.image = null;
							fileTypeError();
						}
					}}
				/>
			</div>
			<div class="form-control flex w-full flex-col">
				<label class="label" for="links">
					<span class="label-text">Links</span>
				</label>
				<section class="grid grid-cols-1 items-center gap-4 lg:grid-cols-3">
					{#each project.links as link, i}
						<fieldset class=" fieldset w-full border p-5">
							<legend class="fieldset-legend flex w-full items-center justify-between">
								<span>
									{#if project.links[i].name.length > 1}
										{project.links[i].name}
									{:else}
										Link {i + 1}
									{/if}
								</span>
								<button type="button" class="btn btn-ghost text-error" onclick={() => removeLink(i)}
									><X /></button
								>
							</legend>
							<label class="label" for="link{i + 1}">
								<span class="label-text">Link name</span>
							</label>
							<input
								id="link{i + 1} name"
								type="text"
								placeholder="Add Link name"
								class="input input-bordered w-full"
								required
								minlength="5"
								bind:value={project.links[i].name}
							/>
							<label class="label" for="link{i + 1}">
								<span class="label-text">Url</span>
							</label>
							<input
								id="link{i + 1}"
								type="url"
								placeholder="Add Link"
								class="input input-bordered w-full"
								required
								minlength="5"
								bind:value={project.links[i].url}
							/>
						</fieldset>
					{/each}
					{#if project.links.length != MAX_NUM_LINKS}
						<button class="btn btn-ghost" onclick={addLink} type="button"
							>Add a link<Link />
						</button>
					{/if}
				</section>
			</div>
			<div class="form-control flex w-full flex-col">
				<label class="label" for="title">
					<span class="label-text">Content</span>
				</label>
				<TrixEditor id="user_projects" bind:value={project.content} />
			</div>
			<button type="submit" class="btn btn-primary mb-10 w-full">Publish</button>
		</section></span
	>
</form>
