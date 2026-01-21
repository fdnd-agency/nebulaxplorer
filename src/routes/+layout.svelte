<script>
  import { page } from "$app/stores";
  import { Footer } from "$lib";
  import favicon from "$lib/assets/logos/favicon.svg";
  import PageArrow from "$lib/assets/logos/PageArrow.svelte";
  import "$lib/assets/styles/general.css";
  import "$lib/assets/styles/layout.css";
  import { onNavigate } from "$app/navigation";

  let expanded = $state(false);

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        expanded = false;

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
    { path: "/assignments", label: "assignments" },
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
    aria-expanded={expanded || "false"}
    aria-controls="nav-items"
    onclick={() => (expanded = true)}
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
        <a href="#" class="menu-button" onclick={() => (expanded = false)}>
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
  /* default reduced-motion friendly transition */
  :root::view-transition-old(root) {
    animation: .2s ease both fade-out;
  }

  :root::view-transition-new(root) {
    animation: .4s ease .20s both fade-in;
  }

  @media (prefers-reduced-motion: no-preference) {
    :root::view-transition-old(root) {
      animation:
        .3s ease-in both zoom-out,
        .7s ease-out both slide-to-top;
    }

    :root::view-transition-new(root) {
      animation:
        .7s ease-out both slide-to-center,
        .3s ease-out .5s both zoom-in;
    }
  }
  @keyframes zoom-in {
    from {
      scale: 0.85;
    }
    to {
      scale: 1;
    }
  }

  @keyframes zoom-out {
    from {
      scale: 1;
    }
    to {
      scale: 0.85;
    }
  }

  @keyframes slide-to-top {
    from {
      translate: 0 0;
    }
    to {
      translate: 0 100%;
    }
  }

  @keyframes slide-to-center {
    from {
      translate: 0 -100%;
    }
    to {
      translate: 0 0%;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* These only need to happen on desktop */
  @media (min-width: 56.25rem) {
    .main-navigation {
      view-transition-name: header;
    }
    .exact-active :global(svg) {
      view-transition-name: active-page;
    }
  }
</style>
