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
		display: flex;
		flex-direction: row;
		gap: 1rem;
		flex-wrap: wrap;
		list-style: none;
		margin-block: 2rem;
	}

	img {
		height: auto;
		max-height: 10rem;
		width: auto;
		max-width: 100%;
		transition: 0.3s;
	}

	a:hover img {
		transform: scale(1.05);
	}
</style>
