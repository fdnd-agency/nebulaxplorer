<script>
	import { rushilImage } from '$lib'

	let { testimonial } = $props()
</script>

<section>
	<img src={rushilImage} alt="" />
	<blockquote>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nihil
		inventore pariatur quasi nemo sint dolore optio. Quaerat in, sapiente,
		reprehenderit quas provident nemo optio autem distinctio, soluta
		consectetur molestias.
	</blockquote>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 2rem 1fr;
		grid-template-rows: 1fr 2fr 1fr;
	}

	img {
		width: 20em;
	}

	blockquote {
		background-color: var(--cleanroom-100);
		border-radius: 50px 0;
		width: 20em;
		padding: 2rem;
	}
</style>
