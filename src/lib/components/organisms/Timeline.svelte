<script>
	import { TimelineStep } from '$lib'
	let { steps } = $props()
</script>

<section>
	<h3 class="section-title">Mission Timeline</h3>
	{#if steps.length > 0}
		<article style="--_length: {steps.length}">
			{#each steps as step, index (step.id)}
				<TimelineStep {step} {index} />
			{/each}
			<div class="rocket" aria-hidden="true">🚀</div>
			<div class="background" aria-hidden="true"></div>
		</article>
	{:else}
		<p>Error fetching Mission Timeline</p>
	{/if}
</section>

<style>
	/* Source used: https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid/ */
	section {
		margin-block: calc(2rem + 2vw);
		container-type: inline-size;
	}

	h3 {
		width: 100%;
		max-width: var(--content-width);
		margin-inline: auto;
		margin-block-end: 0.5em;
		padding: 0;
	}

	/* Timeline grid container */
	article {
		border: 1px solid var(--background-color-light);
		padding-block: 1rem;
		padding-inline: 1rem;
		--_step-height: calc((100% - 2rem) / var(--_length));

		position: relative;
		margin-inline: auto;
		padding: 1rem;
		max-width: var(--content-width);

		@container (width > 50rem) {
			display: grid;
			grid-template-columns: 1fr 2fr;
			grid-template-rows: repeat(var(--_length), 1fr);
			column-gap: 1rem;
		}
	}

	details {
		@container (width > 50rem) {
			display: grid;
			grid-template-columns: subgrid;
			grid-template-rows: subgrid;
			grid-column: 1 / -1;
			grid-row: 1 / -1;
		}
	}

	details::details-content {
		display: flex;
		align-items: flex-end;

		height: 20rem;
		padding-block: 1rem;
		padding-inline: 1rem;

		background-repeat: no-repeat;
		background-size: cover;

		opacity: 0;
		transition:
			opacity 0.4s,
			content-visibility 0.4s allow-discrete;

		--_space-mid-opacity: hsla(238, 35%, 15%, 0.75);
		--_gradient: linear-gradient(
			transparent 0%,
			var(--_space-mid-opacity) 30%,
			var(--_space-mid-opacity) 100%
		);

		@container (width > 50rem) {
			grid-column: 2;
			grid-row: 1 / -1;
			height: auto;

			--_gradient: linear-gradient(
				transparent 0%,
				transparent 30%,
				var(--_space-mid-opacity) 100%
			);
		}
	}

	details[open]::details-content {
		opacity: 1;
	}

	details:not([open])::details-content {
		display: none;

		@container (width > 50rem) {
			display: inherit;
		}
	}

	summary {
		grid-column: 1;
		display: grid;
		cursor: pointer;
		z-index: 1;
		position: relative;
		padding-block: 1rem;
		padding-inline-start: 2em;
		padding-inline-end: 1rem;

		text-transform: uppercase;
		transition: 0.2s;

		&:hover {
			background-color: var(--space-60);
		}

		&::before {
			content: '';
			background-image: radial-gradient(white 50%, transparent 50%);
			position: absolute;
			align-self: center;
			transform: scale(1);
			transition: 1s;
			transform-origin: center;
			height: 2rem;
			width: 2rem;
			z-index: 2;
		}
	}

	p {
		max-height: 100%;
		overflow-y: auto;
		scrollbar-color: var(--space-60) var(--background-color-dark);
	}

	details[open] summary {
		font-weight: bold;
		pointer-events: none; /* ensures there is always one details open */

		&::before {
			content: '';
			background-image: radial-gradient(white 50%, transparent 50%);
			transform: scale(0.1);
		}
	}

	/* Set background images for each details element */

	details:nth-of-type(1) summary {
		grid-row: 1 / span 1;
	}

	details:nth-of-type(1)::details-content {
		background-image:
			var(--_gradient), url('$lib/assets/images/placeholder1.jpg');
	}

	details:nth-of-type(2) summary {
		grid-row: 2 / span 1;
	}

	details:nth-of-type(2)::details-content {
		background-image:
			var(--_gradient), url('$lib/assets/images/placeholder2.jpg');
	}

	details:nth-of-type(3) summary {
		grid-row: 3 / span 1;
	}

	details:nth-of-type(3)::details-content {
		background-image:
			var(--_gradient), url('$lib/assets/images/sron-review-step-1.jpg');
	}

	details:nth-of-type(4) summary {
		grid-row: 4 / span 1;
	}

	details:nth-of-type(4)::details-content {
		background-image:
			var(--_gradient), url('$lib/assets/images/rocket-launch-step-5.jpg');
	}

	/* Decorative rocket timeline */
	.rocket {
		display: none;
	}

	@container (width > 50rem) {
		.rocket {
			display: block;
			position: absolute;
			font-size: 2rem;
			transition: 1s;
			z-index: 2;

			/* Fallback when anchor positioning is not supported */
			top: calc(0.5 * var(--_step-height));
			left: 1rem;

			@supports (position-anchor: --details-open) {
				position-anchor: --details-open;
				top: calc(anchor(center) - 1rem);
				left: anchor(left);
			}
		}

		.background {
			position: absolute;
			top: calc(0.5 * var(--_step-height) + 1rem);
			left: 2rem;
			bottom: calc(0.5 * var(--_step-height) + 1rem);
			background: var(--background-color-light, white);
			width: 2px;
			z-index: 1;
		}
	}

	/* Fallback when anchor positioning is not supported (baseline 2026) */
	@supports not (anchor-name: --details-open) {
		article:global(:has(details:nth-of-type(2)[open]) .rocket) {
			top: calc(1.5 * var(--_step-height));
		}

		article:global(:has(details:nth-of-type(3)[open]) .rocket) {
			top: calc(2.5 * var(--_step-height));
		}

		article:global(:has(details:nth-of-type(4)[open]) .rocket) {
			top: calc(3.5 * var(--_step-height));
		}

		article:global(:has(details:nth-of-type(5)[open]) .rocket) {
			top: calc(4.5 * var(--_step-height));
		}
	}

	@supports (anchor-name: --details-open) {
		:global(details[open] summary) {
			anchor-name: --details-open;
		}
	}
</style>
