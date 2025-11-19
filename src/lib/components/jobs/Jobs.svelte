<script>
  const jobs = [
    {
      id: 1,
      role: "Technical Engineer",
      location: "Leiden",
      slug: ""
    },
    {
      id: 2,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: ""
    },
    {
      id: 3,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: ""
    },
    {
      id: 4,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: ""
    },
    {
      id: 5,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: ""
    },
    {
      id: 6,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: ""
    },
  ];
</script>

<article class="jobs-list-wrapper">
<ul class="jobs-grid">
  {#each jobs as job}
  <li class="job-card">
    <div class="job-info">
      <span class="job-label role">role</span>
      <h3>{job.role}</h3>
      <span class="job-label location">location</span>
      <p>{job.location}</p>
    </div>
    <div class="job-image">
      <img src="/src/lib/assets/images/WerkenbijSRON.jpg" alt="{job.role} in {job.location}"> 
    </div>  
  </li>
  {/each}
</ul>
</article>



<style>


 
</style>