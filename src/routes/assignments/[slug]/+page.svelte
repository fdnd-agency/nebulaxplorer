<script>
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
				<li>{data.assignment.location}</li>
				<li>{data.assignment.organisation}</li>
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
	<p>Assignment not found.</p>
	<a href="/assignments">Go back to overview?</a>
{/if}

<style>
	.content-container {
		padding: 0;
	}

	section {
		padding-block: calc(1em + 1vw);
	}

	ul {
		display: flex;
		list-style: none;
		gap: 1em;
		margin-block: 1rem;
	}

	li {
		text-transform: uppercase;
		font-family: var(--subtext);
		color: var(--cleanroom-100);
	}

	.section-details {
		background-color: var(--white);
		color: black;
		padding-block: calc(1em + 1vw);
	}

	h3 {
		color: var(--ultra-100);
		padding-block: 0.5em;
	}

	p {
		margin-block: 0.5em;
	}
</style>
