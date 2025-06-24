<script>
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	let { title, desc, img, langs = ['en'] } = $props();
	img = 'https://colearnspace.netlify.app/site/branding/ColearnSpace-icon2.png';

	const siteTitle = 'ColearnSpace';

	const formattedTitle = derived([page], ([$page]) => {
		if (true) {
			return title ? `${title} — ${siteTitle}` : siteTitle;
		}
		return title || siteTitle;
	});

	const iso15924to31661 = (lang) => {
		if (lang === 'zh_hans') return 'zh-cn';
		if (lang === 'zh_hant') return 'zh-tw';
		return lang;
	};

	const getCanonicalUrl = (pathname) => {
		const compareRegex = /^\/compare\/(.+)-vs-(.+)\/?$/;
		const match = pathname.match(compareRegex);
		if (match) {
			const [, first, second] = match;
			const [smaller, larger] = [first, second].sort();
			return `https://colearnspace.netlify.app/compare/${smaller}-vs-${larger}/`;
		}
		return `https://colearnspace.netlify.app${pathname}`;
	};
</script>

<svelte:head>
	<title>{$formattedTitle}</title>
	<meta name="description" content={desc} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$formattedTitle} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={img} />
	<meta name="twitter:image:alt" content={$formattedTitle} />

	<meta property="og:title" content={$formattedTitle} />
	<meta property="og:description" content={desc} />
	<meta property="og:image" content={img} />

	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
	<link rel="canonical" href={getCanonicalUrl($page.url.pathname)} />

	{#each langs as lang}
		<link
			rel="alternate"
			hreflang={iso15924to31661(lang)}
			href={`https://colearnspace.netlify.app${$page.url.pathname}?lang=${lang}`}
		/>
	{/each}
</svelte:head>
