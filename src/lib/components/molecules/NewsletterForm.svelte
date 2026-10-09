<script>
  import { enhance } from "$app/forms";

  let sent = $state(false);
</script>

<form
  method="POST"
  action="?/subscribe"
  use:enhance
  onsubmit={() => (sent = true)}
>
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
  <button type="submit">{sent ? "Succesfully subscribed!" : "Subscribe"}</button
  >
</form>
