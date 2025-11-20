<script>
  import { page } from "$app/stores";
  import { sanitizeString } from "$lib/utils/sanitize";
  import Arrow from "$lib/assets/icons/arrow.svelte";

  // Split the path into segments and filter out empty strings
  const pathSegments = $page.url.pathname
    .split("/")
    .filter((segment) => segment !== "");

  console.log(pathSegments, pathSegments.length);
</script>

<nav class="breadcrumb-path">
  <a href="/" class="crumb subheading">home</a>
  {#each pathSegments as segment, index}
    <span class="arrow">
      <Arrow />
    </span>
    {#if index + 1 < pathSegments.length}
      <a
        href={"/" + pathSegments.slice(0, index + 1).join("/")}
        class="crumb subheading"
      >
        {sanitizeString(segment)}
      </a>
    {:else}
      <span class="caption">
        {sanitizeString(segment)}
      </span>
    {/if}
  {/each}
</nav>

<style>
  nav.breadcrumb-path {
    display: inline-flex;
    gap: 0.75rem;
    align-items: center;

    .arrow {
      display: contents;
      color: var(--cleanroom-100);
    }

    a:hover {
      text-decoration: underline;
      text-underline-offset: 0.125rem;
    }
  }
</style>
