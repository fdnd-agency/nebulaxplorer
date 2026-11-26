<script>
	import { onMount, tick, untrack } from 'svelte'
	import { ViewerLabel, ViewerPoster } from '$lib/components/molecules'
	import { ViewerControls } from '$lib/components/organisms'
	import { getRepresentation } from '$lib/scene/explorerScene.js'
	import { language, text } from '$lib/state/language.svelte.js'

	let {
		explorer,
		onReady,
		onUnsupported,
	} = $props()

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
	data-sheet={state.enhanced
		? explorer.isMobile()
			? state.sheetState
			: 'none'
		: undefined}
	data-explorer={state.explorerHidden ? 'hidden' : undefined}
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
			class:is-dismissed={state.hintDismissed || state.posterVisible}
			aria-hidden="true"
		>
			{text(state.coarsePointer ? 'hintTouch' : 'hintPointer')}
		</p>
		<ViewerControls {state} {controller} {explorer} />
	</div>
</div>

<style>
	/* The 3D view: only with JavaScript, always a dark space scene. The
	   --visible-* properties are the space the explorer covers, so the camera
	   centres the satellite in what is left (viewerController.js). */
	.viewer {
		display: none;
		color-scheme: dark;

		:global(.js-enhanced) & {
			position: fixed;
			inset: 0;
			display: block;
			--visible-left: 0px;
			--visible-right: 0px;
			--visible-bottom: 0px;

			@container satellite (width >= 720px) {
				--visible-right: var(--explorer-width);

				&[data-explorer='hidden'] {
					--visible-right: 0px;
				}
			}

			@container satellite (width < 720px) {
				--visible-bottom: var(--sheet-peek-height);

				&[data-sheet='expanded'] {
					--visible-bottom: calc(
						var(--stage-height) - var(--sheet-expanded-top)
					);
				}

				&[data-explorer='hidden'] {
					--visible-bottom: 0px;
				}
			}
		}

		:global(.satellite-page[data-layout='docked-columns'].js-enhanced) & {
			--visible-left: var(--docked-viewer-left);
			--visible-right: 0px;
			--visible-bottom: 0px;
		}

		:global(.satellite-page[data-layout='docked-rows'].js-enhanced) & {
			--visible-left: 0px;
			--visible-right: 0px;
			--visible-bottom: calc(
				var(--stage-height) - var(--docked-explorer-top)
			);
		}

		/* A moving line while the model loads */
		&.is-loading::before {
			content: '';
			position: absolute;
			top: 0;
			right: var(--visible-right);
			left: var(--visible-left);
			z-index: 1;
			height: 2px;
			background: linear-gradient(
				90deg,
				transparent,
				var(--color-accent-mid),
				transparent
			);
			background-size: 40% 100%;
			background-repeat: no-repeat;
			animation: loading-line 1.4s var(--ease) infinite;
		}
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
		outline: none;
		transition: opacity 180ms var(--ease);
		/* A vertical swipe scrolls the page (see src/lib/scene/controls.js) */
		touch-action: pan-y;

		.is-switching > & {
			opacity: 0;
		}
	}

	/* Where markers.js places the numbered markers (styled in
	   satellite-explorer.css) */
	.viewer-markers {
		position: absolute;
		inset: 0;
		overflow: hidden;
		clip-path: inset(
			0 var(--visible-right) var(--visible-bottom) var(--visible-left)
		);
		pointer-events: none;
		transition: opacity 150ms var(--ease);

		[data-sheet='expanded'] > & {
			opacity: 0;
			visibility: hidden;
		}
	}

	/* The part of the 3D view the explorer does not cover */
	.viewer-visible-area {
		position: absolute;
		top: 0;
		right: var(--visible-right);
		bottom: var(--visible-bottom);
		left: var(--visible-left);
		container: viewer-hud / inline-size;
		color: var(--color-neutral-lightest);
		pointer-events: none;
	}

	.viewer-status,
	.viewer-hint {
		position: absolute;
		left: var(--spacing-xl);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-normal);

		@container satellite (width < 720px) {
			left: var(--spacing-md);
		}
	}

	.viewer-status {
		top: var(--spacing-2xl);
	}

	/* "Drag to rotate": bottom left, and top left on a phone, never under the
	   buttons */
	.viewer-hint {
		bottom: var(--spacing-lg);
		max-width: calc(100cqi - 24rem);
		color: hsl(
			var(--neutral-h) var(--neutral-s) var(--neutral-lightest-l) / 75%
		);
		transition: opacity 400ms var(--ease);

		@container satellite (width < 720px) {
			top: var(--spacing-md);
			bottom: auto;
			max-width: calc(100cqi - 10rem);
		}

		&.is-dismissed {
			opacity: 0;
		}
	}

	@keyframes loading-line {
		from {
			background-position: -40% 0;
		}

		to {
			background-position: 140% 0;
		}
	}
</style>
