<script>
	import { resolve } from '$app/paths'
	import { Breadcrumb, Hero } from '$lib'
	let { data } = $props()
</script>

<Hero pageTitle="Assignment" />

<Breadcrumb />

{#if data.assignment}
	<section class="section-overview">
		<div class="content-container">
			<h2 class="section_title">{data.assignment.title}</h2>
			<ul>
				<li>
					<span class="white">Location: </span>{data.assignment
						.location}
				</li>
				<li>
					<span class="white">organisation: </span>{data.assignment
						.organisation}
				</li>
				<li>
					<span class="white">Your study: </span>{data.assignment
						.study_program[0]}
				</li>
			</ul>
		</div>
	</section>
	<section class="section-details">
		<div class="content-container">
			<h3 class="heading">Your Position</h3>
			<p class="paragraph">{data.assignment.summary}</p>
			<p class="paragraph">{data.assignment.description}</p>
		</div>
	</section>
{:else}
	<section class="content-container error">
		<h2 class="section_title">Assignment not found.</h2>
		<a href={resolve('/assignments')}>Go back to overview?</a>
	</section>
{/if}

<style>
	.content-container {
		padding-inline: 0;
	}

	section {
		padding-block: calc(1em + 1vw);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		gap: 0.5em;
		padding-inline-start: 1rem;
		margin-block: 1rem;

		@media (min-width: 400px) {
			list-style: none;
			flex-direction: row;
			gap: 2em;
			padding-inline-start: 0;
		}
	}

	li {
		text-transform: uppercase;
		font-family: var(--font-subtext);
		color: var(--accent-color);
		line-height: 1.4;
	}

	li::marker {
		color: var(--text-color-light);
	}

	.section-details {
		background-color: var(--background-color-light);
		color: var(--text-color-dark);
		padding-block: calc(1em + 1vw);
	}

	h3 {
		color: var(--secondary-color);
		padding-block: 0.5em;
	}

	p {
		margin-block: 0.5em;
	}

	a {
		color: var(--accent-color);
		display: block;
		padding-block: 1em;

		&:hover {
			text-decoration: underline;
		}
	}

	.white {
		color: var(--text-color-light);
		margin-right: 1ch;
	}

	.error {
		margin-block: 2em;
	}
</style>
