<script>
	import '@fontsource/space-grotesk/400.css'
	import '@fontsource/roboto/500.css'
	import '$lib/styles/satellite-explorer.css'

	import {
		PageNotices,
		SatelliteExplorer,
		SiteHeader,
		SkipLink,
		StatusMessage,
	} from '$lib/index.js'
	import { createExplorer } from '$lib/state/explorer.svelte.js'
	import { text } from '$lib/state/language.svelte.js'

	let { data } = $props()

	// The content is static, so the explorer is created once from the first value
	// svelte-ignore state_referenced_locally
	const explorer = createExplorer(data.explorerContent)
	const { state } = explorer
</script>

<svelte:head>
	<title>Technology - NebulaXPlorer</title>
	<meta
		name="description"
		content="Explore the NEBULA Xplorer satellite in 3D: its components, the X-ray instrument inside it and how its X-ray optics work."
	/>
</svelte:head>

<div class="satellite-page">
	<SkipLink
		href="#explorer"
		label={text('skipLink')}
		onclick={explorer.skipToExplorer}
	/>
	<SiteHeader {explorer} />
	<PageNotices fallback={state.fallback} />
	<SatelliteExplorer {explorer} />
	<StatusMessage message={state.announcement} />
</div>
