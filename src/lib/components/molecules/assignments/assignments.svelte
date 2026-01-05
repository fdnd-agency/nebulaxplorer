<script>
 import "./assignments.css"
  export let assignments = [];
</script>


<section class="assignments">
    <header class="assignments-header">
          <h1 class="section-title">Assignments</h1> 
              <p class="section-intro">
      Within the NEBULA Xplorer project, we have
      <strong>{assignments.length}</strong> assignments
    </p>
    </header>

    <ul class="assignment-grid">
        {#each assignments as assignment}
        <li class="assignment-card">
                <div class="assignment-content">
                    <div class="assignment-block">
                        <div class="assignment-label">role</div>
                        <h2 class="assignment-title">
                       {assignment.title} 
                    </h2>
                    </div>
                     <div class="assignment-block">
      <span class="assignment-label">location</span>
      <p class="assignment-location">{assignment.Location}</p>
    </div>
                </div>
        </li>
        {/each}
    </ul>
</section>