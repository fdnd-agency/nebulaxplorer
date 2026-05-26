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

<ul>
	{#each data as testimonial (testimonial.text)}
		<MissionTestimonial {testimonial} />
	{/each}
</ul>

<style>
</style>
