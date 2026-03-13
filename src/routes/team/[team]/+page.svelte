<script>
	import {
		Breadcrumb,
		Hero,
		nebulaTeamBeginning,
		portraitPlaceholder,
		teamPhoto,
	} from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>Team</title>
	<meta
		name="description"
		content="The team page features the different teams who have worked on the Nebula Xplorer mission over the years." />
</svelte:head>

<Hero
	titleColor="var(--white)"
	pageTitle="Team"
	background={{ file: pic, alt: 'test' }} />

<Breadcrumb />

<div class="content-container">
	<img src={teamPhoto} alt="" />
	<h2 class="section_title">
		Who we worked with in <span class="orange">{data.members[0].time}</span>
	</h2>

	<h3 class="heading">Reflections on the work</h3>
	<ul>
		{#each data.members as member}
			<li>
				<img
					src={member.image
						? `https://fdnd-agency.directus.app/assets/${member.image}`
						: portraitPlaceholder}
					alt=""
					height="250"
					width="250" />
				<p class="link orange">{member.name}</p>

				{#if member.testimonial && member.testimonial.split(' ').length > 36}
					<details name="testimonial" class="paragraph">
						<summary>
							{member.testimonial
								.split(' ')
								.slice(0, 24)
								.join(' ')}
						</summary>
						{member.testimonial.split(' ').slice(24).join(' ')}
					</details>
				{:else if member.testimonial}
					<blockquote class="paragraph">
						{member.testimonial}
					</blockquote>
				{:else}
					<p class="paragraph">No testimonial provided.</p>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	.content-container {
		padding: 0;
	}

	h2 {
		margin-block: 2rem;
	}

	h3 {
		margin-block: 3rem 1.5rem;
	}

	img {
		height: 500px;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
		margin-block: 1rem 4rem;
	}

	li {
		display: grid;
		grid-template-rows: min-content min-content 1fr;
		background-color: var(--ultra-100);

		p {
			padding: 1rem;
			font-weight: 700;
		}

		blockquote,
		details {
			padding-block: 0 2rem;
			padding-inline: 1rem;
		}

		details,
		summary {
			line-height: 1.5;
		}

		details::after {
			content: 'read more';
			color: var(--cleanroom-100);
		}

		details[open]::after {
			content: 'read less';
			color: var(--cleanroom-100);
		}

		details summary::after {
			content: '...';
		}

		details[open] summary::after {
			content: '';
		}

		img {
			width: 100%;
			height: auto;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	.paragraph {
		font-size: 1rem;
	}

	.orange {
		color: var(--cleanroom-100);
	}
</style>
