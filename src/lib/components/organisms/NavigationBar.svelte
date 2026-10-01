<script>
    import HamburgerButton from '$lib/components/atoms/HamburgerButton.svelte'
    import logo from '$lib/assets/images/logo.svg';
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
        <a href="https://www.sron.nl">
            <img src="{ logo }" alt="SRON logo">
        </a>
        <ul>
            {#each navItems as navItem}
                <li><a class:active={ page.url.pathname === navItem.href } href="{ navItem.href }">{ navItem.label }</a></li>
            {/each}
        </ul>
        <HamburgerButton />
    </nav>
</header>


<style>
  
</style>