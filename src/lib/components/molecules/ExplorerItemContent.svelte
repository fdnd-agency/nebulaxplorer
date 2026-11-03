<script>
	import { pick } from '$lib/state/language.svelte.js'

	let { blocks } = $props()
</script>

{#each blocks as block, index (index)}
	{#if block.kind === 'lead'}
		<p class="explorer-lead">{pick(block.text)}</p>
	{:else if block.kind === 'note'}
		<p class="explorer-note">{pick(block.text)}</p>
	{:else}
		<div class="explorer-about">
			{#each block.paragraphs as paragraph, paragraphIndex (paragraphIndex)}
				<p>{pick(paragraph)}</p>
			{/each}
		</div>
	{/if}
{/each}
