<script>
	import { placeholder1, gravWaves as gravwaves, placeholder2 } from '$lib'

	const dummydata = [
		{
			link: '#',
			image: {
				src: placeholder1,
				alt: '',
			},
			title: 'technology',
		},
		{
			link: '#',
			image: {
				src: gravwaves,
				alt: '',
			},
			title: 'science',
		},

		{
			link: '#',
			image: {
				src: placeholder2,
				alt: '',
			},
			title: 'instrumentation',
		},
		{
			link: '#',
			image: {
				src: placeholder1,
				alt: '',
			},
			title: 'placeholder',
		},
		{
			link: '#',
			image: {
				src: placeholder1,
				alt: '',
			},
			title: 'lorem ipsum',
		},
	]
</script>

<section>
	<div class="content-container">
		<h2 class="section_title">Pillars</h2>
		<!-- TODO: make the things inside this #each loop into a seperate component partial -->
		<ul>
			{#each dummydata as data}
				<li class="pillar">
					<img src={data.image.src} alt={data.image.alt} />
					<a href={data.link}> {data.title}</a>
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

		@media (min-width: 600px) {
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

		@media (min-width: 600px) {
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

		@media (min-width: 600px) {
			max-height: unset;
			max-width: unset;
		}
	}

	.pillar a {
		font-size: clamp(1em, 5vw, 1.2em);
		font-family: var(--heading);
		width: 100%;
		height: 100%;
		background-color: #292e6b;

		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: 600px) {
			padding-block-start: 1em;
			padding-block-end: 1em;
			font-size: unset;
			text-wrap: nowrap;
			height: auto;
		}
	}

	.pillar:hover,
	.pillar:focus-within {
		text-decoration: underline;

		@media (min-width: 600px) and (prefers-reduced-motion: no-preference) {
			img {
				transform: scale(1.15);
			}
		}

		a:focus-visible {
			outline: none;
		}
	}

	.pillar:focus-within {
		outline: 0.125rem dashed var(--cleanroom-140);
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
