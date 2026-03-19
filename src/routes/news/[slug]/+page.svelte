<script>
	import { Breadcrumb, Hero } from '$lib'

	let { data } = $props()
	console.log(data)
</script>

<svelte:head>
	<title>News</title>
	<meta
		name="description"
		content="The news page features news and resources to inspire the general public and inform the media on the latest discoveries and progress made on the Nebula Xplorer mission." />
</svelte:head>

<Hero pageTitle="" />

<Breadcrumb />

<section>
	<h2>{data.newsItem[0].title}</h2>
	<p>{data.newsItem[0].type}</p>
	<p>{data.newsItem[0].date}</p>
	<img
		src={`https://fdnd-agency.directus.com/assets/${data.newsItem[0].image}`} />
</section>
