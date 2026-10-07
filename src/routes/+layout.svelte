<script>
	import '@fontsource/space-grotesk/500.css';
   	import '@fontsource/space-grotesk/700.css';
   	import '@fontsource/space-mono/400.css';
   	import '@fontsource/space-mono/700.css';
   	import '@fontsource/roboto/400.css';
   	import '@fontsource/roboto/700.css';

	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/stylesheet.css';

  	import Footer from '$lib/components/organisms/Footer.svelte';
	import Nav from '$lib/components/organisms/NavigationBar.svelte'
  	import Locations from '$lib/components/organisms/Locations.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

<main id="main">
	{@render children()}
</main>

<Locations />
<Footer />