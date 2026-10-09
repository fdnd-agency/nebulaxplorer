<script>
  import { enhance } from "$app/forms";
</script>

<form method="POST" action="?/subscribe" use:enhance>
  <label for="email">
    <span class="visually-hidden">Email</span>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Enter your email address..."
      autocomplete="email"
      required
    />
  </label>
  <button type="submit">Subscribe</button>
</form>
