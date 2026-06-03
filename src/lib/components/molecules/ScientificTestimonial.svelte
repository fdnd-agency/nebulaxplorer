<script>
	import { rushilImage } from '$lib'
</script>

<section>
	<div class="container">
		<img src={rushilImage} alt="" />
		<div class="info-container">
			<h3 class="subheading">Rushil Varsnney</h3>
			<p>Aero Space Engineering, TU Delft</p>
		</div>
		<article class="blockquote-container">
			<h3 class="subheading">Rushil Varsnney</h3>
			<p>Aero Space Engineering, TU Delft</p>
			<blockquote class="paragraph">
				The project all corporate projects wish they could be. The place
				where agile is actually agile. Heed my words, dear reader - this
				project will serve as valuable experience of the things that can
				be done right. This was a great experience! Lorem ipsum dolor,
				sit amet consectetur adipisicing elit. Aspernatur optio maiores
				quas natus nesciunt ea modi, nihil harum accusantium veniam enim
				culpa rerum sequi magnam officia. Vero asperiores aspernatur
				dicta.
			</blockquote>
		</article>
	</div>
</section>

<style>
	section {
		margin-block: 1.5rem;
		padding-inline: 0;
	}

	.container {
		margin-inline: auto;
		display: grid;
		width: max-content;
		max-width: min(1000px, 100%);

		grid-template-columns: 5vw 1fr;
		grid-template-rows: max-content 1rem 1fr;

		@media (width > 700px) {
			grid-template-columns: max-content 2rem 1fr;
			grid-template-rows: 5rem 1fr 2rem;
		}
	}

	img {
		width: clamp(20rem, 17.5rem + 11.5vw, 25rem);
		height: clamp(20rem, 17.5rem + 11.5vw, 25rem);
		max-width: 100%;
		object-fit: cover;
		position: relative;
		grid-column: 1 / 3;
		grid-row: 1 / 3;
	}

	.blockquote-container {
		background-color: var(--accent-color);
		border-radius: 60px 0;
		max-width: 30rem;
		margin-inline-end: 1rem;
		padding: clamp(1.5rem, 0.85rem + 3.5vw, 3rem);
		grid-column: 2 / 3;
		grid-row: 2 / 4;

		h3,
		p {
			display: block;
		}

		h3 {
			margin-inline: 0;
			margin-block-start: 0.5em;
		}

		p {
			margin-block-end: 1em;
		}

		@media (width > 700px) {
			border-radius: 100px 0;
			grid-column: 2 / -1;
			grid-row: 2 / -1;
			padding-inline-start: 4rem;
			margin-inline-end: 0;

			h3,
			p {
				display: none;
			}
		}
	}

	.info-container {
		grid-column: 3 / 4;
		grid-row: 1;
		align-self: center;
		margin-inline-start: 2rem;
		display: none;

		@media (width > 700px) {
			display: block;
		}
	}

	blockquote {
		font-family: var(--font-paragraph);
		color: var(--text-color-dark);
		margin-block-end: 1em;

		&::before {
			content: open-quote;
		}

		&::after {
			content: close-quote;
		}
	}
</style>
