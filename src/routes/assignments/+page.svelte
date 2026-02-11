<script>
	import { Hero } from '$lib'
	import { Breadcrumb } from '$lib'
	import AssignmentCards from '$lib/components/molecules/AssigmentCards/AssignmentCards.svelte'
	import Pagination from '$lib/components/molecules/Pagination/Pagination.svelte'

	// ! NOTE: important to include ?enhanced, otherwise no optimization takes place nor does it get rendered !
	import heroImg from '$lib/assets/images/grav-waves.jpg?enhanced&w=1920;1440;1024;768'
	import logo from '$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg'

	const { data } = $props()
	const { vacancies, pagination } = $derived(data)
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
	titleColor="var(--white)"
	pageTitle="Assignments"
	background={{ alt: 'Two merging black holes', file: heroImg }}
	sronIcon={logo} />

<Breadcrumb />

<AssignmentCards assignments={vacancies} />

<Pagination {pagination} />
