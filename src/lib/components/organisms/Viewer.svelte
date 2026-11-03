<script>
	import { onMount, tick, untrack } from 'svelte'
	import ViewerLabel from '$lib/components/molecules/ViewerLabel.svelte'
	import ViewerPoster from '$lib/components/molecules/ViewerPoster.svelte'
	import ViewerControls from '$lib/components/organisms/ViewerControls.svelte'
	import { getRepresentation } from '$lib/scene/explorerScene.js'
	import { language, text } from '$lib/state/language.svelte.js'

	let { explorer, onReady, onUnsupported } = $props()

	const { state, tree } = $derived(explorer)
	const isRoot = $derived(state.selectedId === tree.rootId)
	const representation = $derived(
		getRepresentation(tree.get(state.selectedId)),
	)
	const tag = $derived(
		representation === 'optics'
			? 'schematic'
			: representation === 'part'
				? 'cadPart'
				: null,
	)
	const visible = $derived(state.enhanced && explorer.isVisible())

	let viewer = $state()
	let canvas = $state()
	let visibleArea = $state()
	let markersElement = $state()
	let controller = $state(null)

	onMount(() => {
		let disposed = false
		let created = null
		;(async () => {
			const { createRenderer } = await import('$lib/scene/renderer.js')
			const renderer = createRenderer()
			if (!renderer) {
				onUnsupported()
				return
			}
			const { createViewerController } =
				await import('$lib/scene/viewerController.js')
			if (disposed) {
				renderer.dispose()
				return
			}
			onReady()
			created = createViewerController(explorer, {
				renderer,
				viewer,
				canvas,
				visibleArea,
				markersElement,
			})
			controller = created
			created.start()
		})()
		return () => {
			disposed = true
			created?.destroy()
		}
	})

	$effect(() => {
		state.sceneRequest
		if (controller) untrack(() => controller.applySceneState())
	})

	$effect(() => {
		const id = state.previewId
		if (controller) untrack(() => controller.preview(id))
	})

	$effect(() => {
		language.current
		if (controller) untrack(() => controller.updateMarkerLabels())
	})

	$effect(() => {
		visible
		state.sheetState
		state.layoutMode
		if (!controller) return
		tick().then(() => controller.updateViewOffsetTarget())
	})
</script>

<div
	class="viewer"
	class:is-loading={state.status === 'loading'}
	class:is-switching={state.switching}
	data-explorer={visible ? 'open' : 'closed'}
	data-sheet={state.enhanced
		? explorer.isMobile()
			? state.sheetState
			: 'none'
		: undefined}
	data-representation={state.representation ?? undefined}
	bind:this={viewer}
>
	<!-- svelte-ignore a11y_no_interactive_element_to_noninteractive_role -->
	<canvas
		id="app"
		role="img"
		aria-label={text('canvasLabel')}
		bind:this={canvas}
	></canvas>
	<div
		class="viewer-markers"
		aria-hidden="true"
		bind:this={markersElement}
	></div>
	<div class="viewer-visible-area" bind:this={visibleArea}>
		<ViewerPoster
			visible={state.posterVisible}
			onload={() => controller?.loadModel()}
		/>
		<ViewerLabel
			hidden={isRoot}
			number={tree.getNumber(state.selectedId) ?? ''}
			name={state.enhanced ? explorer.getFullTitle(state.selectedId) : ''}
			tag={tag ? text(tag) : ''}
		/>
		<p class="viewer-status" role="status" hidden={!state.status}>
			{state.status
				? text(state.status === 'error' ? 'loadError' : 'loading')
				: ''}
		</p>
		<p
			class="viewer-hint"
			class:is-dismissed={state.hintDismissed}
			aria-hidden="true"
		>
			{text(state.coarsePointer ? 'hintTouch' : 'hintPointer')}
		</p>
		<ViewerControls {state} {controller} />
	</div>
</div>
