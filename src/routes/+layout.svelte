<script>
	import favicon from '$lib/assets/favicon.svg'
	import '$lib/styles/stylesheet.css'
	import '$lib/styles/fonts.css'
	import { pages } from '$lib/data/pages'
	import { Hero, Footer, Locations } from '$lib/components/organisms'
	import Header from '$lib/components/organisms/Header.svelte'
	
	let { children } = $props()

	import { onNavigate } from '$app/navigation'

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header {pages} />

<Hero {pages} />

<main id="main">
  {@render children()}
</main>

<Locations />
<Footer />
