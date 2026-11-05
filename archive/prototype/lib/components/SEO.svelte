<script>
	import { page } from '$app/state';
	import { derived } from 'svelte/store';

	let {
		title,
		desc,
		img = 'https://colearnspace.netlify.app/site/branding/ColearnSpace-icon2.png',
		langs = ['en-ZA', 'en-US']
	} = $props();

	const iso15924to31661 = (lang) => {
		if (lang === 'zh_hans') return 'zh-cn';
		if (lang === 'zh_hant') return 'zh-tw';
		return lang;
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={img} />
	<meta name="twitter:image:alt" content={title} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:image" content={img} />

	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
	<link rel="canonical" href={page.url.pathname} />

	{#each langs as lang}
		<link
			rel="alternate"
			hreflang={iso15924to31661(lang)}
			href={`https://colearnspace.netlify.app${page.url.pathname}?lang=${lang}`}
		/>
	{/each}
</svelte:head>
