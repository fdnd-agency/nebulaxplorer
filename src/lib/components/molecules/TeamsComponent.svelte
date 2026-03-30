<script>
    let { teams } = $props();
    const startDate = new Date(teams.time_start);
    const endDate = new Date(teams.time_end);

    const month = ["januari","februari","maart","april","mei","juni","juli","augustus","september","october","november","december"];
    
</script>

<li>
    <img src={`https://fdnd-agency.directus.app/assets/${teams.group_photo}`} alt="">
    <h3>{month[startDate.getMonth()]} - {month[endDate.getMonth()]}</h3>
</li>

<style>

    h3{
        height: 2lh; /* give this h3 a height of 2 Line Heights :)*/
    }

     li{
        align-self: center;
        max-width: 300px;
        text-align: center;
        width: 100%;

        @media screen and (min-width: 500px){
            max-width: 450px;
        }
         
    }
    
    img{
        max-width: 100%;
    }
</style>