<script>
	import { logoAstos, logoEsatan } from '$lib'
</script>

<section>
	<div class="content-container">
		<h3 class="subheading">Our Sponsors</h3>
		<p class="paragraph">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit.
			Reprehenderit deleniti rem adipisci ad soluta itaque. Delectus fugit
			sit cum perspiciatis fugiat, ipsum repellendus cupiditate deserunt
			laboriosam maxime labore autem eum!
		</p>
		<ul>
			<li>
				<a href="https://www.astos.de/">
					<img
						src={logoAstos}
						alt="Astos Solutions"
						height="100"
						width="150" />
				</a>
			</li>
			<li>
				<a href="https://www.esatan-tms.com/">
					<img
						src={logoEsatan}
						alt="Esatan-TMS"
						height="100"
						width="150" />
				</a>
			</li>
		</ul>
	</div>
</section>

<style>
	h3 {
		margin-block-end: 1rem;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		margin-block: 2rem;
		list-style: none;
	}

	li {
		position: relative;
		height: 10rem;
		padding: 1em;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--space-140);

		&:focus-within {
			outline: var(--default-focus);
		}
	}

	img {
		height: auto;
		max-height: 10rem;
		width: auto;
		max-width: 100%;
		transition: 0.3s;
	}

	a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	a:focus,
	a:focus-visible {
		outline: none;
	}

	a:hover img {
		transform: scale(1.1);
	}
</style>
