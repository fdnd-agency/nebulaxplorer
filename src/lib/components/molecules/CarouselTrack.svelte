<script>
	const { items, reverse = false } = $props()
</script>

<!--    If there aren't enough items, the carousel will be static. 
        If reverse was passed to this component, the track will scroll to the left instead of the right. 
        The default value for reverse is false. -->

<ul class="{items.length < 4 ? 'static' : ''} {reverse ? 'reverse' : ''}">
	{#each items as item}
		<li>
			<img src={item.image.src} alt={item.image.alt} />
		</li>
	{/each}
</ul>

<style>
	/* Shamelessly yoinked from https://frontendmasters.com/blog/infinite-marquee-animation-using-modern-css/ */
	ul {
		--size: 250px; /* size of the images */
		--duration: 60s; /* animation duration */
		--number: 4; /* number of visible images */

		display: flex;
		flex-direction: row;
		overflow: hidden;
		list-style: none;
		height: 10rem;
		background-color: white;
		margin-inline: -3.5rem;
		margin-block: 1.5rem;

		&.static {
			justify-content: space-around;
		}

		&.static li {
			animation-play-state: paused;
			offset: unset;
		}

		&.reverse li {
			animation-direction: reverse;
		}

		&:hover li {
			animation-play-state: paused;
		}
	}

	img {
		max-height: 100%;
		width: 250px;
	}

	li {
		/* The duration is based on the amount of items.  */
		--duration: calc(sibling-count() * 6s);
		--number: min(sibling-count(), 4);

		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: white;
		width: var(--size);
		offset: shape(
			from calc(var(--size) / -2) 50%,
			hline by
				calc(
					sibling-count() * max(100% / var(--number, 4), var(--size))
				)
		);

		animation-name: scroll;
		animation-duration: var(--duration, 60s);
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-delay: calc(
			-1 * sibling-index() * var(--duration, 60s) / sibling-count()
		);
	}

	@keyframes scroll {
		to {
			offset-distance: 100%;
		}
	}
</style>
