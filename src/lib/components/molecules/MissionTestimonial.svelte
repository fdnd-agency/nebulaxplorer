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
		grid-template-rows: 1fr 3rem;
		container-type: inline-size;
	}

	blockquote {
		background-color: var(--secondary-color, hsl(235, 45%, 29%));
		padding: 2rem;
		padding-inline-start: 3rem;
		padding-block-end: 3rem;
		border-radius: 0.5rem;
		font-size: 1rem;
		display: flex;

		&::before {
			content: '🙶' / '';
			font-size: 2rem;
			position: relative;
			transform: translateX(-50%);
		}
	}

	.testimonial-person {
		background-color: var(--background-color-light, white);
		color: var(--text-color-dark, black);
		border: var(--background-color-dark, black);
		padding: 1rem;
		border-radius: 0.5rem;
		margin-inline: 2rem;
		margin-block-start: -1rem;
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;

		@container (width > 20rem) {
			flex-direction: row;
		}
	}

	p {
		font-family: spaceMonoRegular, monospace;
		letter-spacing: -0.2px;
		padding: 0.25rem;
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
			left: -1rem;
			height: calc(100% + 1rem);
			top: -0.5rem;
			bottom: -0.5rem;
		}
	}
</style>
