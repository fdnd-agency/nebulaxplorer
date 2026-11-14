<script>
    import { NavigationLink } from '../atoms';
    import { page } from "$app/state";
    let { pages, layout = 'row', onclick } = $props()
</script>

<nav>
    <ul class={layout}>
        {#each pages as { href, label }}
            <li>
                <NavigationLink {href} {label} {onclick} active={page.url.pathname === href}/>
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
    .column{
        flex-direction: column;
        gap: var(--spacing-lg);
    }
</style>