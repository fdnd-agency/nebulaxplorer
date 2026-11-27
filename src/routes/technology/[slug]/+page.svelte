<script>
  import TechnologyDetail from '$lib/components/molecules/TechnologyDetail.svelte';

  let { data } = $props();
</script>

{#if data.technology}
  <TechnologyDetail technology={data.technology} />
{:else}
  <h1>Technology not found</h1>
{/if}