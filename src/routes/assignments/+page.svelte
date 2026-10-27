<script>
	import AssignmentGrid from "$lib/components/organisms/AssignmentGrid.svelte";

	let { data } = $props()
	let assignments = $derived(data.assignments)
</script>

<svelte:head>
	<title>Assignments - NebulaXPlorer</title>
</svelte:head>

<h1>Assignments</h1>

<h2>Find a <span>suitable</span> assignment</h2>
<p>Within the NEBULA-Xplorer project there a <span>{ assignments.length }</span> assignments available.</p>

<AssignmentGrid { assignments } />

<style>
	span{
		color: var(--color-accent-mid);
	}
</style>
