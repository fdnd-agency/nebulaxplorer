<script>
    const jobs = [
        {
            id: 1,
            role: "Technical Engineer",
            location: "Leiden",
            slug: "",
        },
        {
            id: 2,
            role: "Astrophysics Data Analysis Intern",
            location: "Leiden",
            slug: "",
        }
    ];
</script>

<h1>Find a suitable assignment</h1>
<p>Currently {jobs.length} available</p>

<ul>
    {#each jobs as job}
        <li>
            <h2>Role: {job.role}</h2>
            <p>Location: {job.location}</p>
        </li>
    {/each}
</ul>
