<script>
    import HamburgerButton from '$lib/components/atoms/HamburgerButton.svelte'
    import SearchBar from '$lib/components/molecules/SearchBar.svelte'
    import logo from '$lib/assets/images/logo.webp';
    import { page } from '$app/state';

    const navItems = [
        { href: '/', label: 'Home' },
		{ href: '/mission', label: 'Mission' },
		{ href: '/science', label: 'Science' },
		{ href: '/technology', label: 'Technology' },
		{ href: '/teams', label: 'Teams' },
		{ href: '/assignments', label: 'Assignments' },
		{ href: '/partners', label: 'Partners' }
    ]

</script>

<header>
    <a class="skip-to-content-link" href="#main">Skip to content</a>
    <nav>
        <HamburgerButton />

        <a href="https://www.sron.nl" class="image-link">
            <img src="{ logo }" alt="SRON logo" >
        </a>
        
        <ul>
            {#each navItems as navItem}
                <li><a class:active={ page.url.pathname === navItem.href } href="{ navItem.href }">{ navItem.label }</a></li>
            {/each}
            <SearchBar />
        </ul>
    </nav>
</header>

<style>
    .skip-to-content-link {
        position: absolute;
        left: 0;
        top: var(--spacing-sm);
        transform: translateX(-100%);
        background-color: var(--color-brand-darkest);
        transition: transform 0.3s ease-in-out;
        color: var(--color-accent-dark);
        box-shadow: solid var(--color-brand-darkest);
        padding: var(--spacing-lg);

        &:focus {
            transform: translateX(0%);
            filter: drop-shadow(0 0 0.75rem var(--color-brand-darkest));
        }
    }

    header {
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--spacing-lg);

            img {
                width: 15rem;
                height: auto;
                padding: var(--spacing-md);
            }

            ul {
                display: none;
                justify-items: flex-start;
                font-size: var(--font-size-body-md);
                gap: var(--spacing-xl);
                color: var(--color-neutral-lighter);
                font-family: var(--font-heading);
                margin-left: var(--spacing-2xl);

                a {
                    text-decoration: none;
                    display: inline-block;
                    @media (prefers-reduced-motion: no-preference){
                        transition: all 0.5s ease-in-out;
                    }
                    
                    &:hover{
                        color: var(--color-accent-dark);
                        @media (prefers-reduced-motion: no-preference){
                            transform: translateY(0.25rem);
                        }
                    }

                    &.active {
                        color: var(--color-accent-dark);
                    }
                }
            }
        }
    }

    @media (min-width: 1000px) {
        header {
            nav {
                justify-content: flex-start;

                .image-link {
                    display: none;
                }

                ul {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
</style>

