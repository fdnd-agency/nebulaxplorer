<script>
	import {
		CarouselTrack,
		logoAirborne,
		logoAirbus,
		logoCelestiaSts,
		logoCosine,
		logoDawnAerospace,
		logoErasmusUniversiteitRotterdam,
		logoFsoInstruments,
		logoHogeschoolUtrecht,
		logoHogeschoolVanAmsterdam,
		logoInhollandUniversity,
		logoIsispace,
		logoLis,
		logoMboRijnland,
		logoNlr,
		logoOverdehaagse,
		logoRevolv,
		logoRocMondriaan,
		logoRocNova,
		logoRugr,
		logoSaxion,
		logoSpherical,
		logoStarion,
		logoTechniekCollegeRotterdam,
		logoTuDelft,
		logoUl,
		logoUva,
		logoWestEnd,
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
				src: logoAirborne,
				alt: 'Airborne',
			},
		},
		{
			link: '#',
			image: {
				src: logoAirbus,
				alt: 'Airbus',
			},
		},
		{
			link: '#',
			image: {
				src: logoCelestiaSts,
				alt: 'Celestia STS',
			},
		},
		{
			link: '#',
			image: {
				src: logoCosine,
				alt: 'Cosine',
			},
		},
		{
			link: '#',
			image: {
				src: logoDawnAerospace,
				alt: 'Dawn Aerospace',
			},
		},
		{
			link: '#',
			image: {
				src: logoFsoInstruments,
				alt: 'FSO Instruments',
			},
		},
		{
			link: '#',
			image: {
				src: logoIsispace,
				alt: 'ISIspace',
			},
		},
		{
			link: '#',
			image: {
				src: logoNlr,
				alt: 'NLR',
			},
		},
		{
			link: '#',
			image: {
				src: logoRevolv,
				alt: 'Revolv',
			},
		},
		{
			link: '#',
			image: {
				src: logoSpherical,
				alt: 'Spherical',
			},
		},
		{
			link: '#',
			image: {
				src: logoStarion,
				alt: 'Starion',
			},
		},
		{
			link: '#',
			image: {
				src: logoWestEnd,
				alt: 'West End',
			},
		},
	]
</script>

<section>
	<h3 class="subheading">Educational Partners</h3>
	<CarouselTrack items={sponsorsEducational} />

	<h3 class="subheading">Industrial Partners</h3>
	<CarouselTrack items={sponsorsIndustrial} reverse />
</section>

<style>
	section {
		margin-block-end: var(--spacing-section);
		overflow: hidden;
	}

	h3 {
		width: 100%;
		max-width: var(--content-width);
		margin-inline: auto;
		margin-block: 0;
	}
</style>
