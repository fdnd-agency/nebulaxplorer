<script module>

	import {
		Hero,
	} from '$lib'
	import TeamsComponent from '$lib/components/organisms/TeamsComponent.svelte'

	const dummydata = [	
		{
			"id":1,
			"time_end":"2026-06-30T12:00:00",
			"time_start":"2026-02-02T12:00:00",
			"group_photo":"74be76b4-ff0d-4eec-a237-be283887ff99"
		},
		{
			"id":2,
			"time_end":"2026-12-30T12:00:00",
			"time_start":"2026-08-02T12:00:00",
			"group_photo":"74be76b4-ff0d-4eec-a237-be283887ff99"
		},

]

	
</script>

<svelte:head>
	<title>Team</title>
	<meta
		name="description"
		content="The team page features the different teams who have worked on the Nebula Xplorer mission over the years." />
</svelte:head>

<!-- HERO BLOCK -->
<Hero titleColor="var(--white)" pageTitle="Team" />

<h2>who are we?</h2>
<article>
	{#each dummydata as team(team.id)}
		<TeamsComponent teams={team}/>
	{/each}
</article>

<style>
	article{
		display: flex;
		width: 100%;
	}
</style>