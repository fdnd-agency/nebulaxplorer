<script>
	import {
		placeholder1,
		placeholder2,
		rocketLaunchStep5,
		sronReviewStep1,
	} from '$lib'
	// import { onMount } from 'svelte'

	// onMount(() => {
	// 	let detailsElements = document.querySelectorAll('details')
	// 	detailsElements.forEach((element) => {
	// 		element.addEventListener('toggle', transition)
	// 	})
	// })

	// async function transition() {
	// 	if (document.startViewTransition) {
	// 		const transition = document.startViewTransition(() => {
	//
	// 		})
	// 	} else {
	//
	// 	}
	// }
</script>

<h3 class="section_title">Mission Timeline</h3>
<section>
	<details name="timeline" open>
		<summary class="caption">Reviews and Design Confirmation</summary>
		<article class="paragraph">
			Before production and launch, the project passes formal ECSS review
			stages. The System Requirements Review (SRR) defines and validates
			system needs. The Preliminary Design Review (PDR) evaluates the
			current design. Finally, the Critical Design Review (CDR) confirms
			readiness for manufacturing and verifies that a ll requirements are
			met.
		</article>
	</details>
	<details name="timeline">
		<summary class="caption">Testing and Qualification (V&V)</summary>
		<article class="paragraph">
			Verification and Validation ensures that all systems perform
			correctly. The Engineering Model (EM) is used for functional
			testing, while the Proto Flight Model (PFM) undergoes strict
			qualification tests. Activities include COTS component testing, FPGA
			prototyping, and alignment of the Optical Bench Assembly to
			withstand launch conditions.
		</article>
	</details>
	<details name="timeline">
		<summary class="caption">Assembly, Integration, and Test (AIT)</summary>
		<article class="paragraph">
			In the AIT phase, all subsystems are combined into a complete
			satellite. This includes propulsion and navigation systems such as
			star trackers. Interface control ensures compatibility between
			components. The integration of the 15-inch MkII Motorized Lightband
			connects the satellite securely to the launch vehicle.
		</article>
	</details>
	<details name="timeline">
		<summary class="caption">Launch Campaign (Pre-launch Phase)</summary>
		<article class="paragraph">
			At the launch site, final preparations are completed. The propulsion
			system is fueled with propylene and nitrous oxide. The satellite is
			mounted on a SpaceX Falcon 9 as a rideshare payload. The Flight
			Readiness Review (FRR) confirms launch readiness before liftoff and
			the start of LEOP.
		</article>
	</details>
</section>

<style>
	h3 {
		max-width: var(--content-width);
		width: 100%;
		margin-inline: auto;
		padding: 0;
	}

	section {
		border: 1px solid white;
		padding: 1rem 2rem;
		margin-inline: auto;
		max-width: var(--content-width);

		@media (width > 56.25rem) {
			display: grid;
			grid-template-columns: 1fr 2fr;
			grid-template-rows: repeat(4, 1fr);
			column-gap: 1rem;
		}
	}

	details {
		@media (width > 56.25rem) {
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
		padding: 1rem;

		background-repeat: no-repeat;
		background-size: cover;

		--space-mid-opacity: hsla(238, 35%, 15%, 0.75);
		--gradient: linear-gradient(
			transparent 0%,
			transparent 30%,
			var(--space-mid-opacity) 100%
		);

		@media (width > 56.25rem) {
			grid-column: 2;
			grid-row: 1 / -1;
			height: auto;
		}
	}

	details:not([open])::details-content {
		display: none;
	}

	summary {
		grid-column: 1;
		display: grid;
		padding: 1rem;
		cursor: pointer;
		z-index: 1;
		position: relative;
		padding-inline-start: 2em;

		text-transform: uppercase;
		transition: 0.2s;

		&:hover {
			background-color: var(--space-60);
		}

		&::before {
			content: '✨';
			position: absolute;
			align-self: center;
		}
	}

	details[open] summary {
		font-weight: bold;

		&::before {
			content: '🚀';
		}
	}

	details:nth-of-type(1) summary {
		grid-row: 1 / span 1;
	}

	details:nth-of-type(1)::details-content {
		background-image:
			var(--gradient), url('$lib/assets/images/placeholder1.jpg');
	}

	details:nth-of-type(2) summary {
		grid-row: 2 / span 1;
	}

	details:nth-of-type(2)::details-content {
		background-image:
			var(--gradient), url('$lib/assets/images/placeholder2.jpg');
	}

	details:nth-of-type(3) summary {
		grid-row: 3 / span 1;
	}

	details:nth-of-type(3)::details-content {
		background-image:
			var(--gradient), url('$lib/assets/images/sron-review-step-1.jpg');
	}

	details:nth-of-type(4) summary {
		grid-row: 4 / span 1;
	}

	details:nth-of-type(4)::details-content {
		background-image:
			var(--gradient), url('$lib/assets/images/rocket-launch-step-5.jpg');
	}

	details:nth-of-type(5) summary {
		grid-row: 5 / span 1;
	}
</style>
