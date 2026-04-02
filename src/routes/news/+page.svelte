<script>
	import { Hero, Breadcrumb, Newscards, Pagination } from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>News</title>
	<meta
		name="description"
		content="The news page features news and resources to inspire the general public and inform the media on the latest discoveries and progress made on the Nebula Xplorer mission." />
</svelte:head>

<Hero pageTitle="News" />

<Breadcrumb />

<hgroup>
		<h2 class="subtitle">
			Our latest <span class="orange">developments</span>
		</h2>
		<p class="heading">
			Currently <span class="orange">{data.pagination.totalItems}</span> available
		</p>
</hgroup>

<Newscards news={data.news} />

<Pagination pagination={data.pagination} />

<style>
	hgroup {
    width: 100%;
    max-width: var(--content-width);
    margin-inline: auto;
    padding-inline: 0;

    h2 {
      margin-block: .25em;
    }

		.heading {
			padding-bottom: 3rem;
		}

		.subtitle,
		.heading {
			font-weight: 400;
		}
	}

	/* util classes */
	.orange {
		color: var(--cleanroom-140);
	}
</style>
