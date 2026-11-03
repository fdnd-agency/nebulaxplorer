<script>
    let {data} = $props()   
	import SatelliteAccordion from "../molecules/SatelliteAccordion.svelte";
</script>

<section class="satellite">
	<img src="src/lib/assets/logos/satellite-overview.webp" alt="" width="2000" height="800" > 
	<section class="navigation">

		<nav class="nav-bar">
			<p>Satellite</p>
		</nav>

		<p class="spacecraft">Spacecraft</p>
		<h2>NEBULA Xplorer satellite</h2>
		<p>Explore the NEBULA Xplorer satellite in 3D. Rotate the spacecraft, zoom in, and select a component to discover where it is located and what it does.</p>

		<nav>
			<p class="components">Components</p>

			<!-- {#each data.components as component}
				<SatelliteAccordion
					id={component.id}
					title={component.title}
					anchor={component.id}
					summary={component.summary}
				/>
			{/each} -->

			<SatelliteAccordion
				id="01"
				title="X-ray-instrument"
				anchor="xray-instrument"
				summary="Sending a telescope to space means engineering for the impossible: it has to survive a rocket launch, then operate flawlessly in a vacuum where temperatures swing by hundreds of degrees. NEBULA-Xplorer's X-ray instrument is suspended on three precision titanium mounts that isolate it from shock and temperature change, anchored to a reinforced panel, and oriented to use every centimeter of space inside the rocket fairing."
			/>

			<SatelliteAccordion
				id="02"
				title="Star Tracker Module"
				anchor="star-tracker-module"
				summary="To observe a faint X-ray source hundreds of light-years away, NEBULA-Xplorer needs to hold its aim with extraordinary precision. Star trackers continuously scan the sky, recognize patterns of stars, and determine the spacecraft's orientation down to a few arcseconds. Two units ensure constant visibility of stars even during rotation."
			/>

			<SatelliteAccordion
				id="03"
				title="Dawn 4U CubeDrive"
				anchor="dawn-4u-cubedrive"
				summary="The propulsion system counters atmospheric drag, performs collision avoidance, and enables controlled reentry. This compact thruster unit carries under two kilograms of propellant and is precisely aligned to ensure stable, accurate maneuvers throughout the mission."
			/>

			<SatelliteAccordion
				id="04"
				title="S-Band Antenne"
				anchor="s-band-antenne"
				summary="The S-band antenna enables communication with Earth during brief contact windows. It transmits gigabytes of scientific data over large distances in minutes, ensuring valuable observations reach ground stations."
			/>

			<SatelliteAccordion
				id="05"
				title="Sun Sensor"
				anchor="sun-sensor"
				summary="Sun sensors provide basic orientation by detecting the Sun's position. They are crucial during emergencies or initial deployment, helping the spacecraft maintain power and avoid dangerous pointing scenarios.
				This close-up shows one of the four Bison64 sun sensors. All four sensors are highlighted."
			/>

			<SatelliteAccordion
				id="06"
				title="Magnetorquers"
				anchor="magnetorquers"
				summary="These external devices generate magnetic torque to control the satellite's orientation and desaturate reaction wheels. By interacting with Earth's magnetic field, they provide efficient three-axis attitude control without the complexity of thrusters."
			/>

			<SatelliteAccordion
				id="07"
				title="Solar Panel"
				anchor="solar-panel"
				summary="These panels convert sunlight into electricity to power the satellite's systems and instruments. Positioned to capture maximum sunlight, they support continuous operation when combined with onboard energy storage during eclipse."
			/>
		</nav>

		<section class="about">
				<h3>About the mission</h3>
				<p>This student-driven mission combines innovation with academic and industry expertise. Its high time resolution and continuous observations reveal how matter behaves, how jets form, and how these systems evolve.</p>
				<p>A student-driven mission in collaboration with</p>
				<img src="src/lib/assets/logos/sron-full-white-logo.webp" alt="full white logo of sron" width="100"height="25" > 
				<a href="https://nebulaxplorer.dev.fdnd.nl/">Main website</a>
		</section>

	</section>
</section>

<style>
	.satellite {
		display: flex;
		/* flex-direction:column; */
		flex-direction:row;
		flex-direction: row-reverse;
        
		/* @media (width > 1150px) {
			display: flex;
			flex-direction:row-reverse;
			display: grid;
			grid-template-columns: 1fr 1fr;
		} */
	}
	.nav-bar {
		 p {
			font-family: var(--font-caption);
		 }
	}
    .navigation {
        color: var(	--color-neutral-lightest);
        background-color :var(--color-brand-darkest);
        padding: 2.5rem 2.5rem;	
		p {
			font-size: 1rem;
		}
    }

    .spacecraft, .components {
        color: var(--color-accent-dark);
        text-transform: uppercase;
    }

	h2 {
		font-size: var(--step-1);
	}

	.about {
		display: flex;
		flex-direction: column;
		margin-top: var(--spacing-xl);
		h3 {
			font-size: 1rem;
			text-transform: uppercase;
			font-family: var(--font-body);
		}
		p {
			margin: var(--spacing-md) 0 var(--spacing-md) 0;
		}
		a {
			margin-top: var(--spacing-md);
			text-decoration: none;
			&:hover {
				text-decoration: underline;
				text-underline-offset: 6px;
				text-decoration-color: var(--color-accent-dark);
			}
		}
	}
	p {
		color: var(--color-neutral-lighter);
	}
	
</style>
