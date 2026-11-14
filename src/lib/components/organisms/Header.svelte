<script>
	import { HamburgerButton, SkipLink } from '../atoms'
	import { Navigation, Search } from '../molecules'
	import logo from '$lib/assets/logos/sron-logo.webp'

	let { pages } = $props()

	let scrollY = $state(0)
	let scrolled = $derived(scrollY > 10)

    function handleToggle(event) {
        document.body.style.overflow = event.newState === 'open' ? 'hidden' : ''
    }

	function closeMenu() {
		document.getElementById('menu').hidePopover()
	}
</script>

<!--https://www.youtube.com/watch?v=K3CM7j9GIxk-->
<svelte:window bind:scrollY />

<SkipLink />

<header class={{ scrolled }}>
	<HamburgerButton />

	<section class="bar">
		<Navigation {pages} layout="row" />
		<Search />
	</section>

	<img src={logo} alt="SRON logo" />

	<section id="menu" popover ontoggle={handleToggle}>
		<div class="menu-close">
			<HamburgerButton close />
		</div>
		<Navigation {pages} layout="column" onclick={closeMenu} />
	</section>
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
		container-type: inline-size;

		&::before {
			content: '';
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
	.bar {
		display: none;

		@container (min-width: 70rem) {
			display: flex;
			gap: var(--spacing-xl);
			align-items: center;
		}
	}

	#menu {
        inset: 0;
		width: min(20rem, 100%);
		height: 100dvh;
        padding: var(--spacing-2xl) var(--spacing-md);
		border: none;
		background-color: var(--color-brand-darkest);
		translate: -100% 0;

		@media (prefers-reduced-motion: no-preference) {
            transition: all 0.4s allow-discrete;
        }

        &:popover-open {
            translate: 0 0;

            @starting-style {
                translate: -100% 0;
            }
        }
        &::backdrop {
            background: rgb(0 0 0 / 0.4);
            backdrop-filter: blur(0.5rem);
            opacity: 0;

            @media (prefers-reduced-motion: no-preference) {
                transition: all 0.4s allow-discrete;
            }
        }

        &:popover-open::backdrop {
            opacity: 1;

            @starting-style {
                opacity: 0;
            }
        }
	}

	.menu-close {
		position: absolute;
		top: 0;
		right: 0;
	}

	img {
		display: block;
		padding: var(--spacing-sm);
		height: 4rem;
		width: auto;
		margin-left: auto;
	}
</style>
