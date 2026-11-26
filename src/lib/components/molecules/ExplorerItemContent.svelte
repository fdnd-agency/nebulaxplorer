<script>
	import { Paragraph } from '$lib/components/atoms'
	import { pickFor } from '$lib/state/language.svelte.js'

	let {
		blocks,
		enhanced = true,
	} = $props()
</script>

{#each blocks as block, index (index)}
	{#if block.kind === 'lead'}
		<div class="explorer-lead">
			<Paragraph>{pickFor(enhanced, block.text)}</Paragraph>
		</div>
	{:else if block.kind === 'note'}
		<div class="explorer-note">
			<Paragraph>{pickFor(enhanced, block.text)}</Paragraph>
		</div>
	{:else}
		<div class="explorer-about">
			{#each block.paragraphs as paragraph, paragraphIndex (paragraphIndex)}
				<!-- A variant can be empty when its sentence is already shown above -->
				{#if pickFor(enhanced, paragraph)}
					<Paragraph>{pickFor(enhanced, paragraph)}</Paragraph>
				{/if}
			{/each}
		</div>
	{/if}
{/each}
