<script>
    import Navigation from "../molecules/Navigation.svelte";
    import HamburgerButton from "../atoms/HamburgerButton.svelte";
    import HamburgerMenu from "../molecules/HamburgerMenu.svelte"; 
    import SearchBar from "../molecules/SearchBar.svelte";
    import logo from "$lib/assets/logos/sron-logo.webp"
</script>

<header>
    <HamburgerButton />
    <Navigation />
    <SearchBar />
    <img src="{ logo }" alt="SRON logo">
</header>

<style>
    header{
        display: flex;
    }
</style>