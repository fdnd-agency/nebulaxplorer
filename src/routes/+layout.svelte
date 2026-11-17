<script>
	import favicon from '$lib/assets/favicon.svg'
	import '$lib/styles/stylesheet.css'
	import '$lib/styles/fonts.css'
	import { pages } from '$lib/data/pages'
	import { Hero, Footer, Locations } from '$lib/components/organisms'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Hero {pages} />

<main>
	{@render children()}
</main>

<Locations />
<Footer />
