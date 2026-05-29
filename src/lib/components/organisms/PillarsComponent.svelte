<script>
	import { resolve } from '$app/paths'
	import {
		placeholder1,
		gravWaves,
		placeholder2,
		impact,
		sronOpenDay,
	} from '$lib'

	const dummydata = [
		{
			link: '/technology',
			image: {
				src: placeholder1,
				alt: '',
			},
			title: 'technology',
		},
		{
			link: '/science',
			image: {
				src: gravWaves,
				alt: '',
			},
			title: 'science',
		},

		{
			link: '/instrumentation',
			image: {
				src: placeholder2,
				alt: '',
			},
			title: 'instrumentation',
		},
		{
			link: '/education',
			image: {
				src: sronOpenDay,
				alt: '',
			},
			title: 'education',
		},
		{
			link: '/environment',
			image: {
				src: impact,
				alt: '',
			},
			title: 'environment',
		},
	]
</script>

<section>
	<div class="content-container">
		<h2 class="section-title">Pillars</h2>
		<!-- TODO: make the things inside this #each loop into a seperate component partial -->
		<ul>
			{#each dummydata as data (data.link)}
				<li class="pillar">
					<img src={data.image.src} alt={data.image.alt} />
					<a href={resolve(data.link)}> {data.title}</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	section {
		padding-inline: clamp(1rem, 5vw, 3.5rem);
		padding-block: calc(1rem + 2vw);
	}

	ul {
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-block-start: 1em;
		padding-block-end: 1.5em;
		align-items: center;
		list-style: none;

		@media (min-width: 45rem) {
			flex-direction: row;
			align-items: unset;
		}
	}

	.pillar {
		position: relative;
		margin: 5px;

		display: grid;

		align-items: center;
		grid-template-columns: clamp(1em, 30vw, 6.5em) 1fr;
		width: 100%;
		overflow: hidden;

		@media (min-width: 45rem) {
			display: flex;
			align-items: center;

			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: 0;

			flex-direction: column;
		}
	}

	.pillar img {
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		transition: 0.3s;
		position: relative;
		z-index: -1;

		@media (min-width: 45rem) {
			max-height: unset;
			max-width: unset;
		}
	}

	.pillar a {
		font-size: clamp(1em, 5vw, 1.2em);
		font-family: var(--font-heading);
		width: 100%;
		height: 100%;
		background-color: #292e6b;
		hyphens: auto;

		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: 45rem) {
			padding-block-start: 1em;
			padding-block-end: 1em;
			padding-inline: 0.5em;
			font-size: unset;
			height: 3lh;
		}
	}

	.pillar:hover,
	.pillar:focus-within {
		text-decoration: underline;

		@media (min-width: 45rem) and (prefers-reduced-motion: no-preference) {
			img {
				transform: scale(1.15);
			}
		}

		a:focus-visible {
			outline: none;
		}
	}

	.pillar:focus-within {
		outline: 0.125rem dashed var(--accent-color-dark);
	}

	a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
	}
</style>
