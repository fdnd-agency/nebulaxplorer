<script>
	// import FooterLocations from '../molecules/FooterLocations.svelte';
	import {
		FooterLocations,
		FooterNav,
	} from '$lib'

	const { navItems } = $props()
</script>

<footer>
	<FooterLocations />
	<FooterNav {navItems} />
</footer>
