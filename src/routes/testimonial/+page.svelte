<script>
	import {
		Hero,
		blackholeHeroEnhanced as heroImg,
		sronAcademyLogoOnSpaceBlue as logo,
		TestimonialHeader,
		Testimonial,
	} from '$lib'

	let { data } = $props()
</script>

<Hero pageTitle="Testimonials" />

<TestimonialHeader />

<Testimonial testimonials={data.testimonials} />
