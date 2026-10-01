<script>
    let { expanded } = $props()

    import HamburgerButton from '$lib/components/atoms/HamburgerButton.svelte'
    import logo from '$lib/assets/images/logo.webp';

    const externalNavItems = [
        { href: 'https://www.sron.nl/actueel/', label: 'Actueel' },
		{ href: 'https://www.sron.nl/contact/', label: 'Contact' },
		{ href: 'https://www.sron.nl/sron-academy/', label: 'SRON Academy' },
		{ href: 'https://werkenbijsron.nl/', label: 'Werken bij' },
		{ href: 'https://www.sron.nl/bezoek-aan-sron/', label: 'Bezoek aan SRON' },
    ]

    const mainPages = [
	    { href: '/main-page-1', label: 'Main page 1' },
	    { href: '/main-page-2', label: 'Main page 2' },
	    { href: '/main-page-3', label: 'Main page 3' },
        { href: '/main-page-4', label: 'Main page 4' }
    ];

    const mainPage1 = [
        { href: '/main-page-1/sub-page-1', label: 'Sub page 1' },
        { href: '/main-page-1/sub-page-2', label: 'Sub page 2' },
        { href: '/main-page-1/sub-page-3', label: 'Sub page 3' },
        { href: '/main-page-1/sub-page-4', label: 'Sub page 4' },
        { href: '/main-page-1/sub-page-5', label: 'Sub page 5' },
        { href: '/main-page-1/sub-page-6', label: 'Sub page 6' }
    ];

    const mainPage2 = [
        { href: '/main-page-2/sub-page-1', label: 'Sub page 1' },
        { href: '/main-page-2/sub-page-2', label: 'Sub page 2' },
        { href: '/main-page-2/sub-page-3', label: 'Sub page 3' },
        { href: '/main-page-2/sub-page-4', label: 'Sub page 4' },
        { href: '/main-page-2/sub-page-5', label: 'Sub page 5' }
    ];

    const mainPage3 = [
        { href: '/main-page-3/sub-page-1', label: 'Sub page 1' },
        { href: '/main-page-3/sub-page-2', label: 'Sub page 2' },
        { href: '/main-page-3/sub-page-3', label: 'Sub page 3' }
    ];

    const mainPage4 = [
        { href: '/main-page-4/sub-page-1', label: 'Sub page 1' },
        { href: '/main-page-4/sub-page-2', label: 'Sub page 2' }
    ];
</script>

<section class="hamburger-menu">
    <section>
        <nav class="main-page-nav">
            <ul>
                {#each mainPages as mainPage}
                    <li>
                        <a href={ mainPage.href }>{ mainPage.label }</a>
                        <ul class="subpagina-lijst">
                            {#each mainPage1 as subPage}
                                <li><a href={subPage.href}>{ subPage.label}</a></li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </nav>
    </section>
    <section>
        <nav>
            <ul>
                {#each externalNavItems as externalNavItem}
                    <li><a href={ externalNavItem.href }>{ externalNavItem.label }</a></li>
                {/each}
            </ul>
        </nav>
    </section>
</section>

<style>
    .hamburger-menu{
        background-color: var(--color-brand-darkest);
        position: absolute;
        inset: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
    }
    .main-page-nav{
        ul{
            display: flex;
            flex-direction: row; 
            justify-content: space-between;
        }
        
        background-color: red;
    }
    .subpagina-lijst{
        display: flex;
        flex-direction: row;
        background-color: green;
    }
</style>