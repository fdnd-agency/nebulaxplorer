<script>
	import { Hero } from '$lib/components/organisms'
	import missionImage from '$lib/assets/images/hero-background-01.jpg'
	import { NewsCard } from '$lib/components/molecules'

	let { data } = $props()
	let { news } = $derived(data)
</script>

<svelte:head>
	<title>Home - NebulaXPlorer</title>
</svelte:head>

{#each news as newsItem}
	<NewsCard {newsItem} />
{/each}