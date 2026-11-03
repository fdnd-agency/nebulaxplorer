<script>
	let { hidden, number, name, tag } = $props()
</script>

<p class="viewer-label" aria-hidden="true" {hidden}>
	<span class="viewer-label-number">{number}</span>
	<span class="viewer-label-name">{name}</span>
	<span class="viewer-tag" hidden={!tag}>{tag}</span>
</p>
