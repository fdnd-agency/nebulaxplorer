<script>
  import { page } from "$app/stores";
  import favicon from "$lib/assets/icons/favicon.svg";
  import PageArrow from "$lib/assets/icons/PageArrow.svelte";
  import "$lib/assets/styles/general.css";
  import "$lib/assets/styles/layout.css";

  const isParentActive = (path) => {
    return $page.url.pathname.startsWith(`${path}/`);
  };

  const isExactActive = (path) => {
    return $page.url.pathname === path;
  };

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="main-navigation">
  <a
    href="#menu"
    class="burger"
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
      <li>
        <a href="#">
          close
          <div></div>
        </a>
      </li>
      <li
        class={isExactActive("/")
          ? "exact-active"
          : isParentActive("/")
            ? "parent-active"
            : ""}
      >
        <PageArrow />
        <a href="/" aria-current={isExactActive("/") ? "page" : undefined}>
          home
        </a>
      </li>
      <li
        class={isExactActive("/mission")
          ? "exact-active"
          : isParentActive("/mission")
            ? "parent-active"
            : ""}
      >
        <PageArrow />
        <a
          href="/mission"
          aria-current={isExactActive("/mission") ? "page" : undefined}
        >
          mission
        </a>
      </li>
      <li
        class={isExactActive("/scientific")
          ? "exact-active"
          : isParentActive("/scientific")
            ? "parent-active"
            : ""}
      >
        <PageArrow />
        <a
          href="/scientific"
          aria-current={isExactActive("/scientific") ? "page" : undefined}
        >
          scientific
        </a>
      </li>
      <li
        class={isExactActive("/news")
          ? "exact-active"
          : isParentActive("/news")
            ? "parent-active"
            : ""}
      >
        <PageArrow />
        <a
          href="/news"
          aria-current={isExactActive("/news") ? "page" : undefined}
        >
          news
        </a>
      </li>
      <li
        class={isExactActive("/team")
          ? "exact-active"
          : isParentActive("/team")
            ? "parent-active"
            : ""}
      >
        <PageArrow />
        <a
          href="/team"
          aria-current={isExactActive("/team") ? "page" : undefined}
        >
          team
        </a>
      </li>
      <li
        class={isExactActive("/careers")
          ? "exact-active"
          : isParentActive("/careers")
            ? "parent-active"
            : ""}
      >
        <PageArrow />
        <a
          href="/careers"
          aria-current={isExactActive("/careers") ? "page" : undefined}
          >careers</a
        >
      </li>
      <li
        class={isExactActive("/partners")
          ? "exact-active"
          : isParentActive("/careers")
            ? "parent-active"
            : ""}
      >
        <PageArrow />
        <a
          href="/partners"
          aria-current={isExactActive("/partners") ? "page" : undefined}
        >
          partners
        </a>
      </li>
    </ul>
  </nav>
</header>
<main>
  {@render children?.()}
</main>
