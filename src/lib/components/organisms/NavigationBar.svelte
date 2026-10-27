<script>
    import Navigation from "../molecules/Navigation.svelte";
    import HamburgerButton from "../atoms/HamburgerButton.svelte";
    import SearchBar from "../molecules/SearchBar.svelte";
    import logo from "$lib/assets/logos/sron-logo.webp"

    let scrollY = $state(0);
    let scrolled = $derived(scrollY > 10);
</script>

<!--https://www.youtube.com/watch?v=K3CM7j9GIxk-->
<svelte:window bind:scrollY />

<header class={{ scrolled }}>
    <HamburgerButton />
    <section>
        <Navigation />
        <SearchBar />
    </section>
    <img src="{ logo }" alt="SRON logo">
</header>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex; 
        align-items: center;
        gap: var(--spacing-xl);
        width: 100%;
        background-color: transparent;
        
        &::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            background-color: var(--color-brand-darkest);
            transform: scaleY(0);
            transform-origin: top;

            @media (prefers-reduced-motion: no-preference) {
                transition: transform 0.5s ease-in-out;
            }
        }

    &.scrolled::before {
        transform: scaleY(1);
    }
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