<script>
	import {
		sronLeidenEnhanced as leidenImg,
		sronGroningenEnhanced as groningenImg,
	} from '$lib'
</script>

<ul class="locations">
	<li>
		<h2>Leiden</h2>
		<enhanced:img src={leidenImg} alt="The SRON building in Leiden" />
		<ul class="contact paragraph">
			<li>Niels Bohrweg 4</li>
			<li class="divider"></li>
			<li>2333 CA Leiden</li>
			<li class="divider"></li>
			<li>The Netherlands</li>
			<li class="divider"></li>
			<li><a href="tel:+31887775600">+31 (0)88 777 56 00</a></li>
		</ul>
	</li>
	<li>
		<h2>Groningen</h2>
		<enhanced:img src={groningenImg} alt="The SRON building in Groningen" />
		<ul class="contact paragraph">
			<li>Landleven 12</li>
			<li class="divider"></li>
			<li>9747 AD Groningen</li>
			<li class="divider"></li>
			<li>The Netherlands</li>
			<li class="divider"></li>
			<li><a href="tel:+31503634074">+31 (0)50 363 40 74</a></li>
		</ul>
	</li>
</ul>

<style>
	.locations {
		list-style: none;
		display: flex;
		flex-direction: column;

		@media (min-width: 600px) {
			flex-direction: row;
		}

		border-top: 0.375rem solid var(--accent-color);
		background: var(--background-color-dark);
		padding: 0;
		position: relative;

		background: var(--secondary-color);
		gap: 1.5rem;
		padding-left: 1.5rem;

		> li {
			container-type: inline-size;
			container-name: location-info;

			position: relative;
			background: inherit;
			width: 100%;
			display: inline-block;
			overflow: hidden;
			overflow: clip;

			h2 {
				background: inherit;
				position: absolute;
				inset-block-start: -0.0625rem;
				inset-inline-start: 0;
				transform: translateX(-100%) rotate(-90deg);
				transform-origin: right top;
				padding: 1rem 2rem;
			}

			enhanced\:img {
				width: 100%;
				height: auto;
				max-height: 500px;
				display: block;
				object-fit: cover;
			}
		}
	}

	.contact {
		display: flex;
		flex-direction: column;
		gap: 0.5rem 0;
		max-width: 100%;
		margin-block: 1rem;
		position: relative;
		margin-right: 2.25rem;
		justify-content: space-between;

		&::after {
			content: '';
			position: absolute;
			height: 100%;
			width: 0.125rem;
			background: var(--accent-color);
			inset-block-start: 50%;
			inset-inline-start: 50%;
			transform: translate(-50%, -50%);
			display: none;
		}

		@media (min-width: 56.25rem) {
			align-items: center;
		}

		@supports not (container-type: inline-size) {
			@media (min-width: 26.25rem) {
				gap: 0.5rem 0;
				display: grid;
				grid-template: 1fr 1fr / 1fr 1fr;

				&::after {
					display: block;
				}
			}

			@media (min-width: 90.625rem) {
				display: flex;
				flex-direction: row;
				gap: unset;

				&::after {
					display: none;
				}
			}
		}

		li {
			display: inline;
			line-height: inherit;
			width: fit-content;
			position: relative;

			&.divider {
				background: var(--accent-color);
				width: 0.125rem;
				/* Make it as big as the text */
				height: 1em;
				display: none;
			}

			&:nth-child(3),
			&:nth-child(7) {
				justify-self: end;
			}

			@supports not (container-type: inline-size) {
				@media (min-width: 90.625rem) {
					&.divider {
						display: inline-block;
					}
				}
			}
		}
	}

	/* If container queries are not supported; they won't display anyway */
	/* Horizontal list with lines (divider) */
	@container location-info (min-width: 43.75rem) {
		.contact {
			display: flex;
			flex-direction: row;
			align-items: center;

			li.divider {
				display: inline-block;
			}
		}
	}

	/* Two column & row grid */
	@container location-info (min-width: 21.875rem) and (max-width: 43.75rem) {
		.contact {
			display: grid;
			grid-template: 1fr 1fr / 1fr 1fr;

			&::after {
				display: block;
			}

			li.divider {
				display: none;
			}
		}
	}

	/* Vertical list */
	@container location-info (max-width: 21.875rem) {
		.contact {
			display: flex;
			flex-direction: column;
		}
	}
</style>
