<script>
	import {
		TimelineStep,
		placeholder1,
		placeholder2,
		sronReviewStep1,
		rocketLaunchStep5,
	} from '$lib'

	const data = [
		{
			id: 1,
			title: 'Reviews and Design Confirmation',
			content:
				'Before production and launch, the project passes formal ECSS review stages. The System Requirements Review (SRR) defines and validates system needs. The Preliminary Design Review (PDR) evaluates the current design. Finally, the Critical Design Review (CDR) confirms readiness for manufacturing and verifies that all requirements are met.',
			image: placeholder1,
		},
		{
			id: 2,
			title: 'Assembly, Integration, and Test (AIT)',
			content:
				'In the AIT phase, all subsystems are combined into a complete satellite. This includes propulsion and navigation systems such as star trackers. Interface control ensures compatibility between components. The integration of the 15-inch MkII Motorized Lightband connects the satellite securely to the launch vehicle.',
			image: sronReviewStep1,
		},
		{
			id: 3,
			title: 'Testing and Qualification (V&V)',
			content:
				'Verification and Validation ensures that all systems perform correctly. The Engineering Model (EM) is used for functional testing, while the Proto Flight Model (PFM) undergoes strict qualification tests. Activities include COTS component testing, FPGA prototyping, and alignment of the Optical Bench Assembly to withstand launch conditions.',
			image: placeholder2,
		},
		{
			id: 4,
			title: 'Launch Campaign (Pre-launch Phase)',
			content:
				'At the launch site, final preparations are completed. The propulsion system is fueled with propylene and nitrous oxide. The satellite is mounted on a SpaceX Falcon 9 as a rideshare payload. The Flight Readiness Review (FRR) confirms launch readiness before liftoff and the start of LEOP.',
			image: rocketLaunchStep5,
		},
	]
</script>

<section>
	<h3 class="section-title">Mission Timeline</h3>
	<article style="--_length: {data.length}">
		{#each data as step, index (step.id)}
			<TimelineStep {step} {index} />
		{/each}
		<div class="rocket" aria-hidden="true">🚀</div>
		<div class="background" aria-hidden="true"></div>
	</article>
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
