<script>
  import SatelliteNavigation from "$lib/components/organisms/SatelliteNavigation.svelte";
  let { data } = $props();
</script>

<svelte:head>
	<title>Technology - NebulaXPlorer</title>
</svelte:head>

<h1>Technology</h1>
<SatelliteNavigation  {data}/>