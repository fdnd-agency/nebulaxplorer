<script>
/* eslint-disable svelte/require-each-key */
	
	import { Hero, Breadcrumb} from '$lib'
	import TeamsYearComponent from '$lib/components/organisms/TeamsYearComponent.svelte'

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
		},{
			"id":3,
			"time_end":"2025-06-30T12:00:00",
			"time_start":"2025-02-02T12:00:00",
			"group_photo":"74be76b4-ff0d-4eec-a237-be283887ff99"
		},
		{
			"id":4,
			"time_end":"2025-12-30T12:00:00",
			"time_start":"2025-08-02T12:00:00",
			"group_photo":"74be76b4-ff0d-4eec-a237-be283887ff99"
		},

]

function groupByYear(data){
	const groupedByYear = data.reduce((acc, current) => {
		const year = new Date(current.time_start).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(current);
		return acc;
	}, {});


	return Object.entries(groupedByYear);
}

const resultArray = groupByYear(dummydata);
const sortedResults = resultArray.sort((a, b) => b[0] - a[0]);



</script>

<svelte:head>
	<title>Team</title>
	<meta
		name="description"
		content="The team page features the different teams who have worked on the Nebula Xplorer mission over the years." />
</svelte:head>

<!-- HERO BLOCK -->
<Hero titleColor="var(--white)" pageTitle="Team" />
<Breadcrumb />
<section class="content-container">
<h2>who are we?</h2>
	{#each sortedResults as year}
	
		<TeamsYearComponent year={year} />
		
	{/each}
</section>

<style>

.content-container{
	display: flex;
	flex-direction: column;
	max-width: 1000px;
	justify-content: center;
}

</style>