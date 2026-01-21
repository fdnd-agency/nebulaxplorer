<script>
	import "./AssignmentCards.css"
	const { assignments } = $props();
</script>

<header class="assignments-header">
	<h1 class="section-title">Assignments</h1>
	<p class="section-intro">
		Within the NEBULA Xplorer project, we have
		<strong class="assignments-length">{assignments.length}</strong> openings.
	</p>
</header>

<div class="assignments-container">
	{#each assignments as assignment}
		<article class="assignment-grid">
			<section class="assignment-content">
				<div class="assignment-text">
					<h2 class="assignment-title">{assignment.title}</h2>
					<p>{assignment.study_program}</p>
					<p>{assignment.location}</p>
				</div>
				<a class="apply-button" href={assignment.apply_link || "#"}>Apply</a>
			</section>
		</article>
	{/each}
</div>

