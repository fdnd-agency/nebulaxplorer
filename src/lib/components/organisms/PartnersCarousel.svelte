<script>
	import { CarouselTrack } from '$lib'

	const sponsorsEducational = [
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/hogeschool-utrecht-logo.png',
				alt: 'Hogeschool Utrecht',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/hogeschool-van-amsterdam-logo.png',
				alt: 'Hogeschool van Amsterdam',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/inholland-university-logo.png',
				alt: 'Inholland University',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/lis-logo.jpeg',
				alt: 'Leidse Instrumentmakers School',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/erasmus-universiteit-rotterdam-logo.png',
				alt: 'Erasmus Universiteit Rotterdam',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/mbo-rijnland-logo.png',
				alt: 'Mbo Rijnland',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/overdehaagse-logo.png',
				alt: 'De Haagse Hogeschool',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/roc-mondriaan-logo.png',
				alt: 'ROC Mondriaan',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/roc-nova-logo.png',
				alt: 'ROC Nova',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/rugr-logo.gif',
				alt: 'Rijksuniversiteit Groningen',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/saxion-logo.jpg',
				alt: 'Saxion',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/techniek-college-rotterdam-logo.png',
				alt: 'Techniek College Rotterdam',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/tu-delft-logo.png',
				alt: 'TU Delft',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/ul-logo.jpg',
				alt: 'Universiteit Leiden',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/uva-logo.webp',
				alt: 'Universiteit van Amsterdam',
			},
		},
	]

	const sponsorsIndustrial = [
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/astos-logo.jpg',
				alt: 'Astos',
			},
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/esatan-logo.png',
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
