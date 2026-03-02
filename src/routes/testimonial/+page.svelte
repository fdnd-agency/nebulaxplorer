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

<Hero
	pageTitle="Testimonials"
	background={{ alt: 'Two merging black holes', file: heroImg }}
	sronIcon={logo} />

<TestimonialHeader />

<Testimonial testimonials={data.testimonials} />
