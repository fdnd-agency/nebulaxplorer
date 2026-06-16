<script>
	import { Hero, Breadcrumb, UnderConstruction, simonnetEnhanced, setupScrollReveal } from '$lib'

	import { onMount } from 'svelte'

	onMount(() => {
		setupScrollReveal()
	})
</script>

<svelte:head>
	<title>Scientific</title>
	<meta
		name="description"
		content="The scientific page features advanced news and resources to inspire students and scientists alike on the latest discoveries and progress made on the Nebula Xplorer mission." />
</svelte:head>

<Hero
	titleColor="var(--text-color-light)"
	pageTitle="Scientific"
	background={{ file: simonnetEnhanced, alt: 'Rotating Black Holes Collide' }}
	attribution={{
		text: 'NASA',
		link: 'https://apod.nasa.gov/apod/ap250924.html',
	}} />

<Breadcrumb />

<UnderConstruction />
