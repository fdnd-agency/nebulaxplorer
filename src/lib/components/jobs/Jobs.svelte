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

<section class="grid-wrapper">
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
</section>



<style>

  .grid-wrapper{
    display: grid;
    grid-template-columns: subgrid;

  .jobs-grid{
    list-style: none;
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 4 / -1;
    gap: 1rem;


  }

  }

  .job-card{
    grid-column: span 3;
    background: var(--space-100-low-opacity);
    border-top: 3px solid var(--white);
    border-bottom: 3px solid var(--white);
  }
  .job-info{
     padding: 2rem;
    margin-bottom: 5rem;
    gap: 0.5rem;

     h3{
    font-family: var(--heading);
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.75rem;
    color: var(--white);
   }
   p{
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
 
  }

  .job-label.location{
    margin-top: 2rem;
  }

     .job-image {
  width: 100%;
    height: 28.125rem;
    overflow: hidden;
    margin-top: auto;
    margin-bottom: auto;
    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
  }
  }

  
.grid-wrapper{
  display: inherit;
  grid-template-columns: inherit;

  .jobs-grid{
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 4 / -1;
    gap: 1rem;

    list-style: none;
}

.job-card{
  grid-column: span 3;
   background: var(--space-100-low-opacity);
    overflow: hidden;
    border-top: 3px solid var(--white);
    border-bottom: 3px solid var(--white);
}

.job-info{
   padding: 2rem;
       gap: 0.5rem;
   h3{
    font-family: var(--heading);
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.75rem;
    color: var(--white);
   }
   p{
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
 
  }


}
  
   .job-image {
    width: 100%;
    height: 28.125rem;
    overflow: hidden;
    margin-top: auto;

    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  }
 
</style>