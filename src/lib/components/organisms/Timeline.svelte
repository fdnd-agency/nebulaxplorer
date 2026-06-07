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
