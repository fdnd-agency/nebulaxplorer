<script>
	import {
		CarouselTrack,
		logoHogeschoolUtrecht,
		logoHogeschoolVanAmsterdam,
		logoInhollandUniversity,
		logoLis,
		logoErasmusUniversiteitRotterdam,
		logoMboRijnland,
		logoOverdehaagse,
		logoRocMondriaan,
		logoRocNova,
		logoRugr,
		logoSaxion,
		logoTechniekCollegeRotterdam,
		logoTuDelft,
		logoUl,
		logoUva,
		logoAstos,
		logoEsatan,
	} from '$lib'

	const sponsorsEducational = [
		{
			link: '#',
			image: {
				src: logoHogeschoolUtrecht,
				alt: 'Hogeschool Utrecht',
			},
		},
		{
			link: '#',
			image: {
				src: logoHogeschoolVanAmsterdam,
				alt: 'Hogeschool van Amsterdam',
			},
		},
		{
			link: '#',
			image: {
				src: logoInhollandUniversity,
				alt: 'Inholland University',
			},
		},
		{
			link: '#',
			image: {
				src: logoLis,
				alt: 'Leidse Instrumentmakers School',
			},
		},
		{
			link: '#',
			image: {
				src: logoErasmusUniversiteitRotterdam,
				alt: 'Erasmus Universiteit Rotterdam',
			},
		},
		{
			link: '#',
			image: {
				src: logoMboRijnland,
				alt: 'Mbo Rijnland',
			},
		},
		{
			link: '#',
			image: {
				src: logoOverdehaagse,
				alt: 'De Haagse Hogeschool',
			},
		},
		{
			link: '#',
			image: {
				src: logoRocMondriaan,
				alt: 'ROC Mondriaan',
			},
		},
		{
			link: '#',
			image: {
				src: logoRocNova,
				alt: 'ROC Nova',
			},
		},
		{
			link: '#',
			image: {
				src: logoRugr,
				alt: 'Rijksuniversiteit Groningen',
			},
		},
		{
			link: '#',
			image: {
				src: logoSaxion,
				alt: 'Saxion',
			},
		},
		{
			link: '#',
			image: {
				src: logoTechniekCollegeRotterdam,
				alt: 'Techniek College Rotterdam',
			},
		},
		{
			link: '#',
			image: {
				src: logoTuDelft,
				alt: 'TU Delft',
			},
		},
		{
			link: '#',
			image: {
				src: logoUl,
				alt: 'Universiteit Leiden',
			},
		},
		{
			link: '#',
			image: {
				src: logoUva,
				alt: 'Universiteit van Amsterdam',
			},
		},
	]

	const sponsorsIndustrial = [
		{
			link: '#',
			image: {
				src: logoAstos,
				alt: 'Astos',
			},
		},
		{
			link: '#',
			image: {
				src: logoEsatan,
				alt: 'Esatan',
			},
		},
	]
</script>

<section>
	<h3 class="subheading content-container">Educational Partners</h3>
	<CarouselTrack items={sponsorsEducational} />

	<h3 class="subheading content-container">Industrial Partners</h3>
	<CarouselTrack items={sponsorsIndustrial} reverse />
</section>

<style>
	section {
		margin-block-end: 3rem;
	}
</style>
