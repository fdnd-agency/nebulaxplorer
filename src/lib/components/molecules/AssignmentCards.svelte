<script>
	const { assignments } = $props()
</script>

<div class="container-generic">
	<header class="assignments-header">
		<h2 class="subtitle">Find a suitable Assignment</h2>
		<p class="heading">
			Within the NEBULA Xplorer project there are
			<span>{assignments.length}</span> assignments available.
		</p>
	</header>

	<ul class="assignments-container">
		{#each assignments as assignment}
			<li class="assignment-card">
				<a href="#">
					<section class="assignment-content">
						<h2 class="assignment-title">{assignment.title}</h2>
						<div>
							<p>{assignment.study_program}</p>
							<p>{assignment.location}</p>
						</div>
					</section>
					<p class="apply-button supporting">Apply</p>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.container-generic {
		padding: 0;
	}

	.assignments-header {
		margin-bottom: 2.5rem;

		h2 {
			margin-bottom: 0.5rem;
		}

		p span {
			color: var(--cleanroom-140);
		}
	}

	.assignments-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.25rem;
		margin-bottom: 4rem;

		.assignment-card {
			list-style: none;
			background: var(--space-100-low-opacity);

			a {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
				min-height: 11.25rem;

				.assignment-content {
					padding: 1rem;
					display: inherit;
					flex-direction: inherit;
					justify-content: inherit;
					height: 100%;
					color: var(--cleanroom-10);

					.assignment-title {
						color: var(--cleanroom-140);
						margin-bottom: 1rem;
					}

					div {
						display: inherit;
						flex-direction: inherit;
						gap: 0.25rem;
						p {
							text-transform: capitalize;

							&:last-child {
								margin-bottom: 0.5rem;
							}
						}
					}

					/* For the next iteration I recommend changing the capitalization of the values in the fields on Directus instead of capitalizing them with CSS */
				}

				&:hover {
					.apply-button {
						background: var(--ultra-100);
						color: var(--cleanroom-60);
					}
				}
			}
		}

		.apply-button {
			display: inline-block;
			text-align: center;
			padding: 1rem;
			width: 100%;
			color: var(--space-100);
			background: var(--cleanroom-100);
			text-transform: uppercase;
		}
	}
</style>
