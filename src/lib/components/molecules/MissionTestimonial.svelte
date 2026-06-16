<script>
	let { testimonial } = $props()
</script>

<li>
	<blockquote class="paragraph">{testimonial.text}</blockquote>
	<div>
		<img src={testimonial.image} alt="" width="200" />
		<div>
			<p>{testimonial.name}</p>
			<p>{testimonial.title}</p>
		</div>
	</div>
</li>

<style>
	li {
		display: flex;
		flex-direction: column;
		container-type: inline-size;

		&:nth-of-type(even) blockquote {
			background-color: var(--accent-color-dark, hsl(14, 83%, 52%));
		}
	}

	blockquote {
		display: flex;
		gap: 0.5rem;
		padding-block: 2rem 3rem;
		padding-inline: 2.5rem 2rem;
		background-color: var(--secondary-color, hsl(235, 45%, 29%));
		border-radius: 0.5rem;
		line-height: 1.3;

		&::before {
			content: '🙶' / '';
			font-size: 2rem;
		}
	}

	blockquote + div {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		padding: 1rem;
		margin-inline: var(--spacing-large);
		margin-block-start: -1rem;
		background-color: var(--background-color-light, white);
		color: var(--text-color-dark, black);
		border-radius: 0.5rem;

		@container (width > 20rem) {
			flex-direction: row;
		}
	}

	img {
		height: 100%;
		max-width: 8rem;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 0.5rem;

		@container (width > 20rem) {
			position: absolute;
			height: calc(100% + 2rem);
			inset-inline-start: -1rem;
			inset-block-start: -1rem;
			inset-block-end: -1rem;
		}
	}

	p {
		padding-block: 0.25rem;
		padding-inline: 0.25rem;
		font-family: spaceMonoRegular, monospace;
		letter-spacing: -0.2px;
		text-align: center;

		&:first-of-type {
			font-weight: bold;
			letter-spacing: 0.4px;
		}

		@container (width > 20rem) {
			text-align: unset;
			padding-inline-start: 7rem;
		}
	}
</style>
