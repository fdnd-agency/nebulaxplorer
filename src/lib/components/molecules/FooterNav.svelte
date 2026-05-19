<script>
	import {
		sronAcademyLogoOnSpaceBlue as SRON_Academy_OnSpaceBlue,
		sronLogoFullWhite as SRON_full_white,
		LinkedIn as LinkedinIcon,
		Footnote,
		MailIcon,
	} from '$lib'

	import { resolve } from '$app/paths'

	const { navItems } = $props()
</script>

<div class="contents">
	<img
		src={SRON_Academy_OnSpaceBlue}
		alt="SRON Academy logo"
		class="footerImg SronAcademyLogo" />
	<div class="line"></div>
	<!-- this is a seperate element because what is supposed to be above and below this line changes with viewport width. If we can give a css grid line a border I would prefer that I think. But I'm, not sure if that's even posible. This works fine though. -->
	<nav>
		<ul class="link">
			{#each navItems as { path, label } (path)}
				<li>
					<a href={resolve(path)}>{label}</a>
					<!-- hrefs now use resolve(). Otherwise the site may break according to https://sveltejs.github.io/eslint-plugin-svelte/rules/no-navigation-without-resolve/ -->
				</li>
			{/each}
			<li><a href={resolve('/privacy')}>privacy</a></li>
		</ul>
	</nav>

	<img
		src={SRON_full_white}
		alt="SRON full white logo"
		class="footerImg SronLogo" />
	<ul class="socials">
		<li>
			<a href={resolve('/#mailing-list-signup')}>
				<span>Subscribe to our mailing list!</span>
				<MailIcon />
			</a>
		</li>
		<li>
			<a href="https://www.linkedin.com/company/nebula-xplorer/">
				<LinkedinIcon />
				<span class="visually-hidden">Linkedin profile</span>
			</a>
		</li>
	</ul>
</div>
<Footnote />

<style>
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
		margin-block-start: 1rem;

		@media (min-width: 700px) {
			justify-self: right;
			margin-block-start: unset;
		}
	}

	.line {
		grid-area: line;
		border-top: 0.1875rem solid var(--white);
	}

	.footerImg {
		width: 20rem;
		max-width: 95%;

		@media (min-width: 700px) {
			margin-block-end: 1.5rem;
		}
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
		}

		/* If more links get added, be sure to remove or adjust this; if necessary */
		li {
			display: contents;

			&:hover,
			&:focus-within {
				color: var(--cleanroom-60);
			}

			@supports selector(a:has(b)) {
				/* Nice inspo https://tobiasahlin.com/blog/previous-sibling-css-has/ */
				&:hover + li,
				&:focus-within + li,
				&:has(+ li:hover),
				&:has(+ li:focus-within) {
					color: var(--cleanroom-60);
				}
			}
		}

		a {
			display: inline;
			width: fit-content;

			transition: color 0.3s ease;

			&:hover,
			&:focus {
				color: var(--cleanroom-100);
			}

			&:active {
				color: var(--cleanroom-140);
			}
		}
	}

	.socials {
		list-style: none;
		grid-area: socials;
		display: flex;
		justify-content: start;
		flex-direction: row;
		gap: 1em;
		flex-wrap: wrap;

		a {
			display: flex;
			gap: 1em;
			align-items: center;
		}

		a span {
			width: max-content;
			font-family: var(--font-heading);
		}

		a :global(svg) {
			flex-shrink: 0;
			height: 2em;
			color: white;
		}

		@media (min-width: 700px) {
			justify-content: end;
			padding-inline-start: 1rem;
			padding-block-start: 1rem;
		}
	}
</style>
