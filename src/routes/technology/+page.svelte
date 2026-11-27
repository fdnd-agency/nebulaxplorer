<script>
	import { SatelliteExplorer } from '$lib/components/organisms'

	let { data } = $props()
</script>

<svelte:head>
	<title>Technology - NebulaXPlorer</title>
	<meta
		name="description"
		content="Explore the NEBULA Xplorer satellite in 3D: its components, the X-ray instrument inside it and how its X-ray optics work."
	/>
</svelte:head>

<SatelliteExplorer content={data.explorerContent} />
