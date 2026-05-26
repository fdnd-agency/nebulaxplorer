<script>
	import { mertenImage, MissionTestimonial } from '$lib'

	const data = [
		{
			text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure vel eaque, distinctio deserunt minus perspiciatis vero cum quasi voluptate ad fuga nesciunt eligendi sunt unde repellendus molestias non sequi officiis!',
			name: 'Martin Grim',
			title: 'Section Head Electronics Engineering',
			image: mertenImage,
		},
		{
			text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure vel eaque, distinctio deserunt minus perspiciati.',
			name: 'Martin Grim',
			title: 'Section Head Electronics Engineering',
			image: mertenImage,
		},
		{
			text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure vel eaque, distinctio deserunt minus perspiciatis vero cum quasi voluptate ad fuga nesciunt eligendi sunt.',
			name: 'Martin Grim',
			title: 'Section Head Electronics Engineering',
			image: mertenImage,
		},
	]
</script>

<section>
	<h2 class="heading">What our experts say</h2>
	<ul>
		{#each data as testimonial (testimonial.text)}
			<MissionTestimonial {testimonial} />
		{/each}
	</ul>
</section>

<style>
	section {
		margin-block-end: calc(2rem + 2vw);
	}

	h2 {
		max-width: var(--content-width);
		margin-inline: auto;
		margin-block-end: 1em;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: 2rem;
		max-width: var(--content-width);
		margin-inline: auto;
		list-style: none;
	}
</style>
