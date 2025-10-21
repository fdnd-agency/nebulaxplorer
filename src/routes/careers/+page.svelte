<script>
  import { Hero } from "$lib";
  // ! NOTE: important to include ?enhanced, otherwise no optimization takes place nor does it get rendered !
  import heroImg from "$lib/assets/images/grav-waves.jpg?enhanced"
  import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg"
</script>

<!-- Always provide alt and file path WITHIN background -->
<Hero pageTitle="Careers" background={{ alt: "Two merging black holes", file: heroImg }} sronIcon={logo} />