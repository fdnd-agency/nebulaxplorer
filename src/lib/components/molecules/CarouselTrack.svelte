<script>
	const { items, reverse = false } = $props()
</script>

<!--    If there aren't enough items, the carousel will be static. 
        If reverse was passed to this component, the track will scroll to the left instead of the right. 
        The default value for reverse is false. -->

<ul class="{items.length < 4 ? 'static' : ''} {reverse ? 'reverse' : ''}">
	{#each items as item (item.image.src)}
		<li>
			<img src={item.image.src} alt={item.image.alt} />
		</li>
	{/each}
</ul>

<style>
	/* This is the CSS that applies when the carousel is not supported or the user has reduced animations */
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-template-rows: 150px;
		grid-auto-rows: 150px;
		gap: 1rem;
		list-style: none;
		margin-block: 1.5rem;
		max-width: var(--content-width);
		margin-inline: auto;
	}

	li {
		background-color: var(--background-color-light);
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		align-items: center;
	}

	img {
		height: auto;
		max-height: 100%;
		width: 100%;
		object-fit: contain;
	}

	@supports (width: calc(100% / sibling-count())) and
		(clip-path: shape(nonzero from 0 0, line to 10px 10px)) {
		@media (prefers-reduced-motion: no-preference) {
			/* Shamelessly yoinked from https://frontendmasters.com/blog/infinite-marquee-animation-using-modern-css/ */

			ul {
				--size: 250px; /* size of the images */
				--duration: 60s; /* animation duration */
				--number: 4; /* number of visible images */

				display: flex;
				position: relative;
				flex-direction: row;
				overflow: hidden;
				height: 10rem;
				margin-inline: clamp(-1rem, -5vw, -3.5rem);
				background-color: var(--background-color-light);

				max-width: unset;

				&.reverse li {
					animation-direction: reverse;
				}

				&:hover li {
					animation-play-state: paused;
				}

				@media (width > 600px) {
					&.static {
						justify-content: space-around;
					}

					&.static li {
						animation-play-state: paused;
						offset: unset;
					}
				}

				mask-image: linear-gradient(
					to right,
					transparent,
					rgb(255 0 0 / 0.024),
					rgb(255 0 0 / 0.095),
					rgb(255 0 0 / 0.206),
					rgb(255 0 0 / 0.345),
					rgb(255 0 0 / 0.5),
					rgb(255 0 0 / 0.654),
					rgb(255 0 0 / 0.793),
					rgb(255 0 0 / 0.904),
					rgb(255 0 0 / 0.975),
					red 2% 98%,
					rgb(255 0 0 / 0.975),
					rgb(255 0 0 / 0.904),
					rgb(255 0 0 / 0.793),
					rgb(255 0 0 / 0.654),
					rgb(255 0 0 / 0.5),
					rgb(255 0 0 / 0.345),
					rgb(255 0 0 / 0.206),
					rgb(255 0 0 / 0.095),
					rgb(255 0 0 / 0.024),
					transparent
				);
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
				width: var(--size);
				offset: shape(
					from calc(var(--size) / -2) 50%,
					hline by
						calc(
							10rem + sibling-count() *
								max(100% / var(--number, 4), var(--size))
						)
				);

				animation-name: scroll;
				animation-duration: var(--duration, 60s);
				animation-timing-function: linear;
				animation-iteration-count: infinite;
				animation-delay: calc(
					-1 * sibling-index() * var(--duration, 60s) /
						sibling-count()
				);
			}

			@keyframes scroll {
				to {
					offset-distance: 100%;
				}
			}
		}
	}
</style>
