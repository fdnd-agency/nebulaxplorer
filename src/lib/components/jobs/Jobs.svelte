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
    },
  ];
</script>

<section class="assignment-header">
  <h1 class="heading">Find a suitable <span>assignment</span></h1>
  <p class="subheading">Currently <span>{jobs.length}</span> available</p> 
</section>

<style>
  .heading{
    font-weight: 400;
  }

  .subheading{
    font-weight: 400;
  }

  span {
    font-weight: 500;
    color: var( --cleanroom-100);
  }
</style>