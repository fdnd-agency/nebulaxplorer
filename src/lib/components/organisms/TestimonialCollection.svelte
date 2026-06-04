<script>
	import { mertenImage, rushilImage, MissionTestimonial } from '$lib'

	const data = [
		{
			text: 'The project all corporate projects wish they could be. The place where agile is actually agile. Heed my words dear reader, this project will serve as valuable experience of the things that can be done right. This was as great experience!',
			name: 'Rushil Varsnney',
			title: 'Aero Space Engineering, TU Delft',
			image: rushilImage,
		},
		{
			text: "Doing my JIP was a great experience. It really helped that although the JIP and NEBULA-Xplorer team all came from different backgrounds, they all brought the same energy. One meeting I was learning how one previous assumption in power usage can completely change the current concept, and other times I was the one walking everyone through our approach on the system architecture. And knowing that you're working on a real telescope that will actually be launched, is really motivating. I now have the opportunity to start my thesis here as well!",
			name: 'Merten Tijsma',
			title: 'Aero Space Engineering, TU Delft',
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

<section class="background-dark">
	<h2 class="heading">What our experts say</h2>
	<ul>
		{#each data as testimonial (testimonial.text)}
			<MissionTestimonial {testimonial} />
		{/each}
	</ul>
</section>

<style>
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
