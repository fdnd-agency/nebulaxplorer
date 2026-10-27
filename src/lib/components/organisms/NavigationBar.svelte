<script>
    import Navigation from "../molecules/Navigation.svelte";
    import HamburgerButton from "../atoms/HamburgerButton.svelte";
    import SearchBar from "../molecules/SearchBar.svelte";
    import logo from "$lib/assets/logos/sron-logo.webp"
</script>

<header>
    <HamburgerButton />
    <section>
        <Navigation />
        <SearchBar />
    </section>
    <img src="{ logo }" alt="SRON logo">
</header>

<style>
    header {
        position: sticky;
        top: 0;
        left: 0;
        display: flex; 
        align-items: center;
        gap: var(--spacing-xl);
        width: 100%;
        background-color: var(--color-brand-darkest);          
    }
    section{
        display: flex;
        gap: var(--spacing-xl);
        align-items: center;
    }
    img{
        display: block;
        padding: var(--spacing-sm);
        height: 4rem;
        width: auto;
        margin-left: auto;
    }
</style>