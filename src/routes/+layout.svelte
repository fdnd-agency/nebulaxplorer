<script>
  import { page } from "$app/stores";
  import { Footer } from "$lib";
  import favicon from "$lib/assets/logos/favicon.svg";
  import PageArrow from "$lib/assets/logos/PageArrow.svelte";
  import "$lib/assets/styles/general.css";
  import "$lib/assets/styles/layout.css";
  import { onNavigate } from "$app/navigation";

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

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
    // { path: "/news", label: "news" },
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
        <!-- Leave this as # -->
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
<!-- For some reason, passing navItems directly did not pass the prop correctly -->
<Footer {navItems} />

<style>
  @media (min-width: 56.25rem) {
    .main-navigation {
      view-transition-name: header;
    }
    .exact-active :global(svg) {
      /* other existing rules */
      view-transition-name: active-page;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(15%);
    }
  }

  @keyframes slide-to-left {
    to {
      transform: translateX(-5%);
    }
  }

  :root::view-transition-old(root) {
    animation:
      90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation:
      210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
      300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
</style>
