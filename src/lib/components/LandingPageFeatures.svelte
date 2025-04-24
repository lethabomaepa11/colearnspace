<script>
	import { BookOpen, Users, Youtube, Sprout, HandHelping, Sparkles } from '@lucide/svelte';
</script>

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
