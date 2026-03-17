<script>

	import TeamsComponent from '$lib/components/organisms/TeamsComponent.svelte'
    let { teams } = $props();
    // const startDate = new Date(teams.time_start);
    // const endDate = new Date(teams.time_end);

    // const month = ["januari","februari","maart","april","mei","juni","juli","augustus","september","october","november","december"];
    console.log("tem" + teams.start_date);
</script>

<ul>
    {#each teams as team(team.id)}
        <li>
            <p>team {team.id}</p>
	    	<TeamsComponent teams={team}/>
        </li>
	{/each}
</ul>