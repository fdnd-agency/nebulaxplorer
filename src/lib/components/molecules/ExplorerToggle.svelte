<script>
	import Icon from '$lib/components/atoms/Icon.svelte'

	let { label, onclick } = $props()
</script>

<button
	type="button"
	class="explorer-toggle"
	aria-controls="explorer"
	aria-expanded="false"
	{onclick}
>
	<Icon name="menu" />
	<span class="explorer-toggle-label">{label}</span>
</button>
