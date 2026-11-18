<script>
	import { Button } from '$lib/components/atoms'
	import { language, setLanguage } from '$lib/state/language.svelte.js'
</script>

<div class="language-switcher" role="group" aria-label="Language / Taal">
	{#each ['nl', 'en'] as code (code)}
		<Button
			text={code.toUpperCase()}
			variant="secondary-solid"
			classes="language-option"
			lang={code}
			data-language={code}
			aria-pressed={String(language.current === code)}
			onclick={() => setLanguage(code)}
		/>
	{/each}
</div>
