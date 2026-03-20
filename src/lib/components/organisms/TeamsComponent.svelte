<script>
    let { teams } = $props();
    const startDate = new Date(teams.time_start);
    const endDate = new Date(teams.time_end);

    const month = ["januari","februari","maart","april","mei","juni","juli","augustus","september","october","november","december"];
    
</script>

<li>
    <img src={`https://fdnd-agency.directus.app/assets/${teams.group_photo}`} alt="" height="300">
    <h3>{month[startDate.getMonth()]} - {month[endDate.getMonth()]}</h3>
</li>

<style>

    li{
        display: flex;
        aspect-ratio: 1/1;
        flex-direction: column;
  align-items: center;
  justify-content: center;
    }

    img{
        max-width: 100%;
        max-height: 100%;
    }
</style>