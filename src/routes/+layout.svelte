<script>
	import favicon from '$lib/assets/favicon.svg'
	import '$lib/styles/stylesheet.css'
	import '$lib/styles/fonts.css'

	import { pages } from '$lib/data/pages'
	import Hero from '$lib/components/organisms/Hero.svelte'
	import Footer from '$lib/components/organisms/Footer.svelte'
	import Locations from '$lib/components/organisms/Locations.svelte'

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
