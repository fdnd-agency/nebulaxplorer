<section>
	<details name="timeline" open>
		<summary>Stap 1</summary>
		<article>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
			blanditiis error officiis? Dignissimos vitae vero, magnam
			perferendis rerum eum hic ex sequi nihil inventore nulla eius dolore
			minus voluptate iusto?
		</article>
	</details>
	<details name="timeline">
		<summary>Stap 2</summary>
		<article>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
			quidem cum aut beatae quaerat esse! Doloremque, nam magnam?
			Repudiandae, velit. Vero minima, odit veritatis delectus officiis
			error magni aperiam saepe.
		</article>
	</details>
	<details name="timeline">
		<summary>Stap 3</summary>
		<article>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
			numquam nulla nobis quasi cupiditate delectus quisquam vitae,
			accusamus tempore odio tenetur rerum aspernatur eos labore quae odit
			illo maiores sapiente.
		</article>
	</details>
	<details name="timeline">
		<summary>Stap 4</summary>
		<article>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
			soluta eius dolorum error reprehenderit, aspernatur in temporibus ad
			praesentium hic vitae molestias perferendis itaque sed placeat
			provident fugit expedita alias.
		</article>
	</details>
	<details name="timeline">
		<summary>Stap 5</summary>
		<article>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
			delectus voluptatum dolor laboriosam maxime sit repellat quidem
			ipsam perferendis reiciendis qui fugit, illum cumque dolores, sint,
			a error deserunt dolorem!
		</article>
	</details>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: repeat(5, 1fr);
		max-width: var(--content-width);
	}

	details {
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}

	details::details-content {
		grid-column: 2;
		grid-row: 1 / -1;
		padding: 1rem;
	}

	details:not([open])::details-content {
		display: none;
	}

	summary {
		grid-column: 1;
		display: grid;
		padding: 1rem;
		cursor: pointer;
		z-index: 1;
	}

	details[open] summary {
		font-weight: bold;
	}

	details:nth-of-type(1) summary {
		grid-row: 1 / span 1;
	}

	details:nth-of-type(2) summary {
		grid-row: 2 / span 1;
	}

	details:nth-of-type(3) summary {
		grid-row: 3 / span 1;
	}

	details:nth-of-type(4) summary {
		grid-row: 4 / span 1;
	}

	details:nth-of-type(5) summary {
		grid-row: 5 / span 1;
	}
</style>
