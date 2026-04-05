<script>
	import { ReadMoreButton, portraitPlaceholder, teamPhoto } from '$lib'
	import { mount, onMount } from 'svelte'

	let { member } = $props()

	onMount(() => {
		if (member.testimonial.length > 36) {
			const testimonialPreview =
				member.testimonial.split(' ').slice(0, 24).join(' ') + '... '
			const blockquoteContainer = document.querySelector(
				'.blockquote-container'
			)
			const blockquote = document.querySelector('blockquote')

			blockquote.innerText = testimonialPreview

			// https://svelte.dev/docs/svelte/svelte#mount
			if (blockquoteContainer) {
				mount(ReadMoreButton, { target: blockquoteContainer })
			}

			const button = document.querySelector('blockquote + button')
			button.addEventListener('click', () => {
				if (button.innerText == 'Read more') {
					blockquote.innerText = member.testimonial
					button.innerText = 'Read less'
				} else {
					blockquote.innerText = testimonialPreview
					button.innerText = 'Read more'
				}
			})
		}
	})
</script>

<li>
	<img
		src={member.image
			? `https://fdnd-agency.directus.app/assets/${member.image}`
			: portraitPlaceholder}
		alt=""
		height="250"
		width="250" />
	<p class="link orange">{member.name}</p>

	<div class="blockquote-container">
		<blockquote class="paragraph">
			{member.testimonial}
		</blockquote>
	</div>
</li>

<style>
	li {
		display: grid;
		grid-template-rows: min-content min-content 1fr;
		background-color: var(--ultra-100);

		p {
			padding: 1rem;
			font-weight: 700;
		}

		div {
			padding-block: 0 2rem;
			padding-inline: 1rem;
		}

		img {
			width: 100%;
			height: auto;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	.paragraph {
		font-size: 1rem;
	}

	.orange {
		color: var(--cleanroom-100);
	}
</style>
