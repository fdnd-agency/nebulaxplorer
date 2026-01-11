<script>
    import { Hero } from "$lib";
    import heroImg from "$lib/assets/images/grav-waves.jpg?enhanced";
    import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
    import TestimonialHeader from "$lib/components/molecules/TestimonialHeader/TestimonialHeader.svelte";
    import Testimonial from "$lib/components/molecules/Testimonial/Testimonial.svelte";
</script>

<Hero
  pageTitle="Testimonials"
  background={{ alt: "Two merging black holes", file: heroImg }}
  sronIcon={logo}
/>

<TestimonialHeader />

<Testimonial />