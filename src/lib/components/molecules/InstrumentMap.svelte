<script>
	import { pick, text } from '$lib/state/language.svelte.js'

	// How the parts of the X-ray instrument fit together: the opened
	// instrument with a numbered label per part. Labels sit in two columns
	// beside the instrument with a line to the part, so they never overlap
	// the hardware or each other. The numbers match the list of parts.
	let {
		map,
		parts,
	} = $props()

	const width = 1600
	const height = 1000
	const gap = 92

	const labels = $derived.by(() => {
		const placed = parts
			.map((part, index) => {
				const [x, y] = map.anchors[part.id] ?? [0.5, 0.5]
				return {
					id: part.id,
					number: String(index + 1).padStart(2, '0'),
					name: pick(part.title),
					x: x * width,
					y: y * height,
				}
			})
			.sort((a, b) => a.y - b.y)
		const columns = { start: [], end: [] }
		// Alternate sides from top to bottom, so both columns stay short
		placed.forEach((label, index) =>
			columns[index % 2 ? 'end' : 'start'].push(label),
		)
		for (const [side, list] of Object.entries(columns)) {
			let last = -Infinity
			for (const label of list) {
				label.side = side
				label.labelY = Math.max(label.y, last + gap, 60)
				last = label.labelY
				label.labelX = side === 'start' ? 330 : width - 330
			}
		}
		return placed
	})
</script>

<figure class="instrument-map">
	<div class="instrument-map-frame">
		<img
			class="instrument-map-image"
			src="{map.image}-1200.webp"
			srcset="{map.image}-640.webp 640w, {map.image}-1200.webp 1200w, {map.image}-1600.webp 1600w"
			sizes="(min-width: 1280px) 1180px, 100vw"
			width="1600"
			height="1000"
			loading="lazy"
			decoding="async"
			alt={pick(map.alt)}
		/>
		<svg
			class="instrument-map-lines"
			viewBox="0 0 {width} {height}"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			{#each labels as label (label.id)}
				<polyline
					points="{label.labelX},{label.labelY} {label.side ===
					'start'
						? label.labelX + 40
						: label.labelX - 40},{label.labelY} {label.x},{label.y}"
				/>
			{/each}
		</svg>
		{#each labels as label (label.id)}
			<span
				class="instrument-map-point"
				style="left: {(label.x / width) * 100}%; top: {(label.y /
					height) *
					100}%"
				aria-hidden="true"
			></span>
			<!-- Not links: the list of parts below is the way in, with large tap
			     areas; these labels only name what is where -->
			<span
				class="instrument-map-label is-{label.side}"
				style="left: {(label.labelX / width) *
					100}%; top: {(label.labelY / height) * 100}%"
				aria-hidden="true"
				><span class="instrument-map-number">{label.number}</span><span
					class="instrument-map-name">{label.name}</span
				></span
			>
		{/each}
	</div>
	<figcaption>{text('mapCaption')}</figcaption>
</figure>
