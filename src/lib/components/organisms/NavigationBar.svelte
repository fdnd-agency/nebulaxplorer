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
    <nav>
        <HamburgerButton />

        <a href="https://www.sron.nl">
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

                a {
                    text-decoration: none;

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

                img {
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

