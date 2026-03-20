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

<section class="paragraph-block">
	<div class="text-title">
		<h2 class="subtitle">
			Our latest <span class="orange">developments</span>
		</h2>
		<p class="heading">
			Currently <span class="orange">{data.pagination.totalItems}</span> available
		</p>
	</div>
</section>

<Newscards news={data.news} />

<Pagination pagination={data.pagination} />

<style>
	.paragraph-block {
		display: grid;
		grid-template-columns: subgrid;
		gap: inherit;
		row-gap: unset;

		> * {
			grid-column: 1 / -1;
			padding-left: 0;

			@media (min-width: 36.25rem) {
				padding-right: 1.5rem;
			}
			@media (min-width: 56.25rem) {
				padding-left: 2.5rem;
			}
		}

		.text-title * + * {
			margin-top: 0.5rem;
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
