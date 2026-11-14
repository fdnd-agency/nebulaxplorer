<script>
	import '@fontsource/space-grotesk/500.css'
	import '@fontsource/space-grotesk/700.css'
	import '@fontsource/space-mono/400.css'
	import '@fontsource/space-mono/700.css'
	import '@fontsource/roboto/400.css'
	import '@fontsource/roboto/500.css'
	import '@fontsource/roboto/700.css'

	import favicon from '$lib/assets/favicon.svg'
	import '$lib/styles/stylesheet.css'

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
