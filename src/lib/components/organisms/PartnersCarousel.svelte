<script>
	const sponsors = [
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
</script>

<section>
	<h3 class="subheading">Educational Partners</h3>
	<ul>
		{#each sponsors as sponsor}
			<li><img src={sponsor.image.src} alt={sponsor.image.alt} /></li>
		{/each}
	</ul>

	<h3 class="subheading">Industrial Partners</h3>
	<ul class="reverse">
		{#each sponsors as sponsor}
			<li><img src={sponsor.image.src} alt={sponsor.image.alt} /></li>
		{/each}
	</ul>
</section>

<style>
	section {
	}

	/* Shamelessly yoinked from https://frontendmasters.com/blog/infinite-marquee-animation-using-modern-css/ */
	ul {
		--size: 250px; /* size of the images */
		--duration: 60s; /* animation duration */
		--number: 4; /* number of visible images */

		display: flex;
		flex-direction: row;
		overflow: hidden;
		list-style: none;
		height: 10rem;
		background-color: white;
		margin-inline: -1.5rem;
		margin-block: 1.5rem;

		&:hover li {
			animation-play-state: paused;
		}
	}

	img {
		max-height: 100%;
		width: 250px;
	}

	li {
		--duration: calc(sibling-count() * 6s);
		--number: min(sibling-count(), 4);

		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: white;
		width: var(--size);
		offset: shape(
			from calc(var(--size) / -2) 50%,
			hline by
				calc(sibling-count() * max(100% / var(--number), var(--size)))
		);
		animation: carousel var(--duration) linear infinite
			calc(-1 * sibling-index() * var(--duration) / sibling-count());
	}

	@keyframes carousel {
		to {
			offset-distance: 100%;
		}
	}

	.reverse li {
		animation-direction: reverse;
	}
</style>
