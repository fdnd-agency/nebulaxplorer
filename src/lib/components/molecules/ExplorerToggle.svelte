<script>
	import Icon from '$lib/components/atoms/Icon.svelte'

	let { expanded, label, onclick } = $props()
</script>

<button
	type="button"
	class="explorer-toggle"
	aria-controls="explorer"
	aria-expanded={String(expanded)}
	{onclick}
>
	<Icon name="menu" />
	<span class="explorer-toggle-label">{label}</span>
</button>
