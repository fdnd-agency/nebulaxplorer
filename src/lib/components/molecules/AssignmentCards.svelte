<script>
	import { resolve } from '$app/paths'

	const { assignments } = $props()
</script>

<section class="reveal">
	<div class="content-container">
		<header class="assignments-header">
			<h2 class="subtitle">
				Find a <span class="orange">suitable</span> assignment
			</h2>
			<p class="heading">
				Within the NEBULA-Xplorer project there are
				<span class="orange">{assignments.length}</span> assignments available.
			</p>
		</header>

		<ul class="assignments-container reveal">
			{#each assignments as assignment (assignment.id)}
				<li class="assignment-card">
					<section class="assignment-content">
						<a href={resolve(`/assignments/${assignment.id}`)}>
							<h3 class="assignment-title">{assignment.title}</h3>
						</a>
						<div>
							<p>{assignment.study_program}</p>
							<p>{assignment.location}</p>
						</div>
					</section>
					<p class="apply-button supporting">Apply</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.assignments-header {
		margin-block-end: 2.5rem;

		h2 {
			margin-block-end: 0.5rem;
		}
	}

	.assignments-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 1.25rem;
		margin-block-end: 4rem;
	}

	.assignment-card {
		list-style: none;
		background: var(--space-100-low-opacity);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		min-height: 11.25rem;

		&:focus-within {
			outline: var(--default-focus);
		}

		&:hover .apply-button,
		&:focus-within .apply-button {
			background: var(--secondary-color);
			color: var(--accent-color-light);
		}
	}

	.assignment-content {
		padding-block: 1rem;
		padding-inline: 1rem;
		display: inherit;
		flex-direction: inherit;
		justify-content: inherit;
		height: 100%;
		color: var(--cleanroom-10);
		position: relative;

		div {
			display: inherit;
			flex-direction: inherit;
			gap: 0.25rem;
			padding-bottom: 0.5rem;
			text-transform: capitalize;
		}

		/* For the next iteration I recommend changing the capitalization of the values in the fields on Directus instead of capitalizing them with CSS */

		a {
			outline: none;
		}

		a::after {
			content: '';
			inset: 0;
			position: absolute;
		}
	}

	.assignment-title {
		font-size: 1.5rem;
		color: var(--accent-color-dark);
		margin-block-end: 1rem;
	}

	.apply-button {
		display: inline-block;
		text-align: center;
		padding-block: 1rem;
		padding-inline: 1rem;
		width: 100%;
		color: var(--text-color-dark);
		background: var(--accent-color);
		text-transform: uppercase;
	}
</style>
