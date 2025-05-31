<script>
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';

	const dummyChallenges = [
		{
			title: 'Challenge 1',
			description: 'Description 1',
			image: 'https://img.itch.zone/aW1nLzIxMzU3MTk2LmpwZw==/315x250%23c/zT3yCm.jpg'
		},
		{
			title: 'Challenge 2',
			description: 'Description 2',
			image: 'https://img.itch.zone/aW1nLzIxMzU3MTk2LmpwZw==/315x250%23c/zT3yCm.jpg'
		},
		{
			title: 'Challenge 1',
			description: 'Description 1',
			image: 'https://img.itch.zone/aW1nLzIxMzU3MTk2LmpwZw==/315x250%23c/zT3yCm.jpg'
		},
		{
			title: 'Challenge 2',
			description: 'Description 2',
			image: 'https://img.itch.zone/aW1nLzIxMzU3MTk2LmpwZw==/315x250%23c/zT3yCm.jpg'
		}
	];
</script>

<svelte:head>
	<title>Challenges | ColearnSpace</title>
	<meta name="description" content="Explore a wide range of tech challenges on ColearnSpace" />
</svelte:head>
<main class="flex w-full flex-wrap gap-5">
	<BackButtonHeader title="Challenges">
		<a href="/portal/challenges/create" class="btn btn-primary">Create Challenge</a>
	</BackButtonHeader>
	<section class="grid w-full grid-cols-1 items-center justify-center gap-5 lg:grid-cols-3">
		{#each dummyChallenges as challenge}
			<div class="card border-base-300 flex w-full rounded-none border lg:rounded-xl">
				<figure><img src={challenge.image} alt="Shoes" class=" aspect-video w-full" /></figure>

				<div class="card-body">
					<h2 class="card-title">{challenge.title}</h2>
					<p>{challenge.description}</p>

					<p class="text-xs">21 May 2024 12h00 - 21 May 2024 16h00</p>
					<div class="card-actions items-center justify-between pt-5">
						<p class="link-hover text-sm">12 joined</p>
						<a href="/portal/challenges/{challenge.title}" class="btn btn-primary">Learn more</a>
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>
