<script>
	import '$lib/styles/satellite-explorer.css'

	import { onMount } from 'svelte'
	import StatusMessage from '$lib/components/atoms/StatusMessage.svelte'
	import ExplorerToggle from '$lib/components/molecules/ExplorerToggle.svelte'
	import LanguageSwitcher from '$lib/components/molecules/LanguageSwitcher.svelte'
	import PageNotices from '$lib/components/molecules/PageNotices.svelte'
	import Explorer from '$lib/components/organisms/Explorer.svelte'
	import Viewer from '$lib/components/organisms/Viewer.svelte'
	import { createExplorer } from '$lib/state/explorer.svelte.js'
	import { language, text } from '$lib/state/language.svelte.js'

	let { content } = $props()

	// The content is static, so the explorer is created once from the first value
	// svelte-ignore state_referenced_locally
	const explorer = createExplorer(content)
	const { state } = explorer
	const visible = $derived(state.enhanced && explorer.isVisible())

	onMount(() => explorer.connect())
</script>

<!-- The explorer switches between English and Dutch on its own; the rest of
     the site keeps its language -->
<div class="satellite-page" lang={language.current}>
	<PageNotices fallback={state.fallback} />

	<div class="explorer-layout">
		<ExplorerToggle
			expanded={visible}
			label={text('exploreSatellite')}
			onclick={() => explorer.openExplorer()}
		/>

		<Viewer
			{explorer}
			onReady={explorer.enhance}
			onUnsupported={explorer.showFallback}
		/>

		<Explorer {explorer} />

		<LanguageSwitcher />
	</div>

	<StatusMessage message={state.announcement} />
</div>
