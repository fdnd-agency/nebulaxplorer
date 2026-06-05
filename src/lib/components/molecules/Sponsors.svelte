<script>
	import { logoAstos, logoEsatan } from '$lib'
	import Arrow from '../icons/Arrow.svelte'
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
				<img src={logoAstos} alt="" height="100" width="150" />
				<a
					href="https://www.astos.de/"
					class="paragraph"
					rel="external">
					Astos Solutions <Arrow />
				</a>
			</li>
			<li>
				<img src={logoEsatan} alt="" height="100" width="150" />
				<a
					href="https://www.esatan-tms.com/"
					class="paragraph"
					rel="external">
					Esatan-TMS <Arrow />
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
		display: grid;
		grid-template-rows: 8rem min-content;
		align-items: center;
		justify-items: center;
		padding: 0.5em;

		/* Replaces a focus/hover styles */
		/* Source: https://larsmagnus.co/blog/focus-visible-within-the-missing-pseudo-class */
		&:has(:focus-visible) {
			outline: var(--default-focus);
		}

		&:hover a {
			text-decoration: underline 1px;
		}

		/* Makes the little arrow move on hover */
		:global(svg) {
			transition: 0.2s;
		}

		&:hover :global(svg) {
			transition: 0.2s;
			transform: translateX(50%);
		}
	}

	img {
		height: auto;
		max-height: 100%;
		width: auto;
		max-width: 100%;
		padding: 0.5em;
	}

	a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5em;
		height: 100%;
		width: 100%;
		border-block-start: 1px solid var(--background-color-light);

		&:focus {
			outline: none;
			text-decoration: underline 1px;
		}
	}

	/* Makes the whole thing clickable */
	a::after {
		position: absolute;
		content: '';
		inset: 0;
	}
</style>
