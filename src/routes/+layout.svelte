<script>
  import { page } from "$app/stores";
  import favicon from "$lib/assets/icons/favicon.svg";
  import '$lib/assets/styles/general.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
<header>
  <nav>
    <ul>

      <ul>
        <li>
          <a
            href="/"
            aria-current={$page.url.pathname === "/" ? "page" : undefined}
            >home</a
          >
        </li>
        <li>
          <a
            href="/mission"
            aria-current={$page.url.pathname === "/mission"
              ? "page"
              : undefined}>mission</a
          >
        </li>
        <li>
          <a
            href="/scientific"
            aria-current={$page.url.pathname === "/scientific"
              ? "page"
              : undefined}>scientific</a
          >
        </li>
        <li>
          <a
            href="/news"
            aria-current={$page.url.pathname === "/news" ? "page" : undefined}
            >news</a
          >
        </li>
        <li>
          <a
            href="/team"
            aria-current={$page.url.pathname === "/team" ? "page" : undefined}
            >team</a
          >
        </li>
        <li>
          <a
            href="/careers"
            aria-current={$page.url.pathname === "/careers"
              ? "page"
              : undefined}>careers</a
          >
        </li>
        <li>
          <a
            href="/partners"
            aria-current={$page.url.pathname === "/partners"
              ? "page"
              : undefined}>partners</a
          >
        </li>
      </ul>
    </ul>
  </nav>
</header>
<main>
  {@render children?.()}
</main>

<style>
  header{
    background: var(--cleanroom-100);
  }
</style>