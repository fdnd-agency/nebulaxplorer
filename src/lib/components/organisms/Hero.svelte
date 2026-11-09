<script>
	import imageFallback from '$lib/assets/images/hero-background-01.jpg?enhanced'
	import WhiteNebulaXplorerLogo from '$lib/assets/logos/NEBULA-Xplorer-logo-white.png?enhanced'

	let { title, text, image, alt = '' } = $props()
	let backgroundImage = $derived(image || imageFallback)
</script>

<section class="hero">
	<enhanced:img
		class="hero-background"
		src={backgroundImage}
		{alt}
		sizes="100vw"
		fetchpriority="high"
	/>
	<div>
		<enhanced:img src={WhiteNebulaXplorerLogo} alt="NEBULA Xplorer Logo" />
		<h1>{title}</h1>
		{#if text}
			<p>{text}</p>
		{/if}
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

		div {
			min-height: 35svh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: var(--spacing-xs);
			padding-left: var(--spacing-md);

			@container (min-width: 768px) {
				min-height: 40svh;
				gap: var(--spacing-md);
				padding-left: var(--spacing-xl);
			}

			img {
				width: 7.5rem;
				height: 100%;
				object-fit: contain;

				@container (min-width: 768px) {
					width: 10rem;
				}
			}
		}
	}
</style>
