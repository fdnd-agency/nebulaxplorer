<script>
    import NavigationLink from "../atoms/NavigationLink.svelte";
    import { page } from "$app/state";

    const navItems = [
        { href: '/', text: 'Home' },
        { href: '/mission', text: 'Mission' },
        { href: '/science', text: 'Science' },
        { href: '/technology', text: 'Technology' },
        { href: '/teams', text: 'Teams' },
        { href: '/assignments', text: 'Assignments' },
        { href: '/partners', text: 'Partners' }
    ]

</script>

<nav>
    <ul>
        {#each navItems as navItem}
            <li>
                <NavigationLink href={navItem.href} text={navItem.text} active={page.url.pathname === navItem.href}/>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);

        ul {
            display: flex;
            font-size: var(--font-size-body-md);
            gap: var(--spacing-xl);
            color: var(--color-neutral-lighter);
            font-family: var(--font-heading);
            margin-left: var(--spacing-2xl);
        }
    }
</style>