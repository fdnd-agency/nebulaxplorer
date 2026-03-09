<script>
	const sponsors = [
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/astos.jpg',
				alt: 'a guy holding a thing',
			},
			title: 'technology',
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/astos.jpg',
				alt: 'a scientist sciencing',
			},
			title: 'science',
		},

		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/astos.jpg',
				alt: 'a guy holding a thing',
			},
			title: 'instrumentation',
		},
		{
			link: '#',
			image: {
				src: 'src/lib/assets/images/sponsors/astos.jpg',
				alt: 'a guy holding a thing',
			},
			title: 'placeholder',
		},
		{
			link: '#',
			image: {
				src: '/src/lib/assets/images/sponsors/astos.jpg',
				alt: 'a guy holding a thing',
			},
			title: 'lorem ipsum',
		},
	]
</script>

<h2>Educational Partners</h2>
<ul>
	{#each sponsors as sponsor}
		<li><img src={sponsor.image.src} alt={sponsor.image.alt} /></li>
	{/each}
</ul>

<h2>Industrial Partners</h2>
<ul><li></li></ul>

<style>
</style>
