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



<ul class="jobs-grid">
  {#each jobs as job}
  <li class="job-card">
    <div class="job-info">
      <span class="job-label">role</span>
      <h3>{job.role}</h3>
      <span class="job-label">location</span>
      <p>{job.location}</p>
    </div>
    <div class="job-image">
      <img src="/src/lib/assets/images/WerkenbijSRON.jpg" alt="{job.role} in {job.location}"> 
    </div>
  </li>
  {/each}
</ul>

<style>

  .jobs-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
    list-style: none;
    justify-content: right;
  }

  .job-card {
    width: 23.31rem;
    height: 40rem;
    background: var(--space-110);
    overflow: hidden;
    border-top: 3px solid var(--white);
    border-bottom: 3px solid var(--white);
    display: flex;
    flex-direction: column;
  }

  .job-info {
    padding: 1.5rem 2rem 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

  h3 {
    font-family: var(--heading);
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.75rem;
    color: var(--white);
  }
  p { 
    font-family: var(--heading);
    font-weight: 400;
    font-size: 1.2rem;
    color: var(--white); 
  }
  }

  .job-label {
    font-family: var(--subtext);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.4rem;
    color: var(--cleanroom-100);
    text-transform: lowercase;
  }

  .job-image {
    width: 100%;
    height: 28.125rem;
    overflow: hidden;
    margin-top: auto;
  }

  .job-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>