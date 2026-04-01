<script>
	import { Breadcrumb, Hero } from '$lib'
	let { data } = $props()
</script>

<Hero pageTitle="Assignment" />

<Breadcrumb />

{#if data.assignment.length > 0}
	<h2>{data.assignment.title}</h2>
	<p>{data.assignment.location}</p>
	<p>{data.assignment.organisation}</p>

	<p>{data.assignment.summary}</p>
	<p>{data.assignment.description}</p>
{:else}
	<p>Assignment not found.</p>
{/if}
