<script>
    import { resolve } from '$app/paths';
    let { teams } = $props();
    const startDate = new Date(teams.time_start);
    const endDate = new Date(teams.time_end);

    const month = ["januari","februari","maart","april","mei","juni","juli","augustus","september","october","november","december"];
    
</script>

<li>
    <img src={`https://fdnd-agency.directus.app/assets/${teams.group_photo}`} alt="">
    <a href={resolve("/team/" + teams.id)}><h3>{month[startDate.getMonth()]} - {month[endDate.getMonth()]}</h3></a>
</li>

<style>

    

     li{
        position: relative;
        align-self: center;
        max-width: 300px;
        text-align: center;
        width: 100%;

        @media screen and (min-width: 500px){
            max-width: 450px;
        }
         
    }

    li :hover, li :focus-within{
        text-decoration: underline;
    }

    li :focus-within {
        
        outline: 0.125rem dashed var(--cleanroom-140);
    }

    a::after {
		content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    h3{
        height: 2lh; /* give this h3 a height of 2 Line Heights :)*/
    }


    
    img{
        max-width: 100%;
    }
</style>