<script>
	import { portraitPlaceholder } from '$lib'
	import { onMount } from 'svelte'

	let { member } = $props()

	let JSEnabled = $state(false)
	let isExpanded = $state(false)

	function toggleText() {
		isExpanded = !isExpanded
	}

	onMount(() => {
		JSEnabled = true
	})
</script>

<li>
	<img
		class="reveal-image"
		src={member.image
			? `https://fdnd-agency.directus.app/assets/${member.image}`
			: portraitPlaceholder}
		alt=""
		height="250"
		width="250" />
	<p class="link orange">{member.name}</p>

	<div class="blockquote-container">
		{#if JSEnabled && member.testimonial && member.testimonial.split(' ').length > 36}
			<blockquote class="paragraph" aria-describedby="testimonial">
				{#if isExpanded && member.testimonial}
					{member.testimonial}
				{:else if member.testimonial}
					{member.testimonial.split(' ').slice(0, 24).join(' ') +
						'... '}
				{:else}
					"No testimonial provided."
				{/if}
			</blockquote>
			<button
				onclick={toggleText}
				aria-expanded={isExpanded}
				aria-controls="testimonial">
				{isExpanded ? 'Read less' : 'Read more'}
			</button>
		{:else}
			<blockquote class="paragraph">
				{member.testimonial
					? member.testimonial
					: 'No testimonial provided.'}
			</blockquote>
		{/if}
	</div>
</li>

<style>
	li {
		display: grid;
		grid-template-rows: min-content min-content 1fr;
		background-color: var(--secondary-color);

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

	blockquote {
		display: inline;
	}

	button {
		appearance: none;
		display: inline;
		background-color: transparent;
		cursor: pointer;
		color: var(--accent-color);

		&:hover {
			text-decoration: underline;
		}
	}

	.paragraph {
		font-size: 1rem;
	}
</style>
