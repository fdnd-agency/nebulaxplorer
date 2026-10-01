<script>
	import { Hero, TestimonialHeader, Testimonial } from '$lib'

	let { data } = $props()
</script>

<Hero pageTitle="Testimonials" />

<TestimonialHeader />

<Testimonial testimonials={data.testimonials} />
