<script>
	import {
		sronLeidenEnhanced as leidenImg,
		sronGroningenEnhanced as groningenImg,
		sronAcademyLogoOnSpaceBlue as SRON_Academy_OnSpaceBlue,
		sronLogoFullWhite as SRON_full_white,
		nwoIcon as NwoIcon,
		Instagram as InstagramIcon,
		LinkedIn as LinkedinIcon,
		Bsky as BskyIcon,
		Arrow,
	} from '$lib'

	const { navItems } = $props()
</script>

<footer>
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
			<enhanced:img
				src={groningenImg}
				alt="The SRON building in Groningen" />
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
	<div class="contents">
		<div class="contents-nav">
			<img src={SRON_Academy_OnSpaceBlue} alt="SRON Academy logo" />
			<nav>
				<ul class="link">
					{#each navItems as { path, label }}
						<li>
							<a href={path}>{label}</a>
						</li>
					{/each}
					<li><a href="/">privacy</a></li>
				</ul>
			</nav>
		</div>
		<div class="additional">
			<form>
				<label class="link">
					Subscribe to our mailing list to receive news and updates
					about our research and activities.
					<input class="supporting" type="email" />
				</label>
				<button
					><Arrow width="12" height="20" /><span
						class="visually-hidden">Submit</span
					></button>
			</form>
			<div class="socials">
				<img src={SRON_full_white} alt="SRON full white logo" />
				<div class="group">
					<a href="/">
						<LinkedinIcon />
						<span class="visually-hidden">Linkedin profile</span>
					</a>
					<a href="/">
						<InstagramIcon />
						<span class="visually-hidden">Instagram profile</span>
					</a>
					<a href="/">
						<BskyIcon />
						<span class="visually-hidden">Bluesky profile</span>
					</a>
				</div>
			</div>
		</div>
	</div>
	<p class="footnote supporting">What happens up there, starts down here.</p>
</footer>

<style>
	footer {
		border-top: 0.375rem solid var(--cleanroom-100);
		background: var(--space-100);
		padding: 0;
		position: relative;

		ul {
			background: var(--ultra-100);
			list-style: none;
			padding: 0;
			display: flex;
			flex-direction: column;

			@media (min-width: 56.25rem) {
				flex-direction: row;
			}

			&.locations {
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
						top: -0.0625rem;
						left: 0;
						transform: translateX(-100%) rotate(-90deg);
						transform-origin: right top;
						padding: 1rem 2rem;
					}

					picture {
						display: contents;

						enhanced\:img {
							width: 100%;
							height: auto;
							display: block;
							object-fit: cover;
						}
					}
				}
			}

			&.contact {
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
					background: var(--cleanroom-100);
					top: 50%;
					left: 50%;
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
						background: var(--cleanroom-100);
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
		}

		.contents {
			background: var(--space-100);
			padding: 2.25rem 1.5rem;
			display: flex;
			gap: 4rem;
			flex-wrap: wrap;
			justify-content: space-between;

			.contents-nav {
				img {
					width: 100%;
					max-width: 20rem;
					margin-bottom: 1.5rem;
				}
			}

			nav {
				display: contents;

				ul {
					border-top: 0.1875rem solid var(--white);
					padding-top: 0.75rem;
					width: inherit;
					background: unset;
					flex-direction: column;
					max-height: calc(5.5em + 0.75rem + (4 * 0.5rem));
					flex-wrap: wrap;
					gap: 0.5rem 2rem;

					/* If more links get added, be sure to remove or adjust this; if necessary */
					li {
						display: contents;

						&:is(:nth-child(5n + 5), :last-child) {
							color: var(--cleanroom-30);
						}

						&:hover {
							color: var(--cleanroom-60);
						}

						@supports selector(a:has(b)) {
							/* Nice inspo https://tobiasahlin.com/blog/previous-sibling-css-has/ */
							&:hover + li,
							&:has(+ li:hover) {
								color: var(--cleanroom-60);
							}
						}

						a {
							display: inline;
							width: fit-content;

							transition: color 0.3s ease;

							&:hover {
								color: var(--cleanroom-100);
							}

							&:active {
								color: var(--cleanroom-140);
							}
						}
					}
				}
			}
		}

		.additional {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			gap: 4rem;
			max-width: 400px;
			width: 100%;

			form {
				position: relative;
				max-width: 25rem;
				width: 100%;

				label {
					display: block;

					input {
						border: 1px solid var(--white);
						border-right: unset;
						height: 2.5rem;
						padding: 16px 8px;
						margin-top: 1.5rem;
						background: linear-gradient(
							to right,
							var(--space-100) 90%,
							var(--space-160)
						);
						background-size: 200% 100%;
						background-position: 100% 0%;
						width: 90%;

						transition: background-position 0.75s ease;
					}
				}

				button {
					cursor: pointer;
					position: absolute;
					bottom: 0;
					right: 0;
					width: 2.5rem;
					aspect-ratio: 1;
					color: var(--space-100);
					display: grid;
					place-content: center;
				}

				input:focus-visible,
				button:focus-visible {
					outline-offset: -0.125rem;
					outline-style: solid;
					outline-width: 0.125rem;
					outline-color: var(--cleanroom-100);
					background-position: 0% 0%;
				}
			}

			.socials {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.group {
					grid-row: 2;
					grid-column: span 2;
					border-top: 0.1875rem solid var(--white);
					display: flex;
					flex-direction: row;
					padding-top: 1rem;
					gap: 1rem;

					> * {
						display: grid;
						place-content: center;

						&:focus-visible {
							outline-offset: 0.25rem;
							outline-style: dashed;
							outline-width: 0.125rem;
							outline-color: var(--cleanroom-100);
						}
					}
				}
			}
		}

		.footnote {
			background: var(--cleanroom-100);
			color: var(--space-100);
			text-align: center;
			display: block;
			padding: 0 2.25rem;
		}
	}
</style>
