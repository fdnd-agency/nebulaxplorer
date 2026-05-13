<script>
	import { page } from '$app/stores'
	import { onNavigate, afterNavigate, beforeNavigate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { Footer, favIcon, Nav, PageArrow } from '$lib'
	import '$lib/assets/styles/general.css'

	let root

	// The onMount, beforeNavigate, and afterNavigate are all to prevent scroll-behavior: smooth to mess with the navigation.
	// Source for reference: https://www.reddit.com/r/sveltejs/comments/vbq54w/sveltekit_disable_smooth_scroll_when_navigating/

	onMount(() => {
		root = document.querySelector('html')
		root?.classList.add('smoothscroll')
	})

	beforeNavigate(() => {
		root?.classList.remove('smoothscroll')
	})

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		const popover = document.getElementById('menu')
		popover?.hidePopover()

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	afterNavigate(() => {
		root?.classList.add('smoothscroll')
	})

	// Are we on a slug page?
	// ex; on a detail page of the news page
	// Path is the path to the page and label is the text that will be displayed in the <a> tag
	const navItems = [
		{ path: '/', label: 'home' },
		{ path: '/mission', label: 'mission' },
		{ path: '/scientific', label: 'scientific' },
		{ path: '/team', label: 'team' },
		{ path: '/assignments', label: 'assignments' },
		{ path: '/partners', label: 'partners' },
	]

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favIcon} />
</svelte:head>

<Nav {navItems} />

<main>
	{@render children?.()}
</main>

<Footer {navItems} />

<style>
	/* VIEW TRANSITIONS */
	/* default reduced-motion friendly transition */
	:root::view-transition-old(root) {
		animation: unset;
	}

	:root::view-transition-new(root) {
		animation: unset;
	}

	@media (prefers-reduced-motion: no-preference) {
		:root::view-transition-old(root) {
			animation:
				0.3s ease-in both zoom-out,
				0.7s ease-out both slide-to-top;
		}

		:root::view-transition-new(root) {
			animation:
				0.7s ease-out both slide-to-center,
				0.3s ease-out 0.5s both zoom-in;
		}

		@keyframes zoom-in {
			from {
				scale: 0.85;
			}
			to {
				scale: 1;
			}
		}

		@keyframes zoom-out {
			from {
				scale: 1;
			}
			to {
				scale: 0.85;
			}
		}

		@keyframes slide-to-top {
			from {
				translate: 0 0;
			}
			to {
				translate: 0 100%;
			}
		}

		@keyframes slide-to-center {
			from {
				translate: 0 -100%;
			}
			to {
				translate: 0 0%;
			}
		}
	}
</style>
