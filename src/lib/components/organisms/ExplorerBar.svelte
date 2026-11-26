<script>
	import { Button } from '$lib/components/atoms'
	import { ExplorerBreadcrumb } from '$lib/components/molecules'
	import { ChevronIcon, CloseIcon } from '$lib/assets/icons'
	import { SHEET_STATES } from '$lib/state/viewerState.svelte.js'
	import { text } from '$lib/state/language.svelte.js'

	let { explorer } = $props()

	const { state, tree } = $derived(explorer)
	const sheetExpanded = $derived(state.sheetState === SHEET_STATES.EXPANDED)

	let dragStart = null

	function handlePointerdown(event) {
		if (!explorer.isMobile() || event.target.closest('a, button')) return
		dragStart = event.clientY
	}

	function handlePointerup(event) {
		if (dragStart === null) return
		const distance = event.clientY - dragStart
		dragStart = null
		if (distance < -40) explorer.setSheetState(SHEET_STATES.EXPANDED)
		else if (distance > 40) explorer.setSheetState(SHEET_STATES.PEEK)
	}

	function toggleSheet() {
		explorer.setSheetState(
			sheetExpanded ? SHEET_STATES.PEEK : SHEET_STATES.EXPANDED,
		)
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="explorer-bar"
	data-sheet={state.sheetState}
	onpointerdown={handlePointerdown}
	onpointerup={handlePointerup}
	onpointercancel={() => (dragStart = null)}
>
	<span class="explorer-grabber" aria-hidden="true"></span>
	<ExplorerBreadcrumb {explorer} />
	<p class="explorer-current" aria-hidden="true">
		<span class="explorer-current-number"
			>{tree.getNumber(state.selectedId) ?? ''}</span
		>
		<span class="explorer-current-title"
			>{state.enhanced
				? explorer.getFullTitle(state.selectedId)
				: ''}</span
		>
	</p>
	{#if state.fullscreen}
		<Button
			text=""
			variant="primary-solid"
			classes="explorer-hide"
			aria-controls="explorer"
			aria-label={text('hideExplorer')}
			title={text('hideExplorer')}
			onclick={() => explorer.setExplorerHidden(true)}
		>
			{#snippet icon()}<CloseIcon width={16} height={16} />{/snippet}
		</Button>
	{/if}
	<!-- On a phone: opens and folds the sheet; points up while it can open -->
	{#if explorer.isMobile()}
		<Button
			text=""
			variant="secondary-solid"
			classes="explorer-sheet-toggle"
			aria-controls="explorer"
			aria-expanded={String(sheetExpanded)}
			aria-label={text(
				sheetExpanded ? 'collapseExplorer' : 'expandExplorer',
			)}
			onclick={toggleSheet}
		>
			{#snippet icon()}<ChevronIcon
					direction={sheetExpanded ? 'down' : 'up'}
					width={14}
					height={14}
				/>{/snippet}
		</Button>
	{/if}
</div>

<style>
	/* The bar on top of the explorer: breadcrumb, and on a phone the grabber,
	   the selected item (peek row) and the arrow that opens the sheet */
	.explorer-bar {
		container: explorer-bar / inline-size;
		display: none;

		:global(.js-enhanced) & {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
			gap: var(--spacing-sm);
			padding: var(--spacing-md) var(--spacing-lg) var(--spacing-sm)
				2.5rem;

			@container satellite (width < 720px) {
				position: relative;
				grid-template-columns: minmax(0, 1fr) auto auto;
				gap: var(--spacing-xs);
				padding: var(--spacing-lg) var(--spacing-xs) 0 var(--spacing-md);
				touch-action: none;
			}
		}

		:global(.js-enhanced) &[data-sheet='peek'] {
			@container satellite (width < 720px) {
				cursor: pointer;
			}
		}
	}

	/* Shows that the sheet can be dragged */
	.explorer-grabber {
		display: none;

		:global(.js-enhanced) & {
			@container satellite (width < 720px) {
				position: absolute;
				top: 0;
				left: 50%;
				display: block;
				width: 72px;
				height: 20px;
				transform: translateX(-50%);

				&::before {
					content: '';
					display: block;
					width: 32px;
					height: 3px;
					margin: var(--spacing-sm) auto 0;
					background: var(--explorer-line);
				}
			}
		}

		:global(.satellite-page[data-layout^='docked']) & {
			display: none;
		}
	}

	/* The selected item in the sheet's peek row */
	.explorer-current {
		display: none;

		:global(.js-enhanced) [data-sheet='peek'] > & {
			@container satellite (width < 720px) {
				display: flex;
				grid-column: 1;
				align-items: baseline;
				gap: var(--spacing-sm);
				margin: var(--spacing-xs) 0 var(--spacing-md);
				padding-right: var(--spacing-sm);
			}
		}
	}

	.explorer-current-number {
		color: var(--explorer-accent);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-normal);
	}

	.explorer-current-title {
		overflow: hidden;
		font-family: var(--font-heading);
		font-size: var(--font-size-body-lg);
		line-height: var(--line-height-normal);
		white-space: nowrap;
		text-overflow: ellipsis;

		@container explorer-bar (width < 320px) {
			font-size: var(--font-size-body-md);
		}
	}
</style>
