<script>
  export const prerender = true;

  import { page } from "$app/stores";
  import favicon from "$lib/assets/icons/favicon.svg";
  import PageArrow from "$lib/assets/icons/PageArrow.svelte";
  import "$lib/assets/styles/general.css";
  import "$lib/assets/styles/layout.css";

  // Are we on a slug page?
  // ex; on a detail page of the news page
  const isParentActive = (path) => {
    return $page.url.pathname.startsWith(`${path}/`);
  };

  // Are we on this exact page?
  const isExactActive = (path) => {
    return $page.url.pathname === path;
  };

  // Path is the path to the page and label is the text that will be displayed in the <a> tag
  const navItems = [
    { path: "/", label: "home" },
    { path: "/mission", label: "mission" },
    { path: "/scientific", label: "scientific" },
    { path: "/news", label: "news" },
    { path: "/team", label: "team" },
    { path: "/careers", label: "careers" },
    { path: "/partners", label: "partners" },
  ];

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="main-navigation">
  <a
    href="#menu"
    class="menu-button"
    aria-expanded="false"
    aria-controls="nav-items"
  >
    menu
    <span class="lines"></span>
    <span class="lines"></span>
    <span class="lines"></span>
  </a>
  <nav id="menu">
    <ul>
      <!-- Include this button separately as this is our close button -->
      <li>
        <a href="#" class="menu-button">
          menu
          <span class="lines"></span>
        </a>
      </li>
      <!-- Loop over each object -->
      {#each navItems as { path, label }}
        <li
          class={isExactActive(path)
            ? "exact-active"
            : isParentActive(path)
              ? "parent-active"
              : ""}
        >
          {#if isExactActive(path) || isParentActive(path)}
            <PageArrow />
          {/if}
          <a
            href={path}
            aria-current={isExactActive(path) ? "page" : undefined}
          >
            {label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</header>
<main>
  {@render children?.()}
</main>
