<script>
	import {
		Hero,
		Breadcrumb,
		AssignmentCards,
		Pagination,
		blackholeHeroEnhanced as heroImg,
		sronAcademyLogoOnSpaceBlue as logo,
	} from '$lib'

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
