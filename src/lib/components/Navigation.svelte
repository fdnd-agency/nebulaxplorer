<script>
    const navigationItems = ["Home", "Research Questions", "pillars", "missions", "Contact"]
    import searchIcon from "$lib/assets/icons/searchIcon.svg"
</script>

<nav>
    <ul>
        {#each navigationItems as navigationItem}
            <li><a href="/">{navigationItem}</a></li>
        {/each}
    </ul>
</nav>

<style>
@media (min-width: 1000px) {
    ul{
        display: flex;
        gap: 2rem;
    }
    a{
        text-decoration: none;
    }
}
</style>