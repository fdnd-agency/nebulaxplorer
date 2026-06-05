<header>
	<h1>Impact of NEBULA-Xplorer</h1>
	<div class="impact-stats-container">
		<div class="impact-stats">
			<h3>~100</h3>
			<span>Students involved</span>
		</div>

		<div class="impact-stats">
			<h3>14</h3>
			<span>Dutch universities involved</span>
		</div>

		<div class="impact-stats">
			<h3>In development</h3>
			<span>X-Ray instrument</span>
		</div>

		<div class="impact-stats">
			<h3>1</h3>
			<span>Satellite mission</span>
		</div>
	</div>
</header>

<style>
	header {
		padding-block: 3rem;
		padding-inline: 2rem;
	}

	h1 {
		margin-block-end: 3rem;
	}

	.impact-stats-container {
		display: flex;
		flex-direction: column;
	}

	.impact-stats {
		padding: 1.5rem 2rem;
		border-inline-start: 1px solid var(--light-grey);
		border-inline-end: 1px solid var(--light-grey);

		h3 {
			color: var(--accent-color);
			font-weight: 500;
			margin-block-end: 1rem;
			font-size: medium;
		}

		span {
			color: var(--light-grey);
			font-size: larger;
		}
	}

	@media (min-width: 48rem) {
		.impact-stats-container {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 0;
			margin-block: 0;
			margin-inline: auto;
		}

		.impact-stats {
			text-align: left;
			padding: 1.5rem 2rem;
			border-inline-start: 1px solid var(--light-grey);

			h3 {
				color: var(--accent-color);
				font-weight: 500;
				margin-block-end: 1rem;
				font-size: medium;
			}

			span {
				color: var(--light-grey);
				font-size: larger;
			}
		}

		.impact-stats:first-child {
			border-left: none;
		}
	}
</style>
