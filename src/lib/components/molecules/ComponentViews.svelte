<script>
	import { ComponentImage } from '$lib/components/atoms'
	import { pick, text } from '$lib/state/language.svelte.js'

	// Two views of one component without JavaScript: where it sits ("On the
	// spacecraft", or inside the instrument for its parts) and a close-up.
	// Large screens show both side by side; small screens choose one with
	// native radio buttons, which CSS turns into the visible view.
	let {
		item,
		scope = 'spacecraft',
	} = $props()

	const name = $derived(pick(item.title))
	const group = $derived(`${item.id}-view`)
	const [x, y] = $derived(item.location.anchor)
	// The label grows away from the nearest edge and never covers the point
	const side = $derived(x > 0.56 ? 'start' : 'end')
	const vertical = $derived(y < 0.32 ? 'below' : 'above')
	const where = $derived(
		text(scope === 'instrument' ? 'inInstrument' : 'onSpacecraft'),
	)
	const locationAlt = $derived(
		text(
			scope === 'instrument' ? 'locationAltInstrument' : 'locationAlt',
		).replace('{name}', name),
	)
	const base = $derived(`/media/locations/${item.id}`)
</script>

<div class="component-views">
	<fieldset class="component-views-choice">
		<legend class="visually-hidden">{text('chooseView')}: {name}</legend>
		<input
			class="component-views-input"
			type="radio"
			name={group}
			id="{group}-location"
			value="location"
			checked
		/>
		<label class="component-views-option" for="{group}-location"
			>{where}</label
		>
		<input
			class="component-views-input"
			type="radio"
			name={group}
			id="{group}-close"
			value="close-up"
		/>
		<label class="component-views-option" for="{group}-close"
			>{text('closeUp')}</label
		>
	</fieldset>

	<figure class="component-view is-location">
		<figcaption class="component-view-caption">
			<span class="component-view-name">{name}</span>
			<span class="component-view-kind">{where}</span>
		</figcaption>
		<div class="component-view-frame">
			<img
				class="component-view-image"
				src="{base}-1200.webp"
				srcset="{base}-640.webp 640w, {base}-1200.webp 1200w"
				sizes="(min-width: 1100px) 560px, (min-width: 900px) 46vw, 100vw"
				width="1200"
				height="900"
				loading="lazy"
				decoding="async"
				alt={locationAlt}
			/>
			<!-- The pointer repeats the name, so the blue outline is never the only
			     clue; the image's alt text says the same -->
			<span
				class="component-pointer is-{side} is-{vertical}"
				style="left: {x * 100}%; top: {y * 100}%"
				aria-hidden="true"
				><span class="component-pointer-label">{name}</span></span
			>
		</div>
	</figure>

	<figure class="component-view is-close-up">
		<figcaption class="component-view-caption">
			<span class="component-view-name">{name}</span>
			<span class="component-view-kind">{text('closeUp')}</span>
		</figcaption>
		<div class="component-view-frame is-studio">
			<ComponentImage
				image={item.image}
				sizes="(min-width: 1100px) 560px, (min-width: 900px) 46vw, 100vw"
			/>
		</div>
	</figure>
</div>
