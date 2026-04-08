<script>
	import { placeholder2 as placeholderImage } from '$lib'

	let { news } = $props()
</script>

<section>
	{#if news && news.length > 0}
		<ul class="news-grid">
			{#each news as newscard}
				<li class="news-card">
					<img
						src={newscard.image
							? 'https://fdnd-agency.directus.app/assets/' +
								newscard.image
							: placeholderImage}
						alt=""
						height="264"
						width="264" />
					<div class="news-info">
						<time datetime={newscard.date}> {newscard.date}</time>
						<a href={'/news/' + (newscard.slug || newscard.id)}>
							<h3>{newscard.title || 'Untitled'}</h3>
						</a>
						{#if newscard.type || newscard.category}
							<p>{newscard.type || newscard.category}</p>
						{/if}
					</div>
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
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: 2rem;
		padding-block-end: 2rem;
		padding-inline: 0;
		margin-inline: auto;
		width: 100%;
		max-width: var(--content-width);
		list-style: none;
	}

	.news-card {
		position: relative;
		background-color: var(--white);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		padding-bottom: 1.5rem;

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
		padding: 0.75rem;

		h3 {
			font-family: var(--heading);
			font-size: 1.3rem;
			line-height: 1.35;
			color: var(--ultra-140);
		}

		p {
			font-family: var(--heading);
			font-weight: 900;
			font-size: 1.2rem;
			color: var(--cleanroom-100);
			padding: 0.5rem 0;
		}
	}

	a::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	time {
		font-family: var(--subtext);
		line-height: 1.4;
		color: var(--ultra-60);
		font-size: 0.9rem;
	}

	img {
		width: 100%;
		height: 16.5rem;
		object-fit: cover;
	}
</style>
