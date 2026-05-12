<script>
	let { colorScheme = 'light' } = $props()
</script>

<section class="goals-block" class:dark={colorScheme === 'dark'}>
	<h2 class="visually-hidden">Mission Goals</h2>
	<div class="content-container">
		<div class="goals-grid">
			<section class="goal-box">
				<h3>Scientific Goal</h3>
				<p>
					Better understand how a black hole strips material from an
					orbiting companion star and how the resulting jets of energy
					are formed.
				</p>
			</section>

			<section class="goal-box">
				<h3>Educational Goal</h3>
				<p>
					Give students from Dutch educational institutions a
					first-hand experience of building a space mission from the
					ground up.
				</p>
			</section>
		</div>
	</div>
</section>

<style>
	.goals-block {
		background-color: var(--white);
		color: var(--space-100);
		padding: 2rem;
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

	.goals-block.dark {
		background-color: var(--space-100);
		color: var(--white);
	}

	.goals-block.dark .goal-box {
		color: var(--space-100);
		border: 1px solid var(--cleanroom-100);
	}

	.goals-block.dark .goal-box::before {
		display: none;
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

	.goal-box h3 {
		font-size: 0.9rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		color: var(--cleanroom-100);
		margin-bottom: 0.75rem;
		text-transform: uppercase;
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
			gap: 2rem;
		}
	}
</style>
