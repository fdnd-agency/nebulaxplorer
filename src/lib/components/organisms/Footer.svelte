<script>
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
