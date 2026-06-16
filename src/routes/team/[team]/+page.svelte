<script>
	import {
		Breadcrumb,
		Hero,
		TeamMemberCard,
		nebulaTeamBeginning,
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
	titleColor="var(--text-color-light)"
	pageTitle="Team"
	background={{
		file: nebulaTeamBeginning,
		alt: 'The team that started off the Nebula-Xplorer project.',
	}}
	logoOverlay
	bottomLayout
	focalPoint="100% 30%" />

<Breadcrumb />

<section>
	<div class="content-container">
		<img src={teamPhoto} alt="" />
		<h2 class="section-title">
			Who we worked with in <span class="orange"
				>{data.members[0].time}</span>
		</h2>
		<h3 class="heading">Reflections on the work</h3>
		<ul>
			{#each data.members as member (member.id)}
				<TeamMemberCard {member} />
			{/each}
		</ul>
	</div>
</section>

<style>
	h2,
	h3 {
		margin-block: var(--spacing-large);
	}

	img {
		max-height: 500px;
		max-width: 100%;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 1rem;
		margin-block-start: var(--spacing-medium);
		margin-block-end: var(--spacing-section-last);
	}
</style>
