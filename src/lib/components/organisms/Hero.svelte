<script>
	import { page } from '$app/state'

	import imageFallback from '$lib/assets/images/hero-background-01.jpg?enhanced'
	import WhiteNebulaXplorerLogo from '$lib/assets/logos/NEBULA-Xplorer-logo-white.png?enhanced'

	let { pages } = $props()

	const currentPage = $derived(
		pages.find(({ href }) => href === page.url.pathname),
	)

	const backgroundImage = $derived(currentPage?.image ?? imageFallback)
</script>

<section class="hero">
	<enhanced:img
		class="hero-background"
		src={backgroundImage}
		{alt}
		sizes="100vw"
		fetchpriority="high"
	/>
	<div class="content">
    <div class="text">
      <h1>{title}</h1>
      {#if text}<p>{text}</p>{/if}
    </div>
		<enhanced:img src={WhiteNebulaXplorerLogo} alt="NEBULA Xplorer Logo" />
	</div>
</section>

<style>
	.hero {
		container-type: inline-size;
		position: relative;
		display: flex;

		&::after {
			content: '';
			position: absolute;
			background-color: rgb(0 0 0 / 50%);
			z-index: -1;
			inset: 0;
		}

		.hero-background {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: bottom;
			z-index: -2;
		}

		.content {
			flex: 1;
			min-height: 35svh;
			display: flex;
			flex-direction: column-reverse;
			justify-content: center;
			gap: var(--spacing-xs);
			padding-left: var(--spacing-md);

			@container (min-width: 768px) {
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				min-height: 30svh;
				gap: var(--spacing-md);
				padding-inline: var(--spacing-xl);
			}

			img {
				width: 7.5rem;
				height: 100%;
				object-fit: contain;

				@container (min-width: 768px) {
					width: 10rem;
				}
			}

			.text {
				display: flex;
				flex-direction: column;
				gap: var(--spacing-xs);

				@container (min-width: 768px) {
					gap: var(--spacing-md);
				}
			}
		}
	}
</style>
