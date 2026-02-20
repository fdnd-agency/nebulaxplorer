<script>
	// import FooterLocations from '../molecules/FooterLocations.svelte';
	import {
		sronLeidenEnhanced as leidenImg,
		sronGroningenEnhanced as groningenImg,
		sronAcademyLogoOnSpaceBlue as SRON_Academy_OnSpaceBlue,
		sronLogoFullWhite as SRON_full_white,
		nwoIcon as NwoIcon,
		Instagram as InstagramIcon,
		LinkedIn as LinkedinIcon,
		Bsky as BskyIcon,
		Arrow,
		FooterLocations,
		FooterNav,
	} from '$lib'

	const { navItems } = $props()
</script>

<footer>
	<FooterLocations />
	<FooterNav {navItems} />
</footer>
