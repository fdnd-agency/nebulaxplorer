<script>
	import Icon from '$lib/components/atoms/Icon.svelte'
	import ExplorerBreadcrumb from '$lib/components/molecules/ExplorerBreadcrumb.svelte'
	import { SHEET_STATES } from '$lib/state/viewerState.svelte.js'
	import { text } from '$lib/state/language.svelte.js'

	let { explorer } = $props()

	const { state, tree } = $derived(explorer)
	const sheetExpanded = $derived(state.sheetState === SHEET_STATES.EXPANDED)

	let dragStart = null

	function handlePointerdown(event) {
		if (!explorer.isMobile() || event.target.closest('a, .explorer-close'))
			return
		dragStart = event.clientY
	}

	function handlePointerup(event) {
		if (dragStart === null) return
		const distance = event.clientY - dragStart
		dragStart = null
		if (distance < -40) explorer.setSheetState(SHEET_STATES.EXPANDED)
		else if (distance > 40)
			explorer.setSheetState(
				state.sheetState === SHEET_STATES.EXPANDED
					? SHEET_STATES.PEEK
					: SHEET_STATES.CLOSED,
			)
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
	<button
		type="button"
		class="explorer-grabber"
		aria-controls="explorer"
		aria-expanded={String(sheetExpanded)}
		aria-label={text(sheetExpanded ? 'collapseExplorer' : 'expandExplorer')}
		onclick={toggleSheet}
	></button>
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
	<button
		type="button"
		class="explorer-close"
		aria-label={text('closeExplorer')}
		onclick={() => explorer.closeExplorer()}
	>
		<Icon name="close" />
	</button>
</div>
