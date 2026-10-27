<script>
	import AssignmentGrid from "$lib/components/organisms/AssignmentGrid.svelte";

	let { data } = $props()
	let assignments = $derived(data.assignments)
</script>

<svelte:head>
	<title>Assignments - NebulaXPlorer</title>
</svelte:head>

<h1>Assignments</h1>

<h2>Find a suitable assignment</h2>
<p>Within the NEBULA-Xplorer project there a 6 assignments available.</p>

<AssignmentGrid { assignments } />



