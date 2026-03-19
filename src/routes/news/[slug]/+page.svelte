<script>
	import { Breadcrumb, Hero } from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>News</title>
	<meta name="description" content="News" />
</svelte:head>

<Hero pageTitle="" />

<Breadcrumb />

<section>
	<h2>{data.newsItem[0].title}</h2>
	<p>{data.newsItem[0].type}</p>
	<p>{data.newsItem[0].date}</p>
	<img
		src={`https://fdnd-agency.directus.app/assets/${data.newsItem[0].image}`}
		width="500" />
</section>
