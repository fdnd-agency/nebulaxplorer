<script>
	import { Button } from '$lib/components/atoms'
	import { ChevronIcon, CloseIcon } from '$lib/assets/icons'
	import ExplorerBreadcrumb from '$lib/components/molecules/ExplorerBreadcrumb.svelte'
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
