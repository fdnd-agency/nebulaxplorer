<script>
	let { colorScheme = 'light' } = $props()
</script>

<section
	class="goals-block {colorScheme == 'light'
		? 'background-light'
		: 'background-dark'}"
	class:dark={colorScheme === 'dark'}>
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
		background-color: var(--background-color-light);
		color: var(--text-color-dark);
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
		background: var(--background-color-dark);
		color: var(--text-color-light);
	}

	.goals-block.dark {
		background-color: var(--background-color-dark);
		color: var(--text-color-light);
	}

	.goals-block.dark .goal-box {
		color: var(--background-color-dark);
		border: 1px solid var(--accent-color);
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
		background: var(--accent-color);
	}

	.goal-box h3 {
		font-size: 0.9rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		color: var(--accent-color);
		margin-bottom: 0.75rem;
		text-transform: uppercase;
	}

	.goal-box p {
		color: var(--text-color-light);
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
