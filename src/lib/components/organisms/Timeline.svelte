<script>
	import {
		placeholder1,
		placeholder2,
		rocketLaunchStep5,
		sronReviewStep1,
	} from '$lib'
</script>

<section>
	<h3 class="section_title">Mission Timeline</h3>
	<article>
		<details name="timeline" open>
			<summary class="caption">Reviews and Design Confirmation</summary>
			<p class="paragraph">
				Before production and launch, the project passes formal ECSS
				review stages. The System Requirements Review (SRR) defines and
				validates system needs. The Preliminary Design Review (PDR)
				evaluates the current design. Finally, the Critical Design
				Review (CDR) confirms readiness for manufacturing and verifies
				that a ll requirements are met.
			</p>
		</details>
		<details name="timeline">
			<summary class="caption">Testing and Qualification (V&V)</summary>
			<p class="paragraph">
				Verification and Validation ensures that all systems perform
				correctly. The Engineering Model (EM) is used for functional
				testing, while the Proto Flight Model (PFM) undergoes strict
				qualification tests. Activities include COTS component testing,
				FPGA prototyping, and alignment of the Optical Bench Assembly to
				withstand launch conditions.
			</p>
		</details>
		<details name="timeline">
			<summary class="caption">
				Assembly, Integration, and Test (AIT)
			</summary>
			<p class="paragraph">
				In the AIT phase, all subsystems are combined into a complete
				satellite. This includes propulsion and navigation systems such
				as star trackers. Interface control ensures compatibility
				between components. The integration of the 15-inch MkII
				Motorized Lightband connects the satellite securely to the
				launch vehicle.
			</p>
		</details>
		<details name="timeline">
			<summary class="caption">
				Launch Campaign (Pre-launch Phase)
			</summary>
			<p class="paragraph">
				At the launch site, final preparations are completed. The
				propulsion system is fueled with propylene and nitrous oxide.
				The satellite is mounted on a SpaceX Falcon 9 as a rideshare
				payload. The Flight Readiness Review (FRR) confirms launch
				readiness before liftoff and the start of LEOP.
			</p>
		</details>
		<div class="rocket" aria-hidden="true">🚀</div>
		<div class="background" aria-hidden="true"></div>
	</article>
</section>

<style>
	section {
		margin-block: calc(2rem + 2vw);
	}

	h3 {
		max-width: var(--content-width);
		width: 100%;
		margin-inline: auto;
		padding: 0;
		margin-block-end: 0.5em;
	}

	article {
		border: 1px solid white;
		padding: 1rem;
		margin-inline: auto;
		max-width: var(--content-width);
		position: relative;

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

		opacity: 0;
		transition:
			opacity 0.4s,
			content-visibility 0.4s allow-discrete;

		--space-mid-opacity: hsla(238, 35%, 15%, 0.75);
		--gradient: linear-gradient(
			transparent 0%,
			var(--space-mid-opacity) 30%,
			var(--space-mid-opacity) 100%
		);

		@media (width > 56.25rem) {
			grid-column: 2;
			grid-row: 1 / -1;
			height: auto;

			--gradient: linear-gradient(
				transparent 0%,
				transparent 30%,
				var(--space-mid-opacity) 100%
			);
		}
	}

	details[open]::details-content {
		opacity: 1;
	}

	details:not([open])::details-content {
		display: none;

		@media (width > 56.25rem) {
			display: inherit;
		}
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
		scrollbar-color: var(--space-60) var(--space-100);
	}

	details[open] summary {
		font-weight: bold;
		pointer-events: none;

		&::before {
			content: '◯' / '';
			content: '';
			background-image: radial-gradient(white 50%, transparent 50%);
			transform: scale(0.1);
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

	article:has(details:nth-of-type(2)[open]) .rocket {
		top: 35%;
	}

	article:has(details:nth-of-type(3)[open]) .rocket {
		top: 59%;
	}

	article:has(details:nth-of-type(4)[open]) .rocket {
		top: 82.5%;
	}

	.rocket {
		display: none;
	}

	@media (width > 56.25rem) {
		.rocket {
			display: block;
			position: absolute;
			top: 12%;
			left: 1rem;
			font-size: 2rem;
			transition: 1s;
			z-index: 2;
		}

		.background {
			position: absolute;
			top: 15%;
			left: 2rem;
			bottom: 15%;
			background: white;
			width: 2px;
			z-index: 1;
		}
	}
</style>
