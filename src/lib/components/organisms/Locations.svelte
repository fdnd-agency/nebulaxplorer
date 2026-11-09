<script>  
    import LocationCard from '$lib/components/molecules/LocationCard.svelte';
    
    import leiden from '$lib/assets/images/SRON-Leiden.webp?enhanced&w=1600;800;400';  
    import groningen from '$lib/assets/images/SRON-Groningen.webp?enhanced&w=1600;800;400';  
</script>  

<ul>
    <LocationCard
        image={leiden}
        alt="sron building in leiden"
        city="Leiden"
        street="Niels Bohrweg 4"
        postalCode="2333 CA Leiden"
        phone="+31 (0)88 777 56 00"
    />

    <LocationCard
        image={groningen}
        alt="sron building in groningen"
        city="Groningen"
        street="Landleven 12"
        postalCode="9747 AD Groningen"
        phone="+31 (0)50 363 40 74"
    />
</ul>

<style> 
    ul {
        display: flex;
    }
</style>