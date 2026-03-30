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
		padding-block: 1em;
	}

	article {
		display: flex;
		flex-direction: column;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;

		@media (min-width: 450px) {
			gap: 5vw;
			flex-direction: row;
		}
	}
</style>
