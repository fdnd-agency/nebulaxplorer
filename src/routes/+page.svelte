<script>
	import {
		Hero,
		NewsComponent as News,
		PillarsComponent,
		MailingListSignup,
		Sponsors,
		sronAcademyLogoOnWhite,
		xrayBinaryEnhanced,
		SatelliteViewer
	} from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="NEBULA-Xplorer will investigate how jets form and how X-ray binaries evolve. It will observe these objects for long periods of time to see how their emission varies on time scales from milliseconds to weeks." />
</svelte:head>

<Hero
	titleColor="var(--text-color-light)"
	logoColor="#111122"
	pageTitle=""
	background={{
		file: xrayBinaryEnhanced,
		alt: 'A colorful x-ray binary system',
	}} />

<News newsCards={data.newsItems} />

<section class="section-paragraph-picture">
	<div class="content-container">
		<h2 class="heading">About NEBULA-Xplorer</h2>
		<SatelliteViewer />
		
		<p class="paragraph">
			NEBULA-X is an X-ray spectral timing mission that will fill a key
			gap in international observing capability in the early 2030s by
			investigating the variability of compact objects such as black holes
			on long time scales with higher cadence than has been possible on
			previous missions. It will observe X-ray emission from these sources
			at high energy and timing resolution to reveal how these objects and
			their nearby extreme environments behave.
		</p>
	</div>

	<Sponsors />
</section>

<section class="section-paragraph-picture alt">
	<div class="content-container">
		<h2 class="heading">About SRON Academy</h2>
		<img
			src={sronAcademyLogoOnWhite}
			alt="The logo of Space Research Organisation Netherlands Academy" />
		<p class="paragraph">
			SRON offers a very rich environment for inquisitive people. Because
			it takes many disciplines to do groundbreaking research and to
			develop the instrumentation or software needed to do so. We like to
			transfer knowledge and expertise to PhD students, students and other
			talented people inside and outside SRON. We do this actively, gladly
			and with passion.
		</p>
	</div>
</section>

<PillarsComponent />

<MailingListSignup />

<style>
	section div {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		padding-block: calc(2rem + 2vw);
		justify-content: center;
		align-items: center;

		h2 {
			grid-column: 1 / -1;
		}

		picture,
		img,
		:global(.satellite-container) {
			align-self: center;
		}

		@media (min-width: 800px) {
			grid-template-columns: repeat(3, 1fr);
			gap: 3rem;

			/* Text content on the LEFT side (Columns 1 and 2) */
			p {
				grid-row: 2 / 3;
				grid-column: 1 / 3;
			}

			/* Satellite successfully moved back to the RIGHT side (Column 3) */
			picture,
			img,
			:global(.satellite-container) {
				grid-row: 2 / 3;
				grid-column: 3 / -1;
				justify-self: unset;
			}
		}

		img {
			width: auto;
			max-width: min(400px, 100%);
			height: 100%;
			max-height: 100%;
		}
	}

	section.alt {
		background-color: var(--background-color-light);
		color: var(--text-color-dark);
		border-bottom: var(--accent-color) 0.5rem solid;

		h2 {
			color: var(--ultra-140);
			font-weight: 500;
		}

		@media (min-width: 800px) {
			p {
				grid-row: 2 / 3;
				grid-column: 2 / -1;
			}

			picture,
			img {
				grid-row: 2 / 3;
				grid-column: 1 / 2;
			}
		}
	}
</style>