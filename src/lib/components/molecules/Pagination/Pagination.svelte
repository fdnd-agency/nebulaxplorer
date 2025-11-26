<script>
  import { page } from "$app/state";
  import Arrow from "$lib/assets/icons/Arrow.svelte";
  import "./pagination.css";

  const { pagination } = $props();

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

<nav class="heading pagination-container">
  <!-- Previous button -->
  {#if pagination.currentPage > 1}
    <a
      href={`${page.url.pathname}?page=${pagination.currentPage - 1}`}
      class="pagination-indicator previous"
      aria-label="Previous page"
    >
      <Arrow height="20" width="12" rotate="180deg" />
    </a>
  {:else}
    <span class="pagination-indicator disabled previous" aria-hidden="true">
      <Arrow height="20" width="12" rotate="180deg" />
    </span>
  {/if}

  {#each pagination.items as item, index}
    {#if item !== "-"}
      <a
        href={`${page.url.pathname}?page=${item}`}
        class={`pagination-indicator ${pagination.currentPage === item ? "active" : ""}`}
      >
        {item}
      </a>
    {:else}
      <div class="separator-container">
        <span class="pagination-separator">{item}</span>
        <form
          method="GET"
          action=""
          onsubmit={(e) => {
            // Allow the GET navigation to happen
            // but reset the input value immediately
            setTimeout(() => e.target.reset());
          }}
          class="heading pagination-dictator"
        >
          <!-- The reason we have an empty placeholder here is for CSS styling, to check if the input is filled -->
          <input
            class="enhanced-navigation"
            type="number"
            name="page"
            id="navigation-input-{index}"
            min="1"
            max={pagination.totalPages}
            placeholder=""
          />
        </form>
      </div>
    {/if}
  {/each}

  <!-- Next button -->
  {#if pagination.currentPage < pagination.totalPages}
    <a
      href={`${page.url.pathname}?page=${pagination.currentPage + 1}`}
      class="heading pagination-indicator"
      aria-label="Next page"
    >
      <Arrow height="20" width="12" />
    </a>
  {:else}
    <span class="heading page-indicator disabled" aria-hidden="true"
      ><Arrow height="20" width="12" /></span
    >
  {/if}
</nav>
