<script>
	import { language, setLanguage } from '$lib/state/language.svelte.js'
</script>

<div class="language-switcher" role="group" aria-label="Language / Taal">
	<button
		type="button"
		data-language="nl"
		aria-pressed={String(language.current === 'nl')}
		lang="nl"
		onclick={() => setLanguage('nl')}>NL</button
	>
	<button
		type="button"
		data-language="en"
		aria-pressed={String(language.current === 'en')}
		lang="en"
		onclick={() => setLanguage('en')}>EN</button
	>
</div>
