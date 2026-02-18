<section>
	<div>
		<h2 class="section_title">Subscribe to our mailing list</h2>
		<p class="paragraph">
			to receive news and updates about our research and activities.
		</p>
		<form>
			<label for="email">
				<span class="visually-hidden">Email</span>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email address..."
					autocomplete="email"
					required />
			</label>
			<button type="submit">Subscribe</button>
		</form>
	</div>
</section>

<style>
	section {
		margin-bottom: 3rem;
	}

	div {
		max-width: 1000px;
		margin-inline: auto;
		border: 1px solid var(--cleanroom-100);
		border-radius: 50px 0;
		padding-block: 2rem;
		padding-inline: clamp(1rem, 0.25rem + 4vw, 5rem);
		container-type: inline-size;
	}

	h2 {
		color: var(--cleanroom-100);
		margin-block: 0.25em;
	}

	p {
		font-family: var(--paragraph);
	}

	form {
		width: 100%;
		margin-block: 1.5rem;

		display: grid;
		grid-template-columns: 1fr max-content;
		grid-template-rows: 3lh;
		grid-auto-rows: 3lh;

		@container (width < 300px) {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}

	label {
		width: 100%;
		border: 1px solid white;

		&:focus-within {
			outline: var(--default-focus);
			outline-offset: 4px;
		}
	}

	input[type='email'] {
		height: 100%;
		width: 100%;
		padding-inline: 1em;
		background-color: transparent;
		background: linear-gradient(
			to right,
			var(--space-100) 80%,
			var(--space-160)
		);

		&::placeholder {
			color: rgba(255, 255, 255, 0.7);
		}
	}

	button {
		appearance: none;
		height: 100%;
		background-color: white;
		border: 1px solid white;
		color: black;
		padding-inline: 1em;
		transition:
			background-color 0.2s,
			color 0.2s;

		&:focus-visible {
			outline: var(--default-focus);
			outline-offset: 4px;
		}

		&:hover,
		&:focus-visible {
			background-color: transparent;
			color: white;
			border-left: 1px solid white;
		}
	}
</style>
