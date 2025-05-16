<script>
	import LandingPageCoursePreview from '$lib/components/LandingPageCoursePreview.svelte';
	import LandingPageFeatures from '$lib/components/LandingPageFeatures.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import { theme } from '$lib/states.svelte';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	// Functionality can go here later (e.g., scroll effects, AOS)
	const getRandomItem = (array) => {
		return array[Math.floor(Math.random() * array.length)];
	};
	const images = [
		'/site/illustrations/collaboration.svg',
		'/site/illustrations/knowledge.svg',
		'/site/branding/ColearnSpace-full.png',
		'/site/branding/ColearnSpace-text.png'
	];

	let image = $state(getRandomItem(images));

	onMount(() => {
		const interval = setInterval(() => {
			image = getRandomItem(images);
		}, 30000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>ColearnSpace</title>
	<meta
		name="description"
		content="ColearnSpace is your digital skill-building hub — crafted for curious minds. Skip the chaos of YouTube playlists and dive into structured, community-powered courses designed for growth, support, and learning at your pace"
	/>
</svelte:head>

<!-- HERO SECTION -->
<main transition:fade class="flex">
	<section
		class="relative isolate flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center text-black {theme.darkTheme
			? 'border-gray-700'
			: 'border-gray-100'}"
	>
		<!-- Branding, hidden for now -->
		<div class=" absolute -z-30 flex min-h-screen w-full items-center justify-center">
			<img class="w-full" src={image} alt="Sharing Knowledge" />
		</div>

		<div class="flex min-h-screen w-screen flex-col items-center justify-center">
			<!-- Headline -->
			<h1
				class="font-poetsen text-primary relative z-10 mb-4 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-6xl"
			>
				Learn. Connect. Grow.
			</h1>

			<!-- Subheading -->
			<p class="relative z-10 mb-10 max-w-2xl text-lg md:text-xl">
				<b>ColearnSpace</b> is your digital skill-building hub — crafted for curious minds. Skip the
				chaos of YouTube playlists and dive into structured, community-powered courses designed for growth,
				support, and learning at your pace.
			</p>

			<div class="flex items-center gap-4">
				<!-- CTA Buttons -->
				<a href="/auth/register" class="btn btn-primary btn-lg"> 🚀 Get Started</a>
				<a href="/portal" class="btn btn-lg btn-outline text-primary"> Explore More</a>
			</div>
		</div>

		<!-- Curved white bottom decoration -->
	</section>
</main>
<!-- FEATURES SECTION -->

<LandingPageFeatures />

<!-- TESTIMONIALS SECTION -->
<Testimonials />

<!-- COURSE PREVIEW SECTION -->
<LandingPageCoursePreview />
