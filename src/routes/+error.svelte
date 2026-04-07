<script>
	import { Hero, blackhole } from '$lib'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
</script>

<svelte:head>
	<title>Page not found</title>
</svelte:head>

<Hero pageTitle="" />

<section>
	<img src={blackhole} alt="A black hole." />
	<h1 class="heading">{page.status} {page.error.message}</h1>
	<p class="paragraph">This page may been been absorbed by a black hole.</p>
	<a href={resolve('/')}>Go back home?</a>
</section>

<style>
	section {
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		margin-block: 5rem;
	}

	img {
		width: 500px;
		max-width: 100%;
		height: auto;
	}

	a {
		color: var(--cleanroom-100);

		&:hover {
			text-decoration: underline;
		}
	}
</style>
