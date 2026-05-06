<script>
	/* eslint-disable svelte/require-each-key */
	import TeamsComponent from '$lib/components/molecules/TeamsComponent.svelte'

	let { year } = $props()
</script>

<article>
	<h3>{year[0]}</h3>
	<ul>
		{#each year[1] as teams}
			<TeamsComponent {teams} />
		{/each}
	</ul>
</article>

<style>
	h3 {
		font-size: 1.5rem;
		margin: 1rem;
	}

	article {
		display: flex;
		flex-direction: column;
	}

	ul {
		 list-style: none;

		display: grid;
		grid-template-columns: 1fr;
		
		align-items: center;
		
		gap: 1em;

		@media (min-width: 450px){
		grid-template-columns: 1fr 1fr;

		}
	}
</style>
