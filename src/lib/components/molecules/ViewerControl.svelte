<script>
	import { Button } from '$lib/components/atoms'
	import {
		FullscreenIcon,
		LayersIcon,
		PauseIcon,
		PlayIcon,
		ResetIcon,
	} from '$lib/assets/icons'

	// A button of the 3D view (the team's Button): `playing` makes it a
	// pause/play toggle, `iconOnly` shows only the icon with the label as
	// tooltip and for screen readers
	let {
		control,
		icon: iconName,
		label,
		hidden,
		playing = undefined,
		pressed = undefined,
		iconOnly = false,
		onclick,
	} = $props()

	const icons = {
		layers: LayersIcon,
		reset: ResetIcon,
		fullscreen: FullscreenIcon,
		fullscreenExit: FullscreenIcon,
	}
	const Glyph = $derived(
		playing === undefined
			? icons[iconName]
			: playing
				? PauseIcon
				: PlayIcon,
	)
</script>

<Button
	text={iconOnly ? '' : label}
	variant="primary-solid"
	iconPosition="before"
	classes={['viewer-control', iconOnly && 'is-icon-only']}
	data-control={control}
	aria-pressed={pressed === undefined ? undefined : String(pressed)}
	aria-label={iconOnly ? label : undefined}
	title={iconOnly ? label : undefined}
	{hidden}
	{onclick}
>
	{#snippet icon()}
		<Glyph exit={iconName === 'fullscreenExit'} width={16} height={16} />
	{/snippet}
</Button>
