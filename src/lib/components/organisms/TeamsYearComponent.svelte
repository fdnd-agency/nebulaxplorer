<!-- <script>
    // // TODO: actually implement this component
	import TeamsComponent from '$lib/components/organisms/TeamsComponent.svelte'
    let { year } = $props();
    // const startDate = new Date(teams.time_start);
    // const endDate = new Date(teams.time_end);

    // const month = ["januari","februari","maart","april","mei","juni","juli","augustus","september","october","november","december"];
    console.log("tem" + teams.start_date);
</script>


    <article>
			{#each year as teams(year.id)}
				<TeamsComponent teams={teams}/>
			{/each}
		</article> -->
