<script>
	import { placeholder1 } from '$lib'
	let { step, index } = $props()
</script>

<details
	name="timeline"
	style="--_index: {index + 1}; {step.image
		? `--_background-image: url(https://fdnd-agency.directus.app/assets/${step.image}?format=webp&height=512)`
		: `--_background-image: url(${placeholder1});`}"
	open>
	<summary class="caption">{step.title}</summary>
	<p class="paragraph">{step.content}</p>
</details>

<style>
	@supports (grid-template-columns: subgrid) and selector(::details-content) {
		details {
			@container (width > 50rem) {
				display: grid;
				grid-template-columns: subgrid;
				grid-template-rows: subgrid;
				grid-column: 1 / -1;
				grid-row: 1 / -1;
			}
		}

		details::details-content {
			display: flex;
			align-items: flex-end;

			height: 20rem;
			padding: 1rem;

			background-image: var(--_gradient), var(--_background-image);
			background-repeat: no-repeat;
			background-size: cover;

			opacity: 0;
			transition:
				opacity 0.4s,
				content-visibility 0.4s allow-discrete;

			--_space-mid-opacity: hsla(238, 35%, 15%, 0.75);
			--_gradient: linear-gradient(
				transparent 0%,
				var(--_space-mid-opacity) 30%,
				var(--_space-mid-opacity) 100%
			);

			@container (width > 50rem) {
				grid-column: 2;
				grid-row: 1 / -1;
				height: auto;

				--_gradient: linear-gradient(
					transparent 0%,
					transparent 30%,
					var(--_space-mid-opacity) 100%
				);
			}
		}

		details[open]::details-content {
			opacity: 1;
		}

		details:not([open])::details-content {
			display: none;

			@container (width > 50rem) {
				display: inherit;
			}
		}

		summary {
			grid-column: 1;
			grid-row: var(--_index) / span 1;
			display: grid;
			align-items: center;
			padding: 1rem;
			cursor: pointer;
			z-index: 1;
			position: relative;
			padding-inline-start: 2em;

			text-transform: uppercase;
			transition: 0.2s;

			&:hover,
			&:focus {
				background-color: var(--space-60);
				outline: none;
			}

			&::before {
				content: '';
				background-image: radial-gradient(white 50%, transparent 50%);
				position: absolute;
				align-self: center;
				transform: scale(1);
				transition: 1s;
				transform-origin: center;
				height: 2rem;
				width: 2rem;
				z-index: 2;
			}
		}

		p {
			max-height: 100%;
			overflow-y: auto;
			scrollbar-color: var(--space-60) var(--background-color-dark);
		}

		details[open] summary {
			font-weight: bold;
			pointer-events: none; /* ensures there is always one details open */

			&::before {
				content: '';
				background-image: radial-gradient(white 50%, transparent 50%);
				transform: scale(0.1);
			}
		}
	}
</style>
