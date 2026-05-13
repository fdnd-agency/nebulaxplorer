<script>
	import { page } from '$app/stores'
	import { PageArrow } from '$lib'

	// Are we on a slug page?
	// ex; on a detail page of the news page
	const isParentActive = (path) => {
		return $page.url.pathname.startsWith(`${path}/`)
	}

	// Are we on this exact page?
	const isExactActive = (path) => {
		return $page.url.pathname === path
	}

	let { navItems } = $props()
</script>

<header class="main-navigation">
	<button popovertarget="menu">
		<span class="visually-hidden">Open</span>Menu
		<span class="lines"></span>
		<span class="lines"></span>
		<span class="lines"></span>
	</button>

	<nav popover id="menu">
		<ul>
			<!-- Include this button separately as this is our close button -->
			<li>
				<button popovertarget="menu" popovertargetaction="hide">
					<span class="visually-hidden">Close</span>Menu
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

<style>
	/* The container of the nav: the header */
	.main-navigation {
		display: flex;
		justify-content: flex-end;
		position: relative;
		z-index: 10;
		background: transparent;
		font-family: SpaceGrotesk;
		text-transform: capitalize;
		color: var(--white);

		@media (min-width: 56.25rem) {
			position: sticky;
			top: 0;
			justify-content: initial;
			padding: 1rem;
			background: var(--space-100);
		}

		@media (prefers-reduced-motion: no-preference) {
			@supports (animation-timeline: view()) {
				animation: anim-timeline--header-opacity 1ms ease both;
				animation-timeline: scroll(root);
				animation-range: 2rem 8rem;
			}
		}
	}

	/* The button that opens the nav */
	.main-navigation button[popovertarget] {
		display: none;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 3.75rem;
		aspect-ratio: 1;
		padding: 0.5rem;
		position: fixed;
		z-index: 1;
		top: 0;
		color: inherit;
		background: var(--ultra-170);

		@supports selector([popover]:popover-open) {
			display: flex;
		}

		@media (min-width: 56.25rem) {
			display: none;
		}

		.lines {
			display: block;
			height: 0.125rem;
			width: 85%;
			background: currentColor;
		}

		.lines:first-child {
			margin-top: 0.25rem;
		}

		.lines + .lines {
			margin-top: 0.375rem;
		}
	}

	/* The nav element in the header */
	.main-navigation nav {
		justify-self: end;
		translate: 0 0;
		height: 100%;
		width: 100%;
		max-width: 100%;
		background: var(--ultra-170);
		color: inherit;

		@media (prefers-reduced-motion: no-preference) {
			transition: 0.3s ease-out allow-discrete;
		}

		@supports selector([popover]:popover-open) {
			translate: 100% 0;
			max-width: 22.5rem;
		}

		@media (min-width: 56.25rem) {
			display: block;
			background: inherit;
			transform: translateX(0%);
			position: initial;
			width: initial;
			translate: 0;
			max-width: 100%;
		}

		/* Popover */
		&:popover-open {
			translate: 0 0;
		}

		@starting-style {
			&:popover-open {
				translate: 100% 0;
			}
		}

		/* Popover backdrop */
		&::backdrop {
			background-color: transparent;

			@media (prefers-reduced-motion: no-preference) {
				transition: 0.3s allow-discrete; /* allow-discrete keyword is not supported in firefox */
			}
		}

		&:popover-open::backdrop {
			background: var(--space-low-opacity);
		}

		@starting-style {
			&:popover-open::backdrop {
				background-color: transparent;
			}
		}
	}

	/* List of nav items */
	.main-navigation ul {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		width: 100%;
		padding: 1rem 2rem;
		list-style: none;

		@supports selector([popover]:popover-open) {
			/*  Appears to be based on open menu button (.main-navigation button[popovertarget]): 
			padding-block + .lines margin-top + .lines margin-top + .lines:first-child + some extra spacing? */
			padding-top: calc(
				1rem + 0.375rem + 0.375rem + 0.25rem + 1rem + 1rem
			);
		}

		@media (min-width: 56.25rem) {
			flex-direction: row;
			align-items: flex-end;
			padding-top: 1rem;
			gap: 1.5rem;
			width: initial;
		}
	}

	/* Individual nav items */
	.main-navigation li {
		display: flex;
		flex-direction: row-reverse;
		width: fit-content;
		align-items: center;

		&.parent-active,
		&.exact-active {
			font-weight: 800;
		}

		:global(svg) {
			transform: rotate(180deg);
			animation: anim-arrow--opacity 3s linear infinite;
		}

		:global(svg path) {
			fill: var(--white);
		}

		@media (min-width: 56.25rem) {
			display: flex;
			flex-direction: column;

			&:hover a {
				color: var(--cleanroom-60);

				@media (prefers-reduced-motion: no-preference) {
					&::before {
						transform: scaleX(1);
						transform-origin: left;
					}
				}
			}

			:global(svg) {
				transform: rotateZ(90deg);
			}

			:global(svg),
			:global(svg path) {
				fill: var(--cleanroom-100);
			}
		}
	}

	.main-navigation li a {
		display: inline-block;
		position: relative;
		padding: 1rem;
		font-weight: inherit;
		font-size: 1.25rem;
		transition: font-weight 0.3s ease-in-out;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			transition: transform 0.3s ease-in-out;
			transform: scaleX(0);
			transform-origin: right;
			background: var(--space-140);
			z-index: -1;
		}
	}

	/* By default: don't display the button. */
	.main-navigation nav button[popovertargetaction='hide'] {
		display: none;
	}

	/* When the popover selector is supported: display the button, but only when the nav is open. */
	.main-navigation nav:popover-open button[popovertargetaction='hide'] {
		@supports selector([popover]:popover-open) {
			display: flex;
			position: fixed;
			top: 0;
			right: 0;
		}
	}

	.main-navigation button[popovertargetaction='hide'] .lines {
		--thickness: 2px;
		--gradient: #fff0 90deg, var(--white) 0;
		background: conic-gradient(
				from 90deg at var(--thickness) var(--thickness),
				var(--gradient)
			)
			calc(100% + var(--thickness) / 2)
			calc(100% + var(--thickness) / 2) / calc(50% + var(--thickness))
			calc(50% + var(--thickness));
		transform-origin: unset;
		height: unset;
		width: 1.875rem;
		aspect-ratio: 1;
		rotate: 45deg;
	}

	/* ANIMATIONS */
	@media (prefers-reduced-motion: no-preference) {
		@keyframes anim-arrow--opacity {
			30% {
				opacity: 1;
			}
			45% {
				opacity: 0.6;
			}
			55% {
				opacity: 0.6;
			}
			70% {
				opacity: 1;
			}
		}

		@keyframes anim-timeline--header-opacity {
			to {
				background-color: var(--space-100);
			}
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

		@keyframes fade-out {
			to {
				opacity: 0;
			}
		}

		@keyframes fade-in {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}

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
	}

	/* These only need to happen on desktop */
	@media (min-width: 56.25rem) {
		.main-navigation {
			view-transition-name: header;
		}
		.exact-active :global(svg) {
			view-transition-name: active-page;
		}
	}
</style>
