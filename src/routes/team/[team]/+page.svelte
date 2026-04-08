<script>
	import {
		Breadcrumb,
		Hero,
		TeamMemberCard,
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
	background={{ file: nebulaTeamBeginning, alt: 'test' }}
	logoOverlay
	fullScreen
	bottomGradientLayout />

<Breadcrumb />

<div class="content-container">
	<img src={teamPhoto} alt="" />
	<h2 class="section_title">
		Who we worked with in <span class="orange">{data.members[0].time}</span>
	</h2>

	<h3 class="heading">Reflections on the work</h3>
	<ul>
		{#each data.members as member}
			<TeamMemberCard {member} />
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
		max-height: 500px;
		max-width: 100%;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
		margin-block: 1rem 4rem;
	}

	.orange {
		color: var(--cleanroom-100);
	}
</style>
