<script>
	import { pickFor } from '$lib/state/language.svelte.js'

	let { blocks, enhanced = true } = $props()
</script>

{#each blocks as block, index (index)}
	{#if block.kind === 'lead'}
		<p class="explorer-lead">{pickFor(enhanced, block.text)}</p>
	{:else if block.kind === 'note'}
		<p class="explorer-note">{pickFor(enhanced, block.text)}</p>
	{:else}
		<div class="explorer-about">
			{#each block.paragraphs as paragraph, paragraphIndex (paragraphIndex)}
				<!-- A variant can be empty when its sentence is already shown above -->
				{#if pickFor(enhanced, paragraph)}
					<p>{pickFor(enhanced, paragraph)}</p>
				{/if}
			{/each}
		</div>
	{/if}
{/each}
