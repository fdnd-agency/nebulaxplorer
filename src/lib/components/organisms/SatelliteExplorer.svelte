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

	onMount(() => explorer.connect())

	// Runs while the page is being read, before it is drawn: with JavaScript
	// the 3D view takes the place of the page without it, so that page does not
	// flash up first. If the 3D view has not started after 8 seconds (an error,
	// a very slow connection), the page without it is shown after all.
	const pendingScript = `<script>{const page = document.currentScript.parentElement; page.classList.add('js-pending'); setTimeout(() => page.classList.remove('js-pending'), 8000)}<\/script>`
</script>

<!-- The explorer switches between English and Dutch on its own; the rest of
     the site keeps its language -->
<div class="satellite-page" lang={language.current}>
	{@html pendingScript}
	<PageNotices fallback={state.fallback} />

	<div class="explorer-layout">
		<Viewer
			{explorer}
			onReady={explorer.enhance}
			onUnsupported={explorer.showFallback}
		/>

		<Explorer {explorer} />

		<!-- In full screen the explorer can be hidden; this bar brings it back -->
		{#if state.explorerHidden}
			<ExplorerToggle
				label={text('showExplorer')}
				onclick={() => explorer.setExplorerHidden(false)}
			/>
		{/if}

		<LanguageSwitcher />
	</div>

	<StatusMessage message={state.announcement} />
</div>
