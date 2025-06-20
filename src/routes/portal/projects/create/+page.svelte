<script>
	import TrixEditor from '$lib/components/TrixEditor.svelte';
	import { createproject } from '$lib/server/projects/main';
	import { appState } from '$lib/states.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { Link, X } from '@lucide/svelte';

	const metaContent = 'Showcase your project on ColearnSpace';
	const MAX_NUM_LINKS = 3;
	//set the header of the app
	appState.setAppTitle('Create');
	const project = $state({
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
		project.technologies = project.technologies.split(',');
		const data = await createproject(supabase, project);
		console.log(data);
	};
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

<form onsubmit={publishProject} class="space-y-4 p-5 py-20">
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
