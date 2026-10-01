<script>
	import Button from "$lib/components/atoms/Button.svelte"
</script>

<svelte:head>
	<title>Home - NebulaXPlorer</title>
</svelte:head>

<div class="div1">
	<Button text="Bekijk vacatures" variant="primary" />
	<Button text="Bekijk vacatures" variant="primary" disabled />
</div>
<div class="div2">
	<Button text="Verstuur bericht" variant="secondary" />
	<Button text="Verstuur bericht" variant="secondary" disabled />
</div>

<style>
	.div1{
		background-color: var(--color-accent-dark);
		padding: 1rem;
	}
	.div2{
		background-color: var(--color-brand-darkest);
		padding: 1rem;
	}
</style>