<script>
	import '@fontsource/space-grotesk/500.css';
   	import '@fontsource/space-grotesk/700.css';
   	import '@fontsource/space-mono/400.css';
   	import '@fontsource/space-mono/700.css';
   	import '@fontsource/roboto/400.css';
   	import '@fontsource/roboto/700.css';

	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/stylesheet.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
