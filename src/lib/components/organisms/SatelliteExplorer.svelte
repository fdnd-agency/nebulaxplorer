<script>
	import { onMount } from 'svelte'
	import ExplorerToggle from '$lib/components/molecules/ExplorerToggle.svelte'
	import Explorer from '$lib/components/organisms/Explorer.svelte'
	import Viewer from '$lib/components/organisms/Viewer.svelte'
	import { text } from '$lib/state/language.svelte.js'

	let { explorer } = $props()

	const { state } = $derived(explorer)
	const visible = $derived(state.enhanced && explorer.isVisible())

	onMount(() => explorer.connect())
</script>

<main class="explorer-layout">
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
</main>
