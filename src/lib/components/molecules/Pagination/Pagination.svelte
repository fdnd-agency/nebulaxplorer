<script>
  import { slugifyString } from "$lib/utils/slugify";
  import { page } from "$app/state";
  import Arrow from "$lib/assets/icons/arrow.svelte";

  const { limit = 9 } = $props();

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
    {
      id: 3,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: "",
    },
    {
      id: 4,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: "",
    },
    {
      id: 5,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: "",
    },
    {
      id: 6,
      role: "Astrophysics Data Analysis Intern",
      location: "Leiden",
      slug: "",
    },
  ];
</script>

<form action="GET">
  {#each jobs as job, index}
    <a href={`${page.url.pathname}?page=${index+1}`} class={`${page.url.pathname}`}>{index+1}</a>
  {/each}
</form>

<style>
    .page-indicator{
        &.active{
            text-decoration: underline;
            font-weight: 500;
        }
    }
</style>
