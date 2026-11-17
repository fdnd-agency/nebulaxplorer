<script>
	import '$lib/styles/satellite-explorer.css'

	import { StatusMessage } from '$lib/components/atoms'
	import { LanguageSwitcher, PageNotices } from '$lib/components/molecules'
	import { SatelliteExplorer } from '$lib/components/organisms'
	import { createExplorer } from '$lib/state/explorer.svelte.js'
	import { language } from '$lib/state/language.svelte.js'

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

<!-- The explorer switches between English and Dutch on its own; the rest of
     the site keeps its language -->
<div class="satellite-page" lang={language.current}>
	<PageNotices fallback={state.fallback} />
	<SatelliteExplorer {explorer}>
		<LanguageSwitcher />
	</SatelliteExplorer>
	<StatusMessage message={state.announcement} />
</div>
