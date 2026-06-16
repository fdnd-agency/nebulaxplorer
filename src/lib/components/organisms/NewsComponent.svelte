<script>
	import { resolve } from '$app/paths'
	import { nebulaSatellite as defaultImage } from '$lib'

	let { newsCards } = $props()
</script>

<section class="background-light">
	<div class="content-container">
		<h2 class="section-title">Mission Updates</h2>
		<ul class="newscard-container">
			{#each newsCards as newscard (newscard.id)}
				<li class="newscard">
					<img
						src={newscard.image
							? `https://fdnd-agency.directus.app/assets/${newscard.image}`
							: defaultImage}
						alt=""
						height="240"
						width="240" />
					<h3>
						<a href={resolve(`/news/${newscard.id}`)}
							>{newscard.title}</a>
					</h3>
					<p>{newscard.type}</p>
				</li>
			{/each}
		</ul>
		<a href={resolve('/news')} class="paragraph link-readmore">Read More</a>
	</div>
</section>

<style>
	section {
		padding-block-start: var(--spacing-medium-variable);
		background-color: var(--background-color-light);
		padding-inline: clamp(1rem, 6vw, 3.5rem);
		border-bottom: var(--accent-color) 0.5rem solid;
	}

	h2 {
		color: var(--ultra-140);
		background-color: var(--background-color-light);
		padding-block: 0.5em 1em;
	}

	.newscard-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-template-rows: fit-content;
		gap: var(--spacing-large);
		list-style: none;
	}

	.newscard {
		position: relative;
		background-color: var(--background-color-light);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		align-self: start;

		&:hover,
		&:focus-within {
			box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);

			a {
				text-decoration: underline 1px;
			}
		}

		&:focus-within {
			outline: var(--default-focus);
			outline-offset: 12px;
		}

		@media (prefers-reduced-motion: no-preference) {
			&:hover,
			&:focus-within {
				transform: translateY(-0.5rem);
			}
		}
	}

	img {
		width: 100%;
		height: 15rem;
		overflow: hidden;
		margin-block-start: auto;

		aspect-ratio: 1 / 1;
		object-fit: cover;
		object-position: center;
	}

	h3 {
		font-family: var(--font-heading);
		font-weight: 400;
		font-size: 1.3rem;
		line-height: 1.75rem;
		color: var(--ultra-140);
		padding-block: 1rem;
		padding-inline: clamp(0.75rem, 0.25rem + 1.1vw, 1rem);

		a {
			outline: none;
		}

		a::after {
			content: '';
			position: absolute;
			inset: 0;
		}
	}

	p {
		font-family: var(--font-heading);
		font-weight: 900;
		font-size: 1.2rem;
		color: var(--accent-color-dark);
		padding-block: 1rem;
		padding-inline: clamp(0.75rem, 0.25rem + 1.1vw, 1rem);
	}

	.link-readmore {
		display: block;
		padding-block: 1rem;
		padding-inline: 1rem;
		margin-block: 1em 0;
		margin-inline: auto;
		width: max-content;

		font-family: var(--font-paragraph);
		font-weight: 500;
		text-align: center;
		text-transform: uppercase;
		color: var(--accent-color-dark);

		&:hover {
			text-decoration: underline 1px;
		}

		@media (prefers-reduced-motion: no-preference) {
			transition: transform 0.3s ease;

			&:hover {
				transform: translateY(-0.5rem);
			}
		}
	}
</style>
