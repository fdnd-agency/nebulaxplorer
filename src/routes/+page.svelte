<script>
	import {
		Hero,
		NewsComponent as News,
		PillarsComponent,
		MailingListSignup,
		nebulaSatelliteEnhanced,
		blackholeHeroEnhanced as heroImg,
		sronAcademyLogoOnSpaceBlue as logo,
	} from '$lib'

	let { data } = $props()
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="NEBULA-Xplorer will investigate how jets form and how X-ray binaries evolve. It will observe these objects for long periods of time to see how their emission varies on time scales from milliseconds to weeks." />
</svelte:head>

<Hero titleColor="var(--white)" pageTitle="" />

<News newsCards={data.newsItems} />

<section class="section-paragraph-picture">
	<div class="content-container">
		<h2 class="section_title">About Nebula Xplorer</h2>
		<p class="paragraph">
			NEBULA-X is an X-ray spectral timing satellite that will fill a key
			gap in international observing capability in the early 2030s as well
			as investigate the variability of compact objects such as black
			holes on long time scales with higher cadence than has been possible
			on previous missions. It will observe X-ray emission from these
			sources at high energy and timing resolution to reveal how these
			objects and their nearby extreme environments behave.
		</p>
		<enhanced:img
			src={nebulaSatelliteEnhanced}
			alt="The Nebula Xplorer Satellite"
			sizes="(min-width:500px) 900px, (min-width:300px) 450px" />
	</div>
</section>

<PillarsComponent />

<MailingListSignup />

<style>
	.section-paragraph-picture div {
		display: grid;
		gap: 2rem;
		padding-block: 3rem;

		@media (min-width: 1000px) {
			grid-template-columns: 2fr 1fr;
		}

		h2 {
			grid-column: 1 / -1;
		}

		img {
			max-width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
