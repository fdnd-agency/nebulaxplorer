<script>
    import { NavigationLink } from '../atoms';
    import { page } from "$app/state";
    let { pages } = $props()
</script>

<nav>
    <ul>
        {#each pages as { href, label }}
            <li>
                <NavigationLink {href} {label} active={page.url.pathname === href}/>
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
            gap: var(--spacing-xl);
            color: var(--color-neutral-lighter);
        }
    }
</style>