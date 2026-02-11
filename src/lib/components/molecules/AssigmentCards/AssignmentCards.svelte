<script>
	import './AssignmentCards.css'
	const { assignments } = $props()
</script>

<header class="assignments-header">
	<h2 class="subtitle">Find a suitable Assignment</h2>
	<p class="heading">
		Within the NEBULA Xplorer project there are
		<span>{assignments.length}</span> assignments available.
	</p>
</header>

<ul class="assignments-container">
	{#each assignments as assignment}
		<li class="assignment-card">
			<a href="#">
				<section class="assignment-content">
					<h2 class="assignment-title">{assignment.title}</h2>
					<div>
						<p>{assignment.study_program}</p>
						<p>{assignment.location}</p>
					</div>
				</section>
				<p class="apply-button supporting">Apply</p>
			</a>
		</li>
	{/each}
</ul>
