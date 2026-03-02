<script module>
	import {
		Hero,
		Breadcrumb,
		blackholeEnhanced as blackholeImage,
		sronReviewStep1Enhanced as step1Image,
		rapidStep2Enhanced as step2Image,
		nebulaXplorerEnhanced as step3Image,
		aeroDefenseTestingStep4Enhanced as step4Image,
		rocketLaunchStep5Enhanced as step5Image,
		sronAcademyLogoOnSpaceBlue as logo,
		blackholeHeroEnhanced as heroImg,
	} from '$lib'
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
	pageTitle="Mission"
	background={{ alt: 'Two merging black holes', file: heroImg }}
	sronIcon={logo} />

<Breadcrumb />

<!-- FIRST PARAGRAPH + IMG BLOCK -->

<section class="paragraph-block">
	<div class="text-title">
		<h2 class="subtitle">What are we <span class="orange">up</span> to?</h2>
		<p class="heading">What our current project entails</p>
	</div>

	<section class="text-content">
		<article>
			<h4 class="orange heading">Dense matter and compact objects</h4>
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
		</article>
	</section>
	<enhanced:img src={blackholeImage} alt="Black Hole" />
</section>

<!-- SECOND IMG + PARAGRAPH BLOCK -->

<section class="paragraph-block-right">
	<enhanced:img
		class="paragraph-img-left"
		src={blackholeImage}
		alt="Black Hole" />
	<section class="text-content-right">
		<article>
			<h4 class="orange heading">Multi-messenger physics</h4>
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
		</article>
	</section>
</section>

<!-- THIRD PARAGRAPH + IMG BLOCK -->

<section class="paragraph-block-3">
	<section class="text-content-3">
		<article>
			<h4 class="orange heading">Time-domain Astrophysics</h4>
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
		</article>
	</section>
	<enhanced:img src={blackholeImage} alt="Black Hole" />
</section>

<!-- STEPS BLOCK -->

<section class="steps-block">
	<h3 class="subtitle text-content--title">
		The <span class="orange">steps to</span> take before
		<span class="orange">launch</span>
	</h3>
	<ul
		class="steps-content"
		role="region"
		aria-label="De stappen voor de lancering">
		<li class="step-item">
			<div
				tabindex="0"
				role="button"
				aria-label="Step 1: Requirements and Design Review">
				<input type="checkbox" id="step-1" class="step-checkbox" />
				<label for="step-1" class="step-label">
					<span class="step-number caption">1</span>
					<enhanced:img
						class="steps-img"
						src={step1Image}
						alt="Step 1 for launch" />
					<p class="steps-img-overlay">
						Requirements and Design Review
					</p>
				</label>
			</div>
		</li>

		<li class="step-item">
			<div
				tabindex="0"
				role="button"
				aria-label="Step 2: Rapid prototyping of critical technologies">
				<input type="checkbox" id="step-2" class="step-checkbox" />
				<label for="step-2" class="step-label">
					<span class="step-number caption">2</span>
					<enhanced:img
						class="steps-img"
						src={step2Image}
						alt="Step 2 for launch" />
					<p class="steps-img-overlay">
						Rapid prototyping of critical technologies
					</p>
				</label>
			</div>
		</li>

		<li class="step-item">
			<div
				tabindex="0"
				role="button"
				aria-label="Step 3: Engineering models development">
				<input type="checkbox" id="step-3" class="step-checkbox" />
				<label for="step-3" class="step-label">
					<span class="step-number caption">3</span>
					<enhanced:img
						class="steps-img"
						src={step3Image}
						alt="Step 3 for launch" />
					<p class="steps-img-overlay">
						Engineering models development
					</p>
				</label>
			</div>
		</li>

		<li class="step-item">
			<div
				tabindex="0"
				role="button"
				aria-label="Step 4: Build and test of Flight Model ">
				<input type="checkbox" id="step-4" class="step-checkbox" />
				<label for="step-4" class="step-label">
					<span class="step-number caption">4</span>
					<enhanced:img
						class="steps-img"
						src={step4Image}
						alt="Step 4 for launch" />
					<p class="steps-img-overlay">
						Build and test of Flight Model
					</p>
				</label>
			</div>
		</li>

		<li class="step-item">
			<div tabindex="0" role="button" aria-label="Step 5: Launch">
				<input type="checkbox" id="step-5" class="step-checkbox" />
				<label for="step-5" class="step-label">
					<span class="step-number caption">5</span>
					<enhanced:img
						class="steps-img"
						src={step5Image}
						alt="Step 5 for launch" />
					<p class="steps-img-overlay">Launch</p>
				</label>
			</div>
		</li>
	</ul>
</section>

<figure class="testimonial-container">
	<blockquote class="testimonial-content">
		<!-- <Quote /> -->
		<p class="testimonial-text">
			Working with SRON's Nebula Xplorer team has been an incredible
			experience. Being part of the mission to prepare the Nebula Xplorer
			for launch taught me so much about space instrumentation and
			teamwork. The dedication and expertise of everyone involved is truly
			inspiring.
		</p>
	</blockquote>

	<figcaption class="testimonial-author">
		<img
			src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
			alt="Jane Doe"
			class="author-image"
			loading="lazy"
			decoding="async" />
		<article class="author-info">
			<h3 class="paragraph">Jane Doe</h3>
			<p class="supporting">Engineering Student</p>
		</article>
	</figcaption>
</figure>

<style>
	/* FIRST PARAGRAPH BLOCK */

	.paragraph-block {
		display: grid;
		grid-template-columns: subgrid;
		gap: inherit;
		row-gap: unset;
		margin-bottom: 1rem;

		> *:not(enhanced\:img, img, picture) {
			grid-column: 1 / -1;
			max-width: 43.75rem;

			@media (min-width: 36.25rem) {
				grid-column: 1 / 4;
				padding-right: 1.5rem;
			}
			@media (min-width: 56.25rem) {
				padding-left: 2.5rem;
				grid-column: 1 / 8;
			}
		}

		.text-content article {
			* + p {
				margin-top: 0.5rem;
				line-height: 1.7;
				@media (min-width: 56.25rem) {
					padding-left: 1.5rem;
				}
			}
		}

		:global(.text-content),
		:global(picture) {
			margin-top: 3rem;
		}

		:global(picture) {
			grid-column: 4 / -1;
			height: fit-content;
			display: none;

			@media (prefers-reduced-motion: no-preference) {
				position: sticky;
				top: 20%;
			}

			@media (min-width: 36.25rem) {
				display: block;
			}

			@media (min-width: 56.25rem) {
				grid-column: 8 / -1;
			}

			:global(enhanced\:img),
			:global(img) {
				width: 100%;
				object-fit: cover;
				max-height: 22.8125rem;
			}
		}
	}

	/* SECOND PARAGRAPH BLOCK */

	.paragraph-block-right {
		display: grid;
		grid-template-columns: subgrid;
		gap: inherit;
		row-gap: unset;
		padding-bottom: 2rem;
		background-color: var(--white);
		color: var(--space-100);
		font-weight: 500;

		> *:not(enhanced\:img, img, picture) {
			grid-column: 1 / -1;
			max-width: 43.75rem;

			@media (min-width: 36.25rem) {
				grid-column: 1 / 4;
				padding-right: 1.5rem;
			}
			@media (min-width: 56.25rem) {
				padding-left: 2.5rem;
				grid-column: 6 / 12;
				align-items: right;
			}
		}

		.text-content-right article {
			* + p {
				margin-top: 0.5rem;
				line-height: 1.5;
				@media (min-width: 56.25rem) {
					padding-left: 1.5rem;
				}
			}
		}

		:global(.text-content),
		:global(picture) {
			margin-top: 3rem;
		}

		:global(picture) {
			grid-column: 4 / -1;
			height: fit-content;
			display: none;

			@media (min-width: 36.25rem) {
				display: block;
			}

			@media (min-width: 56.25rem) {
				grid-column: 1 / 6;
			}

			:global(enhanced\:img),
			:global(img) {
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

	/* THIRD PARAGRAPH + IMG BLOCK */

	.paragraph-block-3 {
		display: grid;
		grid-template-columns: subgrid;
		gap: inherit;
		row-gap: unset;
		margin-bottom: 1rem;

		> *:not(enhanced\:img, img, picture) {
			grid-column: 1 / -1;
			max-width: 43.75rem;

			@media (min-width: 36.25rem) {
				grid-column: 1 / 4;
				padding-right: 1.5rem;
			}
			@media (min-width: 56.25rem) {
				padding-left: 2.5rem;
				grid-column: 1 / 8;
			}
		}

		.text-content-3 article {
			* + p {
				margin-top: 0.5rem;
				line-height: 1.5;
				@media (min-width: 56.25rem) {
					padding-left: 1.5rem;
					margin-bottom: 1.5rem;
				}
			}
		}

		:global(.text-content),
		:global(picture) {
			margin-top: 3rem;
		}

		:global(picture) {
			grid-column: 4 / -1;
			height: fit-content;

			display: none;

			@media (min-width: 36.25rem) {
				display: block;
			}

			@media (min-width: 56.25rem) {
				grid-column: 8 / -1;

				@media (prefers-reduced-motion: no-preference) {
					position: sticky;
					top: 30%;
					margin-bottom: 1.5rem;
				}
			}

			:global(enhanced\:img),
			:global(img) {
				width: 100%;
				object-fit: cover;
				max-height: 22.8125rem;
			}
		}
	}

	.text-content-3 article {
		p {
			color: var(--white);
			font-weight: 500;
		}
	}

	/* .article {
    margin-bottom: 2rem;
  } */

	/* STEPS BLOCK */

	.steps-block {
		display: grid;
		grid-template-columns: subgrid;
		gap: inherit;
		row-gap: unset;
		grid-column: 1 / -1;
		max-width: 100%;
		background-color: var(--white);
		padding-bottom: 2rem;
	}

	.text-content--title {
		color: var(--space-100);
		margin-top: 2rem;
	}

	.steps-block .text-content--title {
		grid-column: 1 / -1;
		margin-bottom: 1.5rem;
	}

	.steps-content {
		grid-column: 1 / -1;
		display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		margin-inline: calc(-0.1 * 1.5rem);
		padding-inline: 1.5rem;
		gap: 0;
	}

	.step-item {
		position: relative;
		scroll-snap-align: start;
		margin-right: 1.5rem;
	}

	.step-item > div[tabindex='0']:focus .steps-img-overlay {
		opacity: 1;
	}

	.step-item > div[tabindex='0']:focus .steps-img-overlay {
		opacity: 1;
	}

	#step-2 ~ .step-label .steps-img,
	#step-3 ~ .step-label .steps-img {
		object-fit: contain;
	}

	@media (min-width: 56.25rem) {
		.step-item > div[tabindex='0']:hover .steps-img-overlay,
		.step-item > div[tabindex='0']:focus .steps-img-overlay {
			opacity: 1;
		}
	}

	.step-checkbox {
		display: none;
	}

	.step-label {
		display: block;
		position: relative;
		cursor: pointer;
	}

	.step-item:last-child {
		margin-right: 0;
	}

	@media (min-width: 56.25rem) {
		.steps-content {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			margin-inline: 0;
			padding-inline: 0;
			gap: 1.5rem;
			overflow-x: visible;
			scroll-snap-type: none;
		}

		.step-item {
			flex: initial;
			margin-right: 0;
		}
	}

	.steps-img {
		display: block;
		width: 15.063rem;
		height: 20.5rem;
		object-fit: cover;
		border-radius: 0.5rem;
		z-index: 1;
		margin-bottom: 1rem;

		@media (min-width: 56.25rem) {
			height: 26.25rem;
			margin-bottom: 1.5rem;
		}
	}

	.steps-img-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 20.5rem;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem;
		text-align: center;
		border-radius: 0.5rem;
		transition: 0.5s ease;
		opacity: 0;
		z-index: 9;
		pointer-events: none;
	}

	.step-checkbox:checked ~ .step-label .steps-img-overlay {
		opacity: 1;
	}

	@media (min-width: 56.25rem) {
		.step-checkbox:checked ~ .step-label .steps-img-overlay {
			opacity: 0;
		}

		.step-label:hover .steps-img-overlay {
			opacity: 1;
		}

		.step-item {
			width: 22rem;
			flex: initial;
			margin-right: 0;
		}

		.steps-img {
			height: 26.25rem;
			margin-bottom: 1.5rem;
			width: 100%;
		}

		.steps-img-overlay {
			height: 26.25rem;
			width: 100%;
		}
	}

	.step-number {
		position: absolute;
		background-color: var(--cleanroom-100);
		color: var(--space-100);
		font-family: var(--heading);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		z-index: 5;
		box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.3);
	}

	/* GETTING INVOLVED */
	/* 
  .getting-involved {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;

    p {
      margin-top: 1rem;
      padding: 0 3rem 0 3rem;
    }
  } */

	/* TESTIMONIAL BLOCK */

	.testimonial-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
		padding: 2.5rem 1.5rem 2rem 1.5rem;
		margin-top: 2.5rem;
		margin-bottom: 3rem;
		background-color: var(--cleanroom-100);
		border-left: 0.1875rem solid var(--white);
		border-right: 0.1875rem solid var(--white);
	}

	.testimonial-content {
		flex: 1;
	}

	.testimonial-text {
		font-size: 1rem;
		margin: 0;
		color: var(--space-100);
		line-height: 1.5;
		font-weight: 500;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		min-width: auto;
	}

	.author-image {
		width: 5.5rem;
		height: 5.5rem;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}

	.author-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.paragraph {
		color: var(--space-100);
	}

	.supporting {
		color: var(--space-100);
	}

	@media (min-width: 56.25rem) {
		.testimonial-container {
			flex-direction: row;
			align-items: center;
			gap: 4rem;
			padding: 3rem 2.5rem;
		}

		.testimonial-author {
			min-width: 13.75rem;
		}

		.author-image {
			width: 6.5rem;
			height: 6.5rem;
		}

		.testimonial-text {
			max-width: 70ch;
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

	h4 {
		font-weight: 500;
		padding-top: 1.5rem;
	}

	/* article + article {
  margin-top: 2rem;
} */
</style>
