<script>
	import AssignmentGrid from "$lib/components/organisms/AssignmentGrid.svelte";

	let { data } = $props()
	let assignments = $derived(data.assignments)
</script>

<svelte:head>
	<title>Assignments - NebulaXPlorer</title>
</svelte:head>


<main>
	<h1>Assignments</h1>

	<h2>Find a <span>suitable</span> assignment</h2>
	<p>Within the NEBULA-Xplorer project there a <span>{ assignments.length }</span> assignments available.</p>

	<AssignmentGrid { assignments } />
</main>


<style>
	main{
		margin: 0 var(--spacing-xl);
	}
	span{
		color: var(--color-accent-mid);
	}
</style>
