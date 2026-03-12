<script>
    let { teams } = $props();
    const startDate = new Date(teams.time_start);
    const endDate = new Date(teams.time_end);

    const month = ["januari","februari","maart","april","mei","juni","juli","augustus","september","october","november","december"];
    
</script>

<section>
    <img src={`https://fdnd-agency.directus.app/assets/${teams.group_photo}`} alt="" height="300">
    <h3>{month[startDate.getMonth()]} - {month[endDate.getMonth()]}</h3>
</section>

