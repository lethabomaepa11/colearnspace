<script>
	import { BookOpen, Users, Youtube, Sprout, HandHelping, Sparkles } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	// Functionality can go here later (e.g., scroll effects, AOS)
</script>

<svelte:head>
	<title>ColearnSpace</title>
	<meta
		name="description"
		content="Learn. Connect. Grow.
ColearnSpace is your digital learning hub – built for students, by students. Discover community-driven learning, real support, and growth at your pace."
	/>
</svelte:head>

<!-- HERO SECTION -->
<main transition:fade class="flex">
	<section
		class="relative isolate flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center text-white"
	>
		<!-- Decorative gradient blob -->

		<!-- Branding -->

		<!-- Headline -->
		<h1
			class="font-poetsen text-primary relative z-10 mb-4 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-6xl"
		>
			Learn. Connect. Grow.
		</h1>

		<!-- Subheading -->
		<p class="font-inter relative z-10 mb-10 max-w-2xl text-lg text-black md:text-xl">
			<b>ColearnSpace</b> is your digital skill-building hub — crafted for curious minds. Skip the chaos
			of YouTube playlists and dive into structured, community-powered courses designed for growth, support,
			and learning at your pace.
		</p>

		<div class="flex items-center gap-4">
			<!-- CTA Buttons -->
			<a href="/auth/register" class="btn btn-primary btn-lg"> 🚀 Get Started</a>
			<a href="/courses" class="btn btn-lg btn-outline text-primary"> Explore Courses </a>
		</div>

		<!-- Curved white bottom decoration -->
		<div class="bg-primary absolute bottom-0 left-0 z-0 h-32 w-full rounded-t-[100px]"></div>
	</section>
</main>
<!-- FEATURES SECTION -->

<section class="bg-primary px-6 py-24 text-center text-white">
	<h2 class="font-poetsen mb-16 text-4xl font-bold md:text-5xl">
		Why You'll Love <span class="text-accent">ColearnSpace</span>
	</h2>

	<div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
		<!-- Feature 1 -->
		<div
			class="group rounded-xl bg-white/90 p-8 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
		>
			<BookOpen class="text-primary mx-auto mb-4 h-10 w-10" />
			<h3 class="text-primary mb-3 text-xl font-bold">No Login Needed</h3>
			<p class="text-black">Jump right in — explore public courses without any signup hassle.</p>
		</div>

		<!-- Feature 2 -->
		<div
			class="group rounded-xl bg-white/90 p-8 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
		>
			<Users class="text-primary mx-auto mb-4 h-10 w-10" />
			<h3 class="text-primary mb-3 text-xl font-bold">Collaborative Learning</h3>
			<p class="text-black">Share what you know, learn what you don’t. Grow with peers.</p>
		</div>

		<!-- Feature 3 -->
		<div
			class="group rounded-xl bg-white/90 p-8 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
		>
			<Youtube class="text-primary mx-auto mb-4 h-10 w-10" />
			<h3 class="text-primary mb-3 text-xl font-bold">Embed Videos</h3>
			<p class="text-black">Use YouTube to teach. No uploads. Just plug in great content.</p>
		</div>

		<!-- Feature 4 -->
		<div
			class="group rounded-xl bg-white/90 p-8 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
		>
			<Sprout class="text-primary mx-auto mb-4 h-10 w-10" />
			<h3 class="text-primary mb-3 text-xl font-bold">Real-World Growth</h3>
			<p class="text-black">Level up through challenges, micro-courses, and skill tracks.</p>
		</div>

		<!-- Feature 5 -->
		<div
			class="group rounded-xl bg-white/90 p-8 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
		>
			<HandHelping class="text-primary mx-auto mb-4 h-10 w-10" />
			<h3 class="text-primary mb-3 text-xl font-bold">100% Free</h3>
			<p class="text-black">No paywalls. No tricks. Just pure, free learning for everyone.</p>
		</div>

		<!-- Feature 6 -->
		<div
			class="group rounded-xl bg-white/90 p-8 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
		>
			<Sparkles class="text-primary mx-auto mb-4 h-10 w-10" />
			<h3 class="text-primary mb-3 text-xl font-bold">Made for You</h3>
			<p class="text-black">Built by a student for students. It just understands your needs.</p>
		</div>
	</div>
</section>

<!-- TESTIMONIALS SECTION -->
<section class="bg-base-100 px-6 py-24 text-center">
	<h2 class="font-poetsen mb-16 text-3xl font-bold md:text-4xl">What Learners Are Saying</h2>

	<div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
		<!-- Testimonial 1 -->
		<div class="bg-base-200 rounded-xl p-6 shadow-md transition hover:shadow-xl">
			<div class="mb-4 flex justify-center">
				<img
					src="/site/users/avatar1.jpg"
					alt="User 1"
					class="h-16 w-16 rounded-full object-cover"
				/>
			</div>
			<p class="text-base text-gray-700 italic">
				“ColearnSpace helped me stay focused and learn web development faster. I loved the
				structured playlists.”
			</p>
			<p class="text-primary mt-4 font-bold">— Thato, 2nd Year CS Student</p>
		</div>

		<!-- Testimonial 2 -->
		<div class="bg-base-200 rounded-xl p-6 shadow-md transition hover:shadow-xl">
			<div class="mb-4 flex justify-center">
				<img
					src="/site/users/avatar2.jpg"
					alt="User 2"
					class="h-16 w-16 rounded-full object-cover"
				/>
			</div>
			<p class="text-base text-gray-700 italic">
				“I’ve always wanted to teach. ColearnSpace gave me a way to share my own curated courses
				with others.”
			</p>
			<p class="text-primary mt-4 font-bold">— Keletso, Final Year IT</p>
		</div>

		<!-- Testimonial 3 -->
		<div class="bg-base-200 rounded-xl p-6 shadow-md transition hover:shadow-xl">
			<div class="mb-4 flex justify-center">
				<img
					src="/site/users/avatar3.jpg"
					alt="User 3"
					class="h-16 w-16 rounded-full object-cover"
				/>
			</div>
			<p class="text-base text-gray-700 italic">
				“I used to get lost in random YouTube videos. Now I follow one clear path and track my
				progress.”
			</p>
			<p class="text-primary mt-4 font-bold">— Ayanda, Self-Taught Designer</p>
		</div>
	</div>
</section>

<!-- COURSE PREVIEW SECTION -->
<section class="bg-white px-6 py-24 text-center">
	<h2 class="font-poetsen mb-16 text-3xl font-bold md:text-4xl">Featured Courses</h2>

	<div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
		<!-- Course 1 -->
		<a
			href="/course/web-dev-basics"
			class="group block overflow-hidden rounded-xl shadow-md transition hover:shadow-xl"
		>
			<img
				src="https://img.youtube.com/vi/dD2EISBDjWM/hqdefault.jpg"
				alt="Web Dev Basics"
				class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<div class="bg-base-200 p-4 text-left">
				<p class="text-primary mb-1 text-sm font-semibold">Web Development</p>
				<h3 class="text-lg font-bold text-black group-hover:underline">
					HTML, CSS & JavaScript 101
				</h3>
				<p class="text-sm text-gray-600">by MusaTech</p>
			</div>
		</a>

		<!-- Course 2 -->
		<a
			href="/course/ui-design-fundamentals"
			class="group block overflow-hidden rounded-xl shadow-md transition hover:shadow-xl"
		>
			<img
				src="https://img.youtube.com/vi/3a4J2U8vHvg/hqdefault.jpg"
				alt="UI Design"
				class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<div class="bg-base-200 p-4 text-left">
				<p class="text-primary mb-1 text-sm font-semibold">UI/UX Design</p>
				<h3 class="text-lg font-bold text-black group-hover:underline">UI Design Fundamentals</h3>
				<p class="text-sm text-gray-600">by KeaLearn</p>
			</div>
		</a>

		<!-- Course 3 -->
		<a
			href="/course/python-data-basics"
			class="group block overflow-hidden rounded-xl shadow-md transition hover:shadow-xl"
		>
			<img
				src="https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg"
				alt="Python Basics"
				class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<div class="bg-base-200 p-4 text-left">
				<p class="text-primary mb-1 text-sm font-semibold">Programming</p>
				<h3 class="text-lg font-bold text-black group-hover:underline">
					Python from Beginner to Pro
				</h3>
				<p class="text-sm text-gray-600">by CodeBro</p>
			</div>
		</a>
	</div>

	<!-- CTA -->
	<div class="mt-12">
		<a
			href="/courses"
			class="btn btn-primary rounded-full px-8 py-3 text-lg font-semibold text-white"
		>
			Browse All Courses
		</a>
	</div>
</section>
