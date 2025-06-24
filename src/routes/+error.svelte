<script>
	import Seo from '$lib/components/SEO.svelte';
</script>

<Seo title="404 | ColearnSpace" desc="404 | Page could not be found" />

<div class="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-gray-800">
	<div class="flex min-h-screen items-center justify-center px-2">
		<div class="text-center">
			<h1 class="text-9xl font-bold">404</h1>
			<p class="mt-4 text-2xl font-medium">Oops! Page not found</p>
			<p class="mt-4 mb-8">The page you're looking for doesn't exist or has been moved.</p>
			<a
				href="/portal"
				class="btn btn-primary rounded-full bg-white px-6 py-3 font-bold transition duration-300 ease-in-out hover:bg-purple-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
			>
				Go Back Home
			</a>
		</div>
	</div>
</div>
