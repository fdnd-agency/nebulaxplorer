<script>
	let { testimonial } = $props()
</script>

<li>
	<blockquote>{testimonial.text}</blockquote>
	<p>{testimonial.name}</p>
	<p>{testimonial.title}</p>
	<img src={testimonial.image} alt="" width="200" />
</li>

<style>
	img {
		height: 8rem;
		width: 8rem;
		object-fit: cover;
	}
</style>
