<script>
	import { Hero, portraitPlaceholder } from '$lib'

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
			<p>{member.name}</p>
			<p>{member.testimonial}</p>
		</li>
	{/each}
</ul>

<style>
	.orange {
		color: var(--cleanroom-100);
	}
</style>
