<script>
  import { page } from "$app/stores";
  import favicon from "$lib/assets/icons/favicon.svg";
  import '$lib/assets/styles/general.css';

  let { children } = $props();
  
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main>
  {@render children?.()}
</main>
