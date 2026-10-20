<script>
  let { value = "" } = $props();
</script>

<form class="search-form" method="GET" action="/search">
  <label for="search">
    <span class="visually-hidden">Zoeken</span>
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Zoeken..."
      {value}
    />
  </label>
  <button type="submit">Zoeken</button>
</form>
