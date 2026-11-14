<script>
	import '@fontsource/space-grotesk/500.css'
	import '@fontsource/space-grotesk/700.css'
	import '@fontsource/space-mono/400.css'
	import '@fontsource/space-mono/700.css'
	import '@fontsource/roboto/400.css'
	import '@fontsource/roboto/500.css'
	import '@fontsource/roboto/700.css'

	import favicon from '$lib/assets/favicon.svg'
	import '$lib/styles/stylesheet.css'

	import { pages } from '$lib/data/pages'
	import Hero from '$lib/components/organisms/Hero.svelte'
	import Footer from '$lib/components/organisms/Footer.svelte'
	import Locations from '$lib/components/organisms/Locations.svelte'
	import Image from '$lib/components/atoms/Image.svelte'

	import foto from '$lib/assets/images/x-ray-reverberation.jpg?enhanced'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Hero {pages} />

<Image
    src={foto}
    alt=""
    credit="gjhdsjkfh"
    loading="lazy"
    sizes="(min-width: 48rem) 50vw, 100vw"
    ratio="wide"
/>

<main>
	{@render children()}
</main>

<Locations />
<Footer />
