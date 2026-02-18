<script>
	import { nebulaSatellite as defaultImage } from '$lib'

	let { newsCards } = $props()
</script>

<section>
	<h2 class="section_title news_section_title">Mission Updates</h2>
	<ul class="news-grid">
		{#each newsCards as newscard}
			<li class="news-card">
				<img
					src={newscard.image
						? `https://fdnd-agency.directus.app/assets/${newscard.image}`
						: defaultImage}
					alt=""
					height="240"
					width="240" />
				<h3><a href={`/news/${newscard.id}`}>{newscard.title}</a></h3>
				<p>{newscard.type}</p>
			</li>
		{/each}
	</ul>
	<a href="/news" class="paragraph link-readmore">Read More</a>
</section>

<style>
	section {
		background-color: var(--white);
		margin-block: -1.5rem;
		padding-block: 2.5rem;
		padding-inline: clamp(1rem, 6vw, 3.5rem);
		border-bottom: var(--cleanroom-100) 0.5rem solid;
	}

	.news_section_title {
		color: var(--ultra-140);
		background-color: var(--white);
		padding-block: 0.5em 1em;
	}

	.news-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-template-rows: fit-content;
		gap: 2rem;
		list-style: none;
	}

	.news-card {
		position: relative;
		background-color: var(--white);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		align-self: start;

		&:hover {
			transform: translateY(-0.5rem);
			box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
		}

		&:focus-within {
			transform: translateY(-0.5rem);
			box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
			outline: var(--default-focus);
			outline-offset: 12px;
		}
	}

	img {
		width: 100%;
		height: 15rem;
		overflow: hidden;
		margin-top: auto;

		aspect-ratio: 1 / 1;
		object-fit: cover;
		object-position: center;
	}

	h3 {
		font-family: var(--heading);
		font-weight: 400;
		font-size: 1.3rem;
		line-height: 1.75rem;
		color: var(--ultra-140);
		padding-block: 1rem;
		padding-inline: clamp(0.75rem, 0.25rem + 1.1vw, 1rem);

		a {
			outline: none;
		}

		a::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}

	p {
		font-family: var(--heading);
		font-weight: 900;
		font-size: 1.2rem;
		color: var(--cleanroom-100);
		padding-block: 1rem;
		padding-inline: clamp(0.75rem, 0.25rem + 1.1vw, 1rem);
	}

	.link-readmore {
		display: block;
		padding-block: 1rem;
		padding-inline: 1rem;
		margin-block: 2rem 0;
		margin-inline: auto;
		width: max-content;

		font-family: var(--paragraph);
		font-weight: 500;
		text-align: center;
		text-transform: uppercase;
		color: var(--cleanroom-100);
		transition: transform 0.3s ease;

		&:hover {
			transform: translateY(-0.5rem);
		}
	}
</style>
