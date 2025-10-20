<script>
  import { Hero } from "$lib";
  // ! NOTE: important to include ?enhanced, otherwise no optimization takes place nor does it get rendered !
  import heroImg from "$lib/assets/images/grav-waves.jpg?enhanced"
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>
<!-- Always provide alt and file path WITHIN background -->
<Hero pageTitle="Careers" background={{ alt: "Two merging black holes", file: heroImg }} />