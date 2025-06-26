<script>
	import { goto } from '$app/navigation';
	import { uploadImage } from '$lib';
	import Modal from '$lib/components/Modal.svelte';
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { ArrowLeft, Github, Link, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import { slide } from 'svelte/transition';
	import Seo from '$lib/components/SEO.svelte';

	//VARIABLES
	const metaContent = 'Showcase your project on ColearnSpace';
	const MAX_NUM_LINKS = 3; //Maximum number of allowed links
	let error = $state({ title: '', message: '' }); //error object
	let progress = $state({ title: '', message: '', active: false }); //progress object, display info about something or progress
	let { data } = $props(); //data from props
	const { isLoggedIn } = data; //logged_in state
	let hasAutoSaved = $state(false); //tracks if the project has been autosaved
	//project creation state, if the user is creating a new project or autofilling from github
	let projectCreation = $state({
		new: true,
		github: false,
		prevState: null
	});

	appState.setAppTitle('Create'); //set the header of the app
	//Project object, binded to the form, holds the project data
	let project = $state({
		title: '',
		description: '',
		content:
			'<blockquote>Upload screenshots and files that are less than 50mb, add more details about the project</blockquote>',
		image: '',
		technologies: '',
		links: []
	});

	const setProjectCreation = (projCreationObj) => {
		//set the project creation state
		projectCreation = {
			prevState: projectCreation,
			new: projCreationObj.new,
			github: projCreationObj.github
		};
		if (projCreationObj.new && !projCreationObj.github) {
			//set previous state to null as this is the same as the inital state of the object
			projectCreation.prevState = null;
			//delete the project from localstorage
			localStorage.removeItem('project');
		}
		//clear project state
		project = {
			title: '',
			description: '',
			content:
				'<blockquote>Upload screenshots and files that are less than 50mb, add more details about the project</blockquote>',
			image: '',
			technologies: '',
			links: []
		};
	};
	const displayError = (title, message) => {
		error.title = title;
		error.message = message;
		document.getElementById('progressModal').close();
		document.getElementById('errorModal').show();
	};

	const getProjectDetailsFromGitHub = async (repoUrl) => {
		//Show progress modal and info
		progress.title = 'Fetching github repo details';
		progress.message = 'Please wait...';
		document.getElementById('progressModal').show();

		//validate the github repo url
		progress.message = 'Validating github repo url...';
		const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
		if (!match) {
			//if it is invalid, show error
			displayError('Invalid github repo url', 'Please enter a valid github repo url');
			return;
		}

		const [owner, repo] = [match[1], match[2]];
		const base = `https://api.github.com/repos/${owner}/${repo}`;
		progress.message = 'Fetching github repo details...';
		try {
			const [repoRes, readmeRes, languagesRes] = await Promise.all([
				fetch(base).then((res) => res.json()),
				fetch(`${base}/readme`, {
					headers: { Accept: 'application/vnd.github.v3.raw' }
				}).then((res) => res.text()),
				fetch(`${base}/languages`).then((res) => res.json())
			]);
			progress.message = 'Successfully fetched github repo details...';

			const links = [{ name: 'GitHub', url: repoRes.html_url }];
			progress.message = 'Filling the links...';
			if (repoRes.homepage) {
				links.push({ name: 'Live Site', url: repoRes.homepage });
			}
			progress.message = 'Filling in the project info';
			if (repoRes.status === '404') {
				displayError(
					'Repo cannot be fetched',
					'Please enter a valid github repo url, make sure the repo is public'
				);
				return;
			}
			project = {
				...project,
				...{
					title: repoRes.name || '',
					description: repoRes.description || '',
					content: marked.parse(readmeRes || ''),
					technologies: Object.keys(languagesRes).join(', '),
					links
				}
			};
			progress.message = 'Displaying the project to you...';
			//Display the project
			projectCreation.github = false;
			projectCreation.new = false;
			document.getElementById('progressModal').close();
			autoSave();
		} catch (e) {
			error.title = 'Error fetching GitHub data';
			displayError(error.title, e.message);
			project = {
				...project,
				...{
					title: '',
					description: '',
					technologies: '',
					links: []
				}
			};
		}
	};

	const addLink = () => {
		if (project.links.length >= MAX_NUM_LINKS) {
			//Extra validation even though the add link button will be disabled.
			error.title = 'Maximum number of links reached';
			error.message = 'You can only add ' + MAX_NUM_LINKS + ' links';
			displayError(error.title, error.message);
			return;
		}
		//this runs if the max has not been reached
		project.links.push({ name: '', url: '' });
	};
	const removeLink = (index) => {
		project.links.splice(index, 1);
		autoSave();
	};
	const publishProject = async (e) => {
		progress.active = true;
		e.preventDefault();
		//Check if the user is logged in, if not, show an error
		if (!isLoggedIn) {
			progress.active = false;
			error.title = 'You need to login to create a project';
			error.message = `Click on the orange login button on the top right corner to login<br/>
				Your project has been saved in localstorage, you can still edit it.
		`;
			document.getElementById('errorModal').show();
			localStorage.setItem('project', JSON.stringify(project));
			return;
		}
		//Show progress modal and info
		progress.title = 'Submitting Project';
		progress.message = 'Please wait...';
		document.getElementById('progressModal').show();

		//split the technologies into an array
		project.technologies = project.technologies.split(',');

		//upload the image first then proceed with the rest
		progress.message = 'Uploading your image...';
		const image_url = await uploadImage(project.image, 'user_project_logo', supabase);

		//If image is not uploaded, close the progress modal and show an error
		if (!image_url) {
			progress.active = false;
			document.getElementById('progressModal').close();
			error.title = 'Failed to upload your image';
			error.message =
				'Failed to upload your image, please make sure the file is less than 5mb, and try again.';
			document.getElementById('errorModal').show();
			return;
		}
		//If image is uploaded, update the project
		project.image = image_url;
		//display feedback to the user
		progress.message = 'Finishing up...';
		//post the project to the db
		const res = await fetch('/api/projects', {
			method: 'POST',
			body: JSON.stringify({ project })
		});
		const data = await res.json();
		if (data.success) {
			//show success message
			progress.message = 'Project created successfully...';
			progress.title = 'Project Created, Redirecting...';
			document.getElementById('progressModal').close();
			localStorage.removeItem('project'); //remove the locally saved project
			goto(`/portal/projects/${data.data.id}`); //redirect to the project page
		} else {
			//close the progress modal and show an error if the project was not created successfully
			progress.active = false;
			document.getElementById('progressModal').close();
			error.title = 'Error creating project...';
			errorMessage = data.message;
			document.getElementById('errorModal').show();
		}
	};

	/**@description Displays an error if the file size is above the file limit for uploading an image*/
	const fileLimitError = () => {
		error.title = 'Max File Size Exceeded';
		error.message =
			'Failed to upload your image, please make sure the file is less than 5mb, and try again.';
		displayError(error.title, error.message);
	};
	/**@description Displays an error if the file type is not an image*/
	const fileTypeError = () => {
		error.title = 'Invalid File Type';
		error.message =
			'Failed to upload your image, please make sure the file is an image, and try again.';
		displayError(error.title, error.message);
	};

	/**@description Autosaves the project to localstorage*/
	const autoSave = () => {
		localStorage.setItem('project', JSON.stringify(project)); //save the project to localstorage, rewriting the existing project
		hasAutoSaved = true; //set the hasAutoSaved state to true
		setTimeout(clearHasAutoSaved, 2000); //clear after 2 seconds
	};
	/**@description Clears the hasAutoSaved state*/
	const clearHasAutoSaved = () => {
		hasAutoSaved = false;
	};

	onMount(() => {
		//Get the locally stored project and
		if (localStorage.getItem('project')) {
			project = JSON.parse(localStorage.getItem('project'));
			//show a progress modal with info about the locally saved project
			progress.title = 'Welcome Back!';
			progress.message = 'Your project was saved on your localstorage, you can still edit it.';
			document.getElementById('progressModal').show();
			projectCreation.new = false;
			projectCreation.github = false;
			projectCreation.prevState = {
				new: true,
				github: false
			};
		}
	});
</script>

<!--SEO-->
<Seo title="Create Project | ColearnSpace" desc="Create a new project on ColearnSpace" />
<!--Modals-->
<!--Progress Modal-->
<Modal title={progress.title} id="progressModal">
	<p class="text-info">{progress.message}</p>
</Modal>
<!--Error Modal-->
<Modal title={error.title} id="errorModal">
	<p class=" text-error">{@html error.message ? error.message : 'Something went wrong'}</p>
	<button
		class="btn btn-primary w-full"
		onclick={() => document.getElementById('errorModal').close()}>Close</button
	>
</Modal>
<!--/Modals-->

<!--Auto Save Notification-->
{#if hasAutoSaved}
	<div
		transition:slide
		role="alert"
		class="alert alert-info alert-soft fixed right-0 bottom-0 z-50"
	>
		<span>Project Auto Saved</span>
		<span class="loading loading-infinity"></span>
	</div>
{/if}
<!--/Auto Save Notification-->
<!--When the user is here to create a new project-->
<div class="join px-5 pt-20">
	{#if projectCreation.prevState}
		<button
			transition:slide
			class="btn btn-ghost text-error"
			onclick={() => setProjectCreation(projectCreation.prevState)}
			><ArrowLeft /> Reset Project</button
		>
	{/if}
</div>
{#if projectCreation.new || projectCreation.github}
	<article
		name="Create a new project"
		class="flex min-h-screen w-full flex-col items-center gap-5 px-5"
	>
		<h2 class="text-2xl">Create a new project</h2>
		{#if projectCreation.github}
			<div transition:slide class="w-full space-y-4 lg:w-2/4">
				<p>This only works for public github repos</p>
				<div class="form-control flex w-full flex-col">
					<label class="label" for="title">
						<span class="label-text">Github Link *</span>
					</label>
					<input
						id="title"
						type="url"
						placeholder="Paste the project's github repo."
						class="input input-bordered w-full"
						required
						minlength="5"
						bind:value={project.links[0].url}
					/>
				</div>
				<button
					class="btn btn-primary w-full"
					onclick={() => getProjectDetailsFromGitHub(project.links[0].url)}>Autofill</button
				>
			</div>
		{:else}
			<p>How do you want to create your project?</p>
			<div transition:slide class="flex items-center gap-5">
				<button
					title="Fill in data manually"
					class="btn btn-primary"
					onclick={() => {
						setProjectCreation({ ...projectCreation, new: false });
					}}>Manually</button
				>
				<button
					onclick={() => {
						setProjectCreation({ new: false, github: true });
						project.links.push({ name: 'Github', url: '' });
					}}
					title="Fill in data from Github"
					class="btn btn-ghost bg-black text-white">Autofill from Github <Github /></button
				>
			</div>
		{/if}
	</article>
{:else if !progress.active}
	<form
		transition:slide
		onchange={autoSave}
		onsubmit={publishProject}
		class="flex flex-col items-center gap-4 p-5"
	>
		<div class="from-accent to-primary w-full rounded-2xl bg-gradient-to-br p-5 lg:w-2/3">
			<h2 class="text-2xl">Showcase your project</h2>
			<code class="font-mono text-xs"
				>You can display your projects on your portfolio from our api, <a
					href="/docs/projects"
					class="link link-neutral">learn how..</a
				></code
			>
		</div>
		<span class="flex w-full flex-col items-start justify-between gap-5 lg:w-2/3 lg:flex-row">
			<section class="w-full space-y-4">
				<!--Project Title-->
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
				<!--Project Description-->
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
				<!--Project Technologies-->
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
				<!--Project Logo-->
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
				<!--Project Links-->
				<div class="form-control flex w-full flex-col">
					<label class="label" for="links">
						<span class="label-text">Links</span>
					</label>
					<section class="grid grid-cols-1 items-center gap-4 lg:grid-cols-3">
						{#each project.links as link, i}
							<fieldset class=" fieldset border-base-200 w-full rounded-xl border p-5">
								<legend class="fieldset-legend flex w-full items-center justify-between">
									<span>
										{#if project.links[i].name.length > 1}
											{project.links[i].name}
										{:else}
											Link {i + 1}
										{/if}
									</span>
									<button
										type="button"
										class="btn btn-ghost text-error"
										onclick={() => removeLink(i)}><X /></button
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
							<!--Show the add link button only if the max has not been reached-->
							<button class="btn btn-ghost" onclick={addLink} type="button"
								>Add a link<Link />
							</button>
						{/if}
					</section>
				</div>
				<!--Project Content-->
				<div class="form-control flex w-full flex-col">
					<label class="label" for="title">
						<span class="label-text">Content</span>
					</label>
					<TrixEditor id="user_projects" bind:value={project.content} />
				</div>

				<button type="submit" class="btn btn-primary mb-10 w-full">Publish</button>
			</section>
		</span>
	</form>
{/if}
