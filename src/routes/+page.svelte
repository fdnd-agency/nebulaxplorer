<script>
	import img from '$lib/assets/images/Header_Homepage-2.png'
</script>

<svelte:head>
	<title>Home - NebulaXPlorer</title>
</svelte:head>

<section>
	<img src="{ img }" alt="">
	<h1>NEBULA - Xplorer</h1>
</section>
<section class="placeholder"></section>


<style>
	h1{
		color: var(--color-neutral-lighter);
		margin-top: 3rem;
		margin-bottom: 15rem;
		margin-left: 10%;
	}
	img{
		position: absolute;
		inset: 0;
		width: 100%;
		z-index: -100;
		height: 50vh;
	}
	.placeholder{
		margin-top: 10rem;
		margin-bottom: 10rem;
		height: 10rem;
		width: 100%;
	}
</style>