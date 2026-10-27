<script>
	import AssignmentCard from "$lib/components/molecules/AssignmentCard.svelte";
	let { data } = $props()
	let vacancies = $derived(data.vacancies)
</script>

<svelte:head>
	<title>Assignments - NebulaXPlorer</title>
</svelte:head>

<h1>Assignments</h1>

{#each vacancies as vacancy}
	<AssignmentCard { vacancy }/>
{/each}


