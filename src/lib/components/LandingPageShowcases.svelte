<script>
	import { HeartIcon, MessageCircle } from '@lucide/svelte';
</script>

<!--Featured Challenges-->
<section class="bg-primary px-6 py-10 text-center">
	<h2 class="font-poetsen mb-16 text-3xl font-bold md:text-4xl">Showcase Your Work</h2>

	<div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
		<!-- Course 1 -->
		<div class="group block overflow-hidden rounded-xl shadow-md transition hover:shadow-xl">
			<img
				src="https://img.youtube.com/vi/dD2EISBDjWM/hqdefault.jpg"
				alt="Web Dev Basics"
				class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<div class="bg-base-200 p-4 text-left">
				<p class="text-primary mb-1 text-sm font-semibold">Web Development</p>
				<h3 class="text-lg font-bold group-hover:underline">DevSpace</h3>
				<span class="mt-2 flex items-center gap-2 text-xs">
					<button class="btn bg-base-100"><HeartIcon /> 15</button>
					<button class="btn bg-base-100"><MessageCircle /> 7</button>
				</span>
			</div>
		</div>

		<!-- Course 2 -->
		<div class="group block overflow-hidden rounded-xl shadow-md transition hover:shadow-xl">
			<img
				src="https://img.youtube.com/vi/3a4J2U8vHvg/hqdefault.jpg"
				alt="UI Design"
				class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<div class="bg-base-200 p-4 text-left">
				<p class="text-primary mb-1 text-sm font-semibold">UI/UX Design</p>
				<h3 class="text-lg font-bold group-hover:underline">FireMan</h3>
				<span class="mt-2 flex items-center gap-2 text-xs">
					<button class="btn bg-base-100"><HeartIcon /> 34</button>
					<button class="btn bg-base-100"><MessageCircle /> 47</button>
				</span>
			</div>
		</div>

		<!-- Course 3 -->
		<div class="group block overflow-hidden rounded-xl shadow-md transition hover:shadow-xl">
			<img
				src="https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg"
				alt="Python Basics"
				class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<div class="bg-base-200 p-4 text-left">
				<p class="text-primary mb-1 text-sm font-semibold">Programming</p>
				<h3 class="text-lg font-bold group-hover:underline">Chatbot based on FOL</h3>
				<span class="mt-2 flex items-center gap-2 text-xs">
					<button class="btn bg-base-100"><HeartIcon /> 10</button>
					<button class="btn bg-base-100"><MessageCircle /> 2</button>
				</span>
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="mt-12">
		<a
			href="/portal/projects/showcase"
			class="btn btn-outline rounded-full px-8 py-3 text-lg font-semibold text-white"
		>
			Browse All Showcases
		</a>
	</div>
</section>
