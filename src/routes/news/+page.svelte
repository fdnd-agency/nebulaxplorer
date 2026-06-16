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
	<div class="content-container">
		<h2 class="subtitle">
			Our latest <span class="orange">developments</span>
		</h2>
		<p class="heading">
			Currently <span class="orange">{data.pagination.totalItems}</span> available
		</p>
	</div>
</hgroup>

<Newscards news={data.news} />

<Pagination pagination={data.pagination} />

<style>
	hgroup {
		h2 {
			margin-block: 0.25em;
		}

		.heading {
			padding-block-end: calc(1rem + 1vw);
		}

		.subtitle,
		.heading {
			font-weight: 400;
		}
	}
</style>
