<script>
	import { rushilImage } from '$lib'

	let { testimonial } = $props()
</script>

<section>
	<div class="container">
		<img src={rushilImage} alt="" />
		<blockquote>
			Scientific lorem ipsum dolor sit amet consectetur adipisicing elit.
			Dolorem nihil inventore pariatur quasi nemo sint dolore optio.
			Quaerat in, sapiente, reprehenderit quas provident nemo optio autem
			distinctio, soluta consectetur molestias.
		</blockquote>
	</div>
</section>

<style>
	section {
		width: 100%;
		margin: -1.5rem;
	}

	div {
		margin-inline: auto;
		display: grid;

		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1rem 1fr;

		@media (width > 700px) {
			grid-template-columns: max-content 2rem 1fr;
			grid-template-rows: 1fr 2fr 1fr;
		}
	}

	img {
		/* width: 20em; */
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		position: relative;
		grid-column: 1 / 2;
		grid-row: 1 / 3;

		@media (width > 700px) {
			grid-column: 1 / 3;
			grid-row: 1 / 3;
		}
	}

	blockquote {
		background-color: var(--cleanroom-100);
		border-radius: 50px 0;
		/* width: 20em; */
		max-width: 100%;
		padding: 2rem;
		margin-inline: 1rem;
		font-size: clamp(1rem, 0.85rem + 0.8vw, 1.25rem);

		grid-column: 1 / 2;
		grid-row: 2 / 4;
		justify-self: end;

		@media (width > 700px) {
			grid-column: 2 / -1;
			grid-row: 2 / -1;
			justify-self: start;
		}
	}
</style>
