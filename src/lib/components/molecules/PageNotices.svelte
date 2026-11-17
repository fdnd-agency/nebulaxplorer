<script>
	import PageNotice from '$lib/components/atoms/PageNotice.svelte'
	import { text } from '$lib/state/language.svelte.js'

	// The note for visitors without JavaScript sits in the explorer introduction
	let { fallback } = $props()
</script>

<PageNotice data-fallback-notice="" hidden={!fallback}>
	{fallback ? text('fallback') : ''}
</PageNotice>
