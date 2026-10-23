<script>
	import { text } from '$lib/state/language.svelte.js'
</script>

<footer class="explorer-credits">
	<p>
		<span>{text('missionCredit')}</span>
		<img src="/media/sron-logo.png" width="66" height="16" alt="SRON" />
	</p>
	<p class="explorer-credits-link">
		<a href="https://nebulaxplorer.dev.fdnd.nl/" rel="noreferrer"
			>{text('mainWebsite')}</a
		>
	</p>
</footer>
