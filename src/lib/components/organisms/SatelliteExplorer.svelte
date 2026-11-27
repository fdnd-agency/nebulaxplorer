<script>
	import '$lib/styles/satellite-explorer.css'

	import { onMount } from 'svelte'
	import { HamburgerButton, StatusMessage } from '$lib/components/atoms'
	import { LanguageSwitcher, PageNotices } from '$lib/components/molecules'
	import { Explorer, Viewer } from '$lib/components/organisms'
	import { createExplorer } from '$lib/state/explorer.svelte.js'
	import { language, text } from '$lib/state/language.svelte.js'

	let { content } = $props()

	// The content is static, so the explorer is created once from the first value
	// svelte-ignore state_referenced_locally
	const explorer = createExplorer(content)
	const { state } = explorer

	onMount(() => explorer.connect())

	// Runs while the page is being read, before it is drawn: with JavaScript
	// the 3D view takes the place of the page without it, so that page does not
	// flash up first. If the 3D view has not started after 8 seconds (an error,
	// a very slow connection), the page without it is shown after all.
	const pendingScript = `<script>{const page = document.currentScript.parentElement; page.classList.add('js-pending'); setTimeout(() => page.classList.remove('js-pending'), 8000)}<\/script>`
</script>

<!-- The explorer switches between English and Dutch on its own; the rest of
     the site keeps its language -->
<div class="satellite-page" lang={language.current}>
	{@html pendingScript}
	<PageNotices fallback={state.fallback} />

	<div class="explorer-layout">
		<Viewer
			{explorer}
			onReady={explorer.enhance}
			onUnsupported={explorer.showFallback}
		/>

		<Explorer {explorer} />

		<!-- In full screen the explorer can be hidden; the team's menu button
		     brings it back -->
		{#if state.explorerHidden}
			<div class="explorer-menu-button">
				<HamburgerButton
					label={text('showExplorer')}
					onclick={() => explorer.setExplorerHidden(false)}
					classes="explorer-toggle"
					aria-controls="explorer"
					aria-expanded={!state.explorerHidden}
					title={text('showExplorer')}
				/>
			</div>
		{/if}

		<div
			class="explorer-language"
			class:is-beside-menu-button={state.explorerHidden}
		>
			<LanguageSwitcher />
		</div>
	</div>

	<StatusMessage message={state.announcement} />
</div>

<style>
	/* The layout mode: a panel beside the 3D view, a sheet on a phone, or the
	   two screens of a dual-screen device. JavaScript reads it from here
	   (src/lib/utils/layoutMode.js). */
	.explorer-layout {
		--explorer-mode: panel;

		@container satellite (width < 720px) {
			--explorer-mode: sheet;
		}

		/* Device posture, not available as a container query */
		@media (horizontal-viewport-segments: 2) {
			--explorer-mode: docked-columns;
		}

		@media (vertical-viewport-segments: 2) {
			--explorer-mode: docked-rows;
		}
	}

	/* The NL/EN switch, top right of the 3D view, beside the panel */
	.explorer-language {
		:global(.js-enhanced) & {
			position: fixed;
			top: var(--spacing-md);
			right: var(--spacing-lg);
			z-index: 35;

			@container satellite (width >= 720px) {
				right: calc(var(--explorer-width) + var(--spacing-lg));
			}
		}

		:global(.js-enhanced) &.is-beside-menu-button {
			right: calc(var(--toggle-width) + var(--spacing-lg));
		}
	}

	/* The menu button that brings the hidden explorer back (full screen) */
	.explorer-menu-button {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 45;
	}
</style>
