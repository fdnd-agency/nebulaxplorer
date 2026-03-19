<script>
	import { Breadcrumb, Hero } from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>{data.newsItem[0].title}</title>
	<meta name="description" content={data.newsItem[0].title} />
</svelte:head>

<Hero pageTitle="" />

<Breadcrumb />
<article>
	<section>
		<div class="content-container">
			<h2>{data.newsItem[0].title}</h2>
			<time datetime={data.newsItem[0].date}>
				{data.newsItem[0].date}
			</time>
			<p>{data.newsItem[0].type}</p>
			<img
				src={`https://fdnd-agency.directus.app/assets/${data.newsItem[0].image}`}
				alt="" />
		</div>
	</section>
	<section>
		<div class="content-container">
			<h2 class="heading">{data.newsItem[0].title}</h2>
			<p class="paragraph">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
				praesentium totam molestias possimus aliquid modi similique
				facilis commodi veritatis, perspiciatis dolore fugit culpa nam
				et dignissimos expedita accusamus quaerat. Harum. Lorem ipsum
				dolor sit amet consectetur adipisicing elit. Quas perspiciatis
				esse sapiente voluptate corrupti consequuntur, cum aut sequi
				natus repudiandae atque aspernatur ipsa inventore qui velit
				maxime quae eum. At?
			</p>
		</div>
	</section>
</article>

<style>
	article {
		padding-inline: 0;
	}

	section {
		padding-inline: clamp(1rem, 5vw, 3.5rem);
		padding-block-start: calc(1rem + 2vw);
		padding-block-end: calc(3rem + 2vw);
	}

	section:first-of-type {
		.content-container {
			display: grid;
			grid-template-rows: min-content min-content min-content 1fr;
			grid-template-areas:
				'date'
				'type'
				'title'
				'img';
			gap: 1rem;
			align-items: start;

			@media (width > 800px) {
				column-gap: 3rem;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: min-content min-content 1fr;
				grid-template-areas:
					'img	date'
					'img	type'
					'img	title';
			}
		}

		h2 {
			font-size: clamp(1.5rem, 0.82rem + 3.6vw, 4rem);
			line-height: 1.25;
		}

		img {
			max-width: min(100%, 40rem);
			max-height: 40rem;
			align-self: center;
			justify-self: center;
		}

		time {
			font-family: var(--subtext);
		}

		p {
			text-transform: uppercase;
			color: var(--cleanroom-100);
		}
	}

	section:nth-of-type(n + 2) {
		color: black;
		background-color: white;

		h2 {
			font-weight: 500;
			color: var(--cleanroom-100);
			max-width: 35ch;
		}

		p {
			margin-block: 1em;
			max-width: 70ch;
		}
	}

	picture,
	img {
		grid-area: img;
	}

	h2 {
		grid-area: title;
	}
</style>
