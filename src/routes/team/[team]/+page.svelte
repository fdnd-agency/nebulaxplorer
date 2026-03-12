<script>
	import { Hero, portraitPlaceholder, teamPhoto } from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>Team</title>
	<meta
		name="description"
		content="The team page features the different teams who have worked on the Nebula Xplorer mission over the years." />
</svelte:head>

<Hero titleColor="var(--white)" pageTitle="Team" />

<h2 class="section_title">
	Who we worked with in <span class="orange">{data.members[0].time}</span>
</h2>

<img src={teamPhoto} alt="" />

<h3 class="heading">Reflections on the work</h3>
<ul>
	{#each data.members as member}
		<li>
			<img
				src={member.image
					? `https://fdnd-agency.directus.app/assets/${member.image}`
					: portraitPlaceholder}
				alt=""
				height="150"
				width="150" />
			<p class="link orange">{member.name}</p>
			<!-- <blockquote class="paragraph">{member.testimonial}</blockquote> -->
			<details name="testimonial paragraph">
				<summary>
					{member.testimonial.split(' ').slice(0, 16).join(' ')}
				</summary>
				{member.testimonial.split(' ').slice(16).join(' ')}
			</details>
		</li>
	{/each}
</ul>

<style>
	h2 {
		margin-block: 2rem 0;
	}

	img {
		height: 400px;
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

	.orange {
		color: var(--cleanroom-100);
	}
</style>
