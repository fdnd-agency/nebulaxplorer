<script>
	import { HamburgerButton } from '$lib/components/atoms'

	// The team's menu button, here for the satellite explorer: in full screen
	// it brings the hidden explorer back
	let { label, onclick } = $props()
</script>

<HamburgerButton
	{label}
	{onclick}
	classes="explorer-toggle"
	aria-controls="explorer"
	aria-expanded="false"
	title={label}
/>
