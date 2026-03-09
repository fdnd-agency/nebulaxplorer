<script>
	import { placeholder2 as placeholderImage } from '$lib'

	let { news } = $props()
</script>

<section class="grid-wrapper">
	{#if news && news.length > 0}
		<ul class="news-grid">
			{#each news as newscard}
				<li class="news-card">
					<a
						href={'/news/' + (newscard.slug || newscard.id)}
						class="news-card-link">
						<div class="news-image">
							<img
								src={newscard.image
									? 'https://fdnd-agency.directus.app/assets/' +
										newscard.image
									: placeholderImage}
								alt={newscard.title}
								height="264" />
						</div>
						<div class="news-info">
							<span class="news-label"></span>
							<h3>{newscard.title || 'Untitled'}</h3>
							<span class="news-label"></span>
							{#if newscard.type || newscard.category}
								<p>{newscard.type || newscard.category}</p>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="no-news">No news available at this time.</p>
	{/if}
</section>

<style>
	.news-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		padding-bottom: 2rem;
		padding-left: 0;
		list-style: none;
	}

	@media (min-width: 1000px) {
		.news-grid {
			padding-inline: 4rem;
		}
	}

	.news-card {
		background-color: var(--white);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		padding-bottom: 3rem;

		&:hover,
		&:focus-within {
			transform: translateY(-0.5rem);
			box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);

			h3 {
				text-decoration: underline 1px;
			}
		}

		&:focus-within {
			outline: var(--default-focus);
			outline-offset: 12px;
		}
	}

	.news-info {
		padding: 0.75rem 0.75rem 0rem 0.75rem;

		h3 {
			font-family: var(--heading);
			font-weight: 400;
			font-size: 1.3rem;
			line-height: 1.75rem;
			color: var(--ultra-140);
		}

		p {
			font-family: var(--heading);
			font-weight: 900;
			font-size: 1.2rem;
			color: var(--cleanroom-100);
			padding: 0.5rem 0 0.5rem 0;
		}
	}

	.news-label {
		font-family: var(--subtext);
		font-weight: 900;
		font-size: 1rem;
		line-height: 1.4rem;
		color: var(--space-140);
	}

	.news-image {
		width: 100%;
		height: 16.5rem;
		overflow: hidden;
		margin-top: auto;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
</style>
