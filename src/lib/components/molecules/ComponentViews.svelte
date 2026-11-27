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

<style>
	/* On the spacecraft and Close-up: side by side on large screens; on small
	   screens one at a time, chosen with native radio buttons (browsers
	   without :has() show both, one above the other) */
	.component-views {
		display: grid;
		gap: var(--spacing-md);
		margin: 0 0 var(--spacing-xl);

		@container satellite (width >= 900px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--spacing-lg);
		}

		@container satellite (width < 900px) {
			@supports selector(:has(*)) {
				&:has(.component-views-input[value='close-up']:checked)
					> .is-location,
				&:not(:has(.component-views-input[value='close-up']:checked))
					> .is-close-up {
					display: none;
				}
			}
		}
	}

	.component-views-choice {
		display: none;
		margin: 0;
		padding: 0;
		border: 0;

		@container satellite (width < 900px) {
			@supports selector(:has(*)) {
				display: grid;
				grid-template-columns: repeat(2, minmax(0, 1fr));
				box-shadow: inset 0 0 0 1px var(--explorer-line);
			}
		}
	}

	.component-views-input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	.component-views-option {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 3rem;
		padding: var(--spacing-sm);
		color: var(--explorer-text-muted);
		font-family: var(--font-heading);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
		line-height: var(--line-height-normal);
		text-align: center;
		cursor: pointer;

		:checked + & {
			color: var(--explorer-text);
			background: var(--explorer-hover);
			box-shadow: inset 0 -3px 0 var(--explorer-select);
		}

		:focus-visible + & {
			outline: 2px solid var(--explorer-select);
			outline-offset: -2px;
		}

		@media (forced-colors: active) {
			border: 1px solid CanvasText;

			:checked + & {
				outline: 3px solid Highlight;
				outline-offset: -3px;
			}
		}
	}

	.component-view {
		margin: 0;
	}

	/* The same name sits above both views */
	.component-view-caption {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--spacing-xs) var(--spacing-sm);
		padding: 0 0 var(--spacing-sm);
		line-height: var(--line-height-normal);
	}

	.component-view-name {
		font-family: var(--font-heading);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
	}

	.component-view-kind {
		color: var(--explorer-text-muted);
		font-family: var(--font-body);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.component-view-frame {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: var(--color-brand-darkest);
		box-shadow: inset 0 0 0 1px var(--explorer-line);

		/* Close-ups on a quiet studio backdrop, so dark sensors and mirror
		   edges stay visible; the colour matches the render's background */
		&.is-studio {
			background: var(--studio);
			box-shadow: none;
		}

		@media (forced-colors: active) {
			border: 1px solid CanvasText;
		}
	}

	.component-view-image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* The labelled pointer: a ring on the part, a line and its name. The
	   pictures are dark renders, so it stays light in both modes. */
	.component-pointer {
		position: absolute;
		width: 0;
		height: 0;

		&::before {
			content: '';
			position: absolute;
			top: -10px;
			left: -10px;
			width: 20px;
			height: 20px;
			border: 2px solid var(--color-neutral-lightest);
			border-radius: 50%;
			box-shadow:
				0 0 0 2px
					hsl(
						var(--brand-h) var(--brand-s) var(--brand-darkest-l) /
							70%
					),
				inset 0 0 0 2px
					hsl(
						var(--brand-h) var(--brand-s) var(--brand-darkest-l) /
							70%
					);
		}

		&::after {
			content: '';
			position: absolute;
			left: -0.5px;
			width: 1px;
			height: 36px;
			background: var(--color-neutral-lightest);
		}

		&.is-above::after {
			bottom: 10px;
		}

		&.is-below::after {
			top: 10px;
		}
	}

	.component-pointer-label {
		position: absolute;
		padding: var(--spacing-xs) var(--spacing-sm);
		color: var(--color-neutral-lightest);
		background: hsl(
			var(--brand-h) var(--brand-s) var(--brand-darkest-l) / 92%
		);
		box-shadow: inset 0 0 0 1px
			hsl(
				var(--neutral-h) var(--neutral-s) var(--neutral-lightest-l) /
					45%
			);
		font-family: var(--font-heading);
		font-size: var(--font-size-body-sm);
		font-weight: 500;
		line-height: var(--line-height-normal);
		white-space: nowrap;

		.is-above > & {
			bottom: 46px;
		}

		.is-below > & {
			top: 46px;
		}

		.is-end > & {
			left: -14px;
		}

		.is-start > & {
			right: -14px;
		}

		@media (forced-colors: active) {
			border: 1px solid CanvasText;
		}
	}
</style>
