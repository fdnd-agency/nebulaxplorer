<script>
	import Icon from '$lib/components/atoms/Icon.svelte'

	let {
		control,
		icon,
		label,
		hidden,
		playing = undefined,
		pressed = undefined,
		iconOnly = false,
		onclick,
	} = $props()

	const toggles = $derived(playing !== undefined)
</script>

<button
	type="button"
	class={['viewer-control', iconOnly && 'is-icon-only']}
	data-control={control}
	title={iconOnly ? label : undefined}
	data-state={toggles ? (playing ? 'playing' : 'paused') : undefined}
	aria-pressed={pressed === undefined ? undefined : String(pressed)}
	{hidden}
	{onclick}
>
	{#if toggles}
		<Icon name="pause" stateful />
		<Icon name="play" stateful />
	{:else}
		<Icon name={icon} />
	{/if}
	<span class="viewer-control-label">{label}</span>
</button>
