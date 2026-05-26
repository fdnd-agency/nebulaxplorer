<script>
	let { testimonial } = $props()
</script>

<li>
	<blockquote>{testimonial.text}</blockquote>
	<div class="testimonial-person">
		<img src={testimonial.image} alt="" width="200" />
		<div>
			<p class="testimonial-name">{testimonial.name}</p>
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
		padding: 2rem 2rem 3rem 2.5rem;
		background-color: var(--secondary-color, hsl(235, 45%, 29%));
		border-radius: 0.5rem;
		
		&::before {
			content: '🙶' / '';
			font-size: 2rem;
		}
	}

	.testimonial-person {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 1rem;
		margin-inline: 2rem;
		margin-block-start: -1rem;
		background-color: var(--background-color-light, white);
		color: var(--text-color-dark, black);
		border-radius: 0.5rem;
	
		@container (width > 20rem) {
			flex-direction: row;
			align-items: center;
		}
	}

	p {
		padding: 0.25rem;
		font-family: spaceMonoRegular, monospace;
		letter-spacing: -0.2px;
		text-align: center;

		@container (width > 20rem) {
			text-align: unset;
			padding-inline-start: 7rem;
		}
	}

	.testimonial-name {
		font-weight: bold;
		letter-spacing: 0.4px;
	}

	img {
		height: 100%;
		max-width: 8rem;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 0.5rem;

		@container (width > 20rem) {
			position: absolute;
			height: calc(100% + 1rem);
			left: -1rem;
			top: -0.5rem;
			bottom: -0.5rem;
		}
	}
</style>
