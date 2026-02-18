<script>
	import leidenImg from '$lib/assets/images/sron-leiden.webp?enhanced&w=960;768'
	import groningenImg from '$lib/assets/images/sron-groningen.webp?enhanced&w=960;768'
	import SRON_Academy_OnSpaceBlue from '$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg'
	import SRON_full_white from '$lib/assets/logos/SRON_Full_White.svg'
	import NwoIcon from '$lib/assets/images/NWO.webp?enhanced'
	import InstagramIcon from '$lib/assets/logos/Instagram.svelte'
	import LinkedinIcon from '$lib/assets/logos/Linkedin.svelte'
	import BskyIcon from '$lib/assets/logos/Bsky.svelte'
	import Arrow from '$lib/assets/logos/Arrow.svelte'

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
		<img
			src={SRON_Academy_OnSpaceBlue}
			alt="SRON Academy logo"
			class="footerImg SronAcademyLogo" />
		<div class="line"></div>
		<!-- this is a seperate element because what is supposed to be above and below this line changes with viewport width. If we can give a css grid line a border I would prefer that I think. But I'm, not sure if that's even posible. This works fine though. -->
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

		<img
			src={SRON_full_white}
			alt="SRON full white logo"
			class="footerImg SronLogo" />
		<ul class="socials">
			<li>
				<a href="/">
					<LinkedinIcon />
					<span class="visually-hidden">Linkedin profile</span>
				</a>
			</li>
			<li>
				<a href="/">
					<InstagramIcon />
					<span class="visually-hidden">Instagram profile</span>
				</a>
			</li>
			<li>
				<a href="/">
					<BskyIcon />
					<span class="visually-hidden">Bluesky profile</span>
				</a>
			</li>
		</ul>
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
			
			list-style: none;
			padding: 0;
			display: flex;
			flex-direction: column;

			@media (min-width: 600px) {
				flex-direction: row;
			}

			&.locations {
				
			background: var(--ultra-100);
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
			display: grid;
			align-items: center;
			gap: 1rem;
			grid-template-areas:
				'academy'
				'line'
				'nav'
				'sron'
				'socials';

			@media (min-width: 700px) {
				grid-template-areas:
					'academy academy sron sron'
					'line line line line'
					'nav nav nav socials';

				gap: 0;
			}
		}

		.SronAcademyLogo {
			grid-area: academy;
		}

		.SronLogo {
			grid-area: sron;

			@media (min-width: 700px) {
				justify-self: right;
			}
		}

		.line {
			grid-area: line;
			border-top: 0.1875rem solid var(--white);
		}

		.footerImg {
			width: 20rem;
			max-width: 95%;
			margin-block: 1.5rem;
		}

		nav {
			grid-area: nav;

			ul {
				padding-top: 0.75rem;
				width: inherit;
				background: unset;

				display: flex;
				flex-direction: column;
				@media (min-width: 600px) {
					flex-direction: row;
				}
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

	.socials {
		grid-area: socials;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		padding-top: 1rem;
		max-width: 120px;

		@media (min-width: 700px) {
			justify-self: end;
			width: 120px;
		}
	}

	.footnote {
		background: var(--cleanroom-100);
		color: var(--space-100);
		text-align: center;
		display: block;
		padding: 0 2.25rem;
	}
</style>
