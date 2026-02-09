<script>
  import Hero from '$lib/components/molecules/Hero/Hero.svelte'
	import heroImg from '$lib/assets/images/grav-waves.jpg?enhanced'
	import logo from '$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg'
</script>

<Hero
	titleColor="var(--white)"
	pageTitle="Nebula Xplorer"
	background={{ alt: 'Two merging black holes', file: heroImg }}
	sronIcon={logo} />