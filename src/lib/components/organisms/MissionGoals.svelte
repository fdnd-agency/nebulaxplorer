<!-- Goals BLOCK -->

<section class="goals-block">
	<div class="content-container">
		<div class="goals-grid">
			<div class="goal-box">
				<div class="goal-title">SCIENTIFIC GOAL</div>
				<p>
					Better understand how a black hole strips material from an
					orbiting companion star and how the resulting jets of energy
					are formed.
				</p>
			</div>

			<div class="goal-box">
				<div class="goal-title">EDUCATIONAL GOAL</div>
				<p>
					Give students from Dutch educational institutions a
					first-hand experience of building a space mission from the
					ground up.
				</p>
			</div>
		</div>
	</div>
</section>


<style>
	/* GOALS BLOCK */

	.goals-block {
		background-color: var(--white);
		color: var(--space-100);
		padding: 2rem 0;
	}

	.goals-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.goal-box {
		position: relative;
		padding: 1.5rem;
		background: var(--space-100);
		color: var(--white);
	}

	/* orange line */
	.goal-box::before {
		content: '';
		position: absolute;
		top: -1px;
		left: -1px;
		width: 40px;
		height: 2px;
		background: var(--cleanroom-100);
	}

	.goal-title {
		font-size: 0.9rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		color: var(--cleanroom-100);
		margin-bottom: 0.75rem;
	}

	.goal-box p {
		color: var(--white);
		line-height: 1.6;
	}

	@media (min-width: 36.25rem) {
		.goals-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.goal-box {
			padding: 2rem;
		}
	}

	@media (min-width: 56.25rem) {
		.goals-grid {
			grid-column: 1 / -1;
			gap: 2rem;
		}
	}
    </style>