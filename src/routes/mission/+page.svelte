<script>
	import {
		Hero,
		Breadcrumb,
		Timeline,
		ScientificTestimonial,
		blackholeEnhanced as blackholeImage,
		tarantulaMergerEnhanced,
	} from '$lib'
	import MissionGoals from '$lib/components/organisms/MissionGoals.svelte'
</script>

<svelte:head>
	<title>Mission</title>
	<meta
		name="description"
		content="NEBULA-Xplorer will investigate how jets form and how X-ray binaries evolve. It will observe these objects for long periods of time to see how their emission varies on time scales from milliseconds to weeks." />
</svelte:head>

<!-- HERO BLOCK -->
<Hero
	titleColor="var(--white)"
	background={{
		file: tarantulaMergerEnhanced,
		alt: 'Visualization of a Black Hole Merger in the Tarantula Nebula',
	}}
	pageTitle="Mission"
	attribution={{
		text: 'NASA',
		link: 'https://apod.nasa.gov/apod/ap260403.html',
	}} />

<Breadcrumb />

<!-- FIRST PARAGRAPH + IMG BLOCK -->

<hgroup class="text-title">
	<div class="content-container">
		<h2 class="subtitle">
			What are we <span class="orange">up</span> to?
		</h2>
		<p class="heading">What our current project entails</p>
	</div>
</hgroup>

<section class="paragraph-block">
	<div class="content-container">
		<section class="text-content">
			<h3 class="orange heading">Dense matter and compact objects</h3>
			<p>
				NEBULA-Xplorer will investigate compact objects such as neutron
				stars and black hole X-ray binaries within our Milky Way. By
				investigating these objects, we can learn about fundamental
				physics such as strong gravity and the equation of state of
				neutron stars. We can also learn about accretion processes in
				extreme environments, unable to be reproduced in lab conditions.
				NEBULA-Xplorer’s coverage of the 0.5-12keV energy range will
				allow us to observe both the inner-most regions of these
				systems, where light is most affected by the gravity of compact
				objects and the magnetic environment of neutron stars.
			</p>
			<p>
				By observing black holes in this energy range, we can also
				measure the spin of black holes by observing the relativistic
				smearing of emission resulting from the illumination of the disk
				by the corona or by measuring the inner radius of the accretion
				disk through broad continuum fitting. Understanding the spin
				population of black holes within X-ray binaries has major
				implications for stellar evolution in binary systems which are
				estimated to make up to 85% of star systems in our universe.
			</p>
		</section>
		<enhanced:img src={blackholeImage} alt="Black Hole" />
	</div>
</section>

<!-- SECOND IMG + PARAGRAPH BLOCK -->

<section class="paragraph-block paragraph-block-alt">
	<div class="content-container">
		<enhanced:img
			class="paragraph-img-left"
			src={blackholeImage}
			alt="Black Hole" />
		<section class="text-content">
			<h3 class="orange heading">Multi-messenger physics</h3>
			<p>
				NEBULA-Xplorer frames the multi-wavelength campaigns required to
				understand jet and accretion physics at the forefront of its
				design: emphasizing the ability to maximize X-ray observations
				of time uncertain, fast evolving changes in the accretion flow
				by tying together fine time resolution of 1 microsecond and the
				ability to maintain as close to continuous observations of
				targets as possible.
			</p>
			<p>
				During longer observations, NEBULA-Xplorer will transmit timing
				information key to understanding when ballistic jet ejections
				are launched to the ground to trigger observations from
				competitive ground-based facilities such as the radio
				interferometer SKA and mm observatory AMT to maximize the
				effectiveness of multi-wavelength observations of jets.
				NEBULA-Xplorer will also work with optical facilities to better
				understand how activity in the outer accretion disk of these
				systems propagates into the inner-most regions.
			</p>
		</section>
	</div>
</section>

<!-- THIRD PARAGRAPH + IMG BLOCK -->

<section class="paragraph-block">
	<div class="content-container">
		<section class="text-content">
			<h3 class="orange heading">Time-domain Astrophysics</h3>
			<p>
				As a non-imaging X-ray timing observatory, NEBULA-Xplorer’s core
				science focuses on interpreting the variability of emission from
				the sources that it observes. This includes more traditional
				ways of thinking about variability such as looking for
				quasi-periodic signals in source light curve and phase-folded
				pulse profile modeling of neutron star surfaces but also
				includes topics such as “dipping” in the light curve produced by
				clumps of material produced by winds from both the accretion
				disk and companion star in these systems obscuring the central
				accretion engine.
			</p>
			<p>
				Frequently, changes in variability are affected by multiple
				phenomena in the system that evolve on different time scales,
				making it difficult to understand how important each phenomenon
				is to driving transient outbursts or is linked to the
				fundamental process of accretion. NEBULA-Xplorer’s emphasis on
				performing continuous longer observations of individual sources
				will allow us to understand the short-term variability of
				emission and how that changes on timescales of days to weeks.
			</p>
			<p>
				NEBULA-Xplorer’s moderate energy resolution and high timing
				resolution will also allow us to perform spectral-timing
				analysis of bright systems, like that of the NICER telescope.
				Spectral timing allows for the investigation of how variability
				changes with energy, which can be used to trace how the geometry
				of X-ray sources changes through time as well as understand the
				distances between different parts of the system through modeling
				of light travel time within the system.
			</p>
		</section>
		<enhanced:img src={blackholeImage} alt="Black Hole" />
	</div>
</section>

<MissionGoals />

<!-- STEPS BLOCK -->
<Timeline />

<ScientificTestimonial />

<style>
	.paragraph-block div {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: inherit;
		row-gap: unset;
		margin-bottom: 1rem;
		align-items: center;

		> *:not(enhanced\:img, img, picture) {
			grid-column: 1 / -1;
			max-width: 43.75rem;

			@media (min-width: 36.25rem) {
				grid-column: 1 / 8;
				padding-right: 1.5rem;
			}
		}

		.text-content {
			grid-row: 1 / 2;

			* + p {
				margin-top: 0.5rem;
				line-height: 1.7;
			}
		}

		.text-content,
		picture {
			margin-top: 3rem;
		}

		picture {
			grid-column: 8 / -1;
			grid-row: 1 / 2;
			height: fit-content;
			display: none;

			@media (min-width: 36.25rem) {
				display: block;
			}

			enhanced\:img,
			img {
				width: 100%;
				object-fit: cover;
				max-height: 22.8125rem;
			}
		}
	}

	.paragraph-block-alt {
		background-color: var(--white);
		color: var(--space-100);

		div {
			padding-bottom: 2rem;
			font-weight: 500;

			> *:not(enhanced\:img, img, picture) {
				@media (min-width: 36.25rem) {
					grid-column: 6 / -1;
					padding-left: 1.5rem;
					justify-self: flex-end;
				}
			}

			picture {
				grid-column: 1 / 6;
				grid-row: 1 / 2;

				enhanced\:img,
				img {
					display: none;

					@media (min-width: 36.25rem) {
						display: block;
						width: 100%;
						object-fit: cover;
						max-height: 22.8125rem;
					}
				}
			}
		}
	}

	/* util classes */
	.orange {
		color: var(--cleanroom-100);
	}

	:global(enhanced\:img) {
		width: auto;
	}

	h2,
	h3 {
		font-weight: 600;
		line-height: 1.5;
	}
</style>
