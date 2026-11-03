<script>
	import LanguageSwitcher from '$lib/components/molecules/LanguageSwitcher.svelte'
	import { text } from '$lib/state/language.svelte.js'

	let { explorer } = $props()

	function goHome(event) {
		if (!explorer.state.enhanced) return
		event.preventDefault()
		explorer.navigate(explorer.tree.rootId, { source: 'breadcrumb' })
	}
</script>

<header class="site-header">
	<a class="brand" href="#satellite" data-explorer-home onclick={goHome}>
		<img
			class="brand-logo"
			src="/media/sron-logo.png"
			width="115"
			height="28"
			alt="SRON"
		/>
		<span class="brand-divider" aria-hidden="true"></span>
		<span class="brand-product">NEBULA Xplorer</span>
	</a>
	<nav class="site-navigation" aria-label="Site">
		<a href="https://nebulaxplorer.dev.fdnd.nl/" rel="noreferrer"
			>{text('mainWebsite')}</a
		>
	</nav>
	<LanguageSwitcher />
</header>
