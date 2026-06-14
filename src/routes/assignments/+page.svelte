<script>
	import {
		Hero,
		Breadcrumb,
		AssignmentCards,
		Pagination,
		nasaGarciaEnhanced,
	} from '$lib'

	const { data } = $props()
	const { vacancies, pagination } = $derived(data)

	import { onMount } from 'svelte'
	import { setupScrollReveal } from '$lib/utils/scrollReveal'

	onMount(() => {
		setupScrollReveal()
})
</script>

<svelte:head>
	<title>Assignments</title>
	<meta
		name="description"
		content="Explore exciting opportunities to join the Nebula Xplorer Mission." />
</svelte:head>

<!-- Always provide alt and file path WITHIN background -->
<!-- titleColor controls the title color based on the provided css var provided -->

<Hero
	titleColor="var(--text-color-light)"
	background={{
		file: nasaGarciaEnhanced,
		alt: 'IXPE Explores a Black Hole Jet',
	}}
	attribution={{
		text: 'NASA',
		link: 'https://apod.nasa.gov/apod/ap250509.html',
	}}
	pageTitle="Assignments" />

<Breadcrumb />

<AssignmentCards assignments={vacancies} />

<Pagination {pagination} />
