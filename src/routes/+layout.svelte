<script>
	import { page } from '$app/stores'
	import { onNavigate, afterNavigate, beforeNavigate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { Footer, favIcon as favicon, PageArrow } from '$lib'
	import '$lib/assets/styles/general.css'
	import '$lib/assets/styles/layout.css'

	let expanded = $state(false)
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
				expanded = false

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
	const isParentActive = (path) => {
		return $page.url.pathname.startsWith(`${path}/`)
	}

	// Are we on this exact page?
	const isExactActive = (path) => {
		return $page.url.pathname === path
	}

	// Path is the path to the page and label is the text that will be displayed in the <a> tag
	const navItems = [
		{ path: '/', label: 'home' },
		{ path: '/mission', label: 'mission' },
		{ path: '/scientific', label: 'scientific' },
		// { path: "/news", label: "news" },
		{ path: '/team', label: 'team' },
		{ path: '/assignments', label: 'assignments' },
		{ path: '/partners', label: 'partners' },
	]

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="main-navigation">
	<button popovertarget="menu">
		Menu
		<span class="lines"></span>
		<span class="lines"></span>
		<span class="lines"></span>
	</button>

	<nav popover id="menu">
		<ul>
			<!-- Include this button separately as this is our close button -->
			<li>
				<button popovertarget="menu" popovertargetaction="hide">
					Menu
					<span class="lines"></span>
				</button>
			</li>
			<!-- Loop over each object -->
			{#each navItems as { path, label }}
				<li
					class={isExactActive(path)
						? 'exact-active'
						: isParentActive(path)
							? 'parent-active'
							: ''}>
					{#if isExactActive(path) || isParentActive(path)}
						<PageArrow />
					{/if}
					<a
						href={path}
						aria-current={isExactActive(path) ? 'page' : undefined}>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<main>
	{@render children?.()}
</main>
<!-- For some reason, passing navItems directly did not pass the prop correctly -->
<Footer {navItems} />

<style>
</style>
