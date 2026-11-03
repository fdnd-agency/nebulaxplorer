<script>
	import PageNotice from '$lib/components/atoms/PageNotice.svelte'
	import { text } from '$lib/state/language.svelte.js'

	let { fallback } = $props()
</script>

<noscript>
	<PageNotice>
		The interactive 3D model needs JavaScript. All satellite information is
		available on this page.
	</PageNotice>
</noscript>
<PageNotice data-fallback-notice="" hidden={!fallback}>
	{fallback ? text('fallback') : ''}
</PageNotice>
