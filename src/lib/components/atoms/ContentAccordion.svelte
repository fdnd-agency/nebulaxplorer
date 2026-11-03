<script>
  let { label = "Read more", children } = $props();
</script>

<details>
  <summary>{label}</summary>
  <div class="content">
    {@render children()}
  </div>
</details>

