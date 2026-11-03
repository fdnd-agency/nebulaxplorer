<script>
  import FeatureItem from "$lib/components/molecules/FeatureItem.svelte";

  import xrayReverberation from "$lib/assets/images/x-ray-reverberation.jpg?enhanced";
  import neutronStarPulsar from "$lib/assets/images/neutron-star-pulsar.jpg?enhanced";
  import windEvolution from "$lib/assets/images/wind-evolution.jpg?enhanced";

  const scienceObjectives = [
    {
      title: "X-ray reverberation",
      image: neutronStarPulsar,
      alt: "X-ray reverberation visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall be able to determine the mass and spin of accreting stellar-mass black holes in Galactic X-ray binaries by measuring the amplitude and energy dependence of X-ray reverberation lags during outburst, using long, high-cadence observations.`,
          details: `Reverberation mapping using X-ray "light echoes" (photons emitted in one region of the plasma can either reach the observer directly, or first interact with other parts of the plasma, be re-processed and re-emitted at different energies, and only then reach the observer), can help us understand the geometry and properties of the accreting plasma directly surrounding the black hole. Reverberation mapping measures time delays between the direct and re-emitted photons and uses these light travel delays to reconstruct a map of the accretion flow. Because the reflected path is longer, this delay encodes distances at the light-crossing scale of the system. Mass and spin come from two different parts of the same signal. The overall size of the lag tells us the mass: bigger black holes mean bigger gravitational radii, so light takes longer to make the round trip. Spin shows-up in how the lag changes with energy across the broadened iron K line, because a faster-spinning black hole lets the disk’s inner edge sit closer in, shortening the path light must travel from the innermost region and reshaping the lag-energy profile. 
To measure this, we need long, near-continuous observations within fine time-tagging resolution, sufficient effective area, and energy resolution near the iron K line to detect the reverberation signal and resolve the lag-energy profile.`,
        },
      ],
    },
    {
      title: "Quasi-Periodic Oscillations",
      image: xrayReverberation,
      alt: "Quasi-Periodic Oscillations visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall be able to detect quasi-periodic oscillations (QPOs) in galactic black holes and neutron star X-ray binaries during outburst and other high-accretion states, to constrain the neutron star equation of state and test the universality of QPO mechanisms (e.g., Lense-Thirring precession or spiral density waves) across compact object types.`,
          details: `QPOs are quasi-periodic X-ray brightness variations which are theorized to arise from orbital/precessional motion in the innermost accretion flow (such as Lense-Thirring precession) or from oscillations in heating and cooling in the hot flow. In neutron star systems, high frequency QPOs (100-1000Hz) provide critical constraints on the state equation for ultra dense matter. By observing both blackhole and neutron star X-ray binaries consistently, we can get a direct comparison of QPO mechanisms across compact objects and understand if these mechanisms happen universally across compact objects. 
This can be done via long uninterrupted observations combining broad energy coverage within a range of 0.3-12keV, microsecond timing resolution and a large effective area.`,
        },
      ],
    },
    {
      title: "Wind Evolution over an Outburst",
      image: neutronStarPulsar,
      alt: "Wind Evolution over an Outburst visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall be able to detect blue shifted absorption lines in high-sensitivity X-ray spectra with high-cadence to determine mass outflow rates in compact objects to understand linked stellar formation and accretion disk makeup.`,
          details: `X-ray binary winds are a major but poorly constrained component of accretion systems. During outbursts, these winds can eject more material than the compact object accretes, directly influencing accretion-disk evolution and the surrounding interstellar medium. However, their evolution is difficult to characterise because high-sensitivity, high-cadence observations have historically been scarce. These winds are detected as blue-shifted absorption lines in high sensitivity X-ray spectra. NEBULA-Xplorer will track how these winds evolve and detect changes in accretion and jet activity, enabling comparisons across compact-object classes. This will be done through high-cadence, daily monitoring of the entire outburst track across a diverse range of sources, with a combination of high sensitivity and mid-resolution spectroscopy. This continuous coverage will also provide context for high-resolution observations from missions such as XRISM and NewAthena.`,
        },
      ],
    },
    {
      title: "Thermonuclear Explosions on Neutron Star Surfaces",
      image: windEvolution,
      alt: "Thermonuclear Explosions on Neutron Star Surfaces visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall monitor known accreting neutron stars during quiescence, conducting long-term continuous observations of their behaviour as they peak into Type-I X-ray bursts.
NEBULA-Xplorer shall rapidly pivot to observe neutron stars undergoing Type-I X-ray bursts by responding to triggers provided by other observatories.`,
          details: `Accreting neutron stars can accumulate hydrogen and helium on their surface to the point of triggering massive thermonuclear explosions (Type-I X-ray bursts), which can radiate so brightly that they outshine the accretion disk. Constraining their physical circumstances can lead to better understanding of neutron star vibration modes and to identifying spectral features indicative of accretion flow dynamics. Observation of thermonuclear ash will also inform the scientific community on how shock waves can propagate in the neutron star’s atmosphere. Furthermore, the effects of radiation on the surrounding environment and on the surface itself can be investigated by observing these bursts as they happen. 
With the goal of being able to identify super bursts on top of regular ones, NEBULA-Xplorer will supplement long-term observation of known systems with rapid-response observations of Targets of Opportunity (ToO), defined in collaboration with other observatories and the scientific community.
`,
        },
      ],
    },
    {
      title: "Relativistic Jets",
      image: neutronStarPulsar,
      alt: "Relativistic Jets visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall characterise relativistic jets in accreting neutron star systems, by observing how they propagate in response to Type-I thermonuclear bursts, tracking their speed and geometry to understand jet launching mechanisms.`,
          details: `The mechanisms governing relativistic jets launched from accretion flows around neutron stars are poorly understood. Measuring the evolution of jets during Type-I thermonuclear bursts on neutron star surfaces, in terms of speed and geometry, would enable scientists to compare these properties to the neutron star’s known rotation and magnetic field, further refining jet-powering theoretical models. This objective is intended to make NEBULA-Xplorer’s observations complementary with other multi-wavelength observatories: while NEBULA-Xplorer will provide the X-ray observation capabilities to reveal Type-I bursts, partner millimeter/radio facilities will track the jet response.`,
        },
        {
          intro: `NEBULA-Xplorer shall characterise the physical mechanisms which govern the relationship between changes in the inner accretion flow and relativistic jet ejections in accreting black hole systems, using independent black hole spin measurements and time-tagging of the exact jet ejections.`,
          details: `The mechanisms governing relativistic jets launched from accretion flows around black holes are poorly understood. The high-cadence X-ray observations performed by NEBULA-Xplorer will allow scientists to link sudden changes in the inner accretion flow, such as specific quasi-periodic oscillations, to the moment of jet launch. Novel analysis techniques, combined with NEBULA-Xplorer’s flexible, highly sensitive, and rapid response system will be able to achieve sub 10-minute precision in monitoring ejection dates. This objective is also intended to make NEBULA-Xplorer’s observations complementary with other multi-wavelength observatories.`,
        },
      ],
    },
    {
      title: "Neutron Star Pulsars",
      image: xrayReverberation,
      alt: "Neutron Star Pulsars visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall observe hot spots on the surface of neutron stars, measuring variations in location and intensity over time to determine the mass and radius of the neutron star.`,
          details: `Neutron stars spin quickly and often emit jets of material from their poles. These emissions can be tracked over time in X-ray, to better understand the periodicity of the variations in emissions. The theoretical radius and mass of a neutron star are determined by its “equation of state” (EOS), and their measured counterpart can, in turn, be used to constrain the EOS to compute the star’s compactness, possibly leading to more information regarding the type of ultra-dense matter in its core. Pulse profile modelling can then be applied to NEBULA-Xplorer’s long exposure measurements of hot spots on neutron stars’ surfaces, which can help constrain the EOS and the composition of the star’s interiors once compared to theoretical models.`,
        },
        {
          intro: `NEBULA-Xplorer shall perform uninterrupted tracking of spin properties of Galactic pulsars to investigate the causal relation between accretion and spin up properties.`,
          details: `Spin evolution depends in part on long acceleration from accreting matter. Accretion is also important to mass growth of pulsars and can give information on how black holes are produced in the mass gap. Tracking spin up properties of accreting pulsars over time will therefore provide the scientific community with more details on the mechanics of the interaction between the torque applied to the system by the accreting disk and the magnetic field of the pulsar.`,
        },
        {
          intro: `NEBULA-Xplorer shall identify pulsar glitches and their properties through long exposure observations, based on measurements of the pulsar’s rotation speed and its decay/spin-up rate.`,
          details: `Glitches are events in which the rotation of the pulsar suddenly changes speed or rotational rate. These are currently believed to be caused by interactions between different layers of the neutron star, creating sudden jumps in the moment of inertia of the rotating body, which alters its rotational properties. Better understanding of how these glitches behave can be used to make independent constraints of EOS models, improving the understanding of these phenomena.`,
        },
      ],
    },
    {
      title: "Tidal Disruption Events",
      image: windEvolution,
      alt: "Tidal Disruption Events visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall characterise the temporal and spectral evolution of X-ray emission from Tidal Disruption Events to determine how stellar debris evolves into an accretion flow around a super massive black holes and to constrain the properties of the inner accretion disk.`,
          details: `Tidal Disruption Events (TDEs) provide a direct opportunity to study how stellar debris forms and evolves into an accretion flow around a supermassive black hole. X-ray observations are able to probe the innermost regions of the newly formed accretion flow around super massive black holes (SMBH). By following the evolution of the soft X-ray thermal continuum, NEBULA-Xplorer can constrain the circularisation timescale of the disrupted stellar material. Timing and spectral measurements can additionally be used to study Quasi-Periodic Oscillations (QPOs), relativistically broadened iron-line features and X-ray reverberation lags, providing information on the properties and geometry of the inner accretion disk. This objective therefore drives requirements on X-ray sensitivity, spectral resolution, timing performance, observation cadence and follow-up capability.`,
        },
        {
          intro: `NEBULA-Xplorer shall characterise the recurrence behaviour and its long-term evolution of Quasi-Periodic Eruptions associated with Tidal Disruption Events to distinguish between intrinsic accretion-disk processes and interactions with a stellar-mass companion.`,
          details: `Quasi-Periodic Eruptions (QPEs) are recurrent soft X-ray bursts that can appear during the late-time evolution of Tidal Disruption Events. Their physical origin is not yet established, with proposed explanations including intrinsic accretion-disk processes such as thermal-viscous instabilities or disk tearing driven by Lense-Thirring precession, as well as interactions between the disk and a stellar-mass companion in an Extreme Mass Ratio Inspiral. Distinguishing between these scenarios requires precise measurement of the recurrence period and how it changes over long timescales. Long-baseline, high duty-cycle monitoring can reveal gradual period changes, rapid evolution caused by hydrodynamic interactions, or non-monotonic behaviour associated with multiple precession frequencies. This objective therefore drives requirements on long-duration monitoring, observation continuity, cadence, timing accuracy and the ability to measure changes in QPE recurrence behaviour over months or years.`,
        },
      ],
    },
    {
      title: "Accretion Disk Instabilities and Outburst Beginnings",
      image: xrayReverberation,
      alt: "Accretion Disk Instabilities and Outburst Beginnings visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall characterise the early temporal evolution of X-ray outbursts in low mass X-ray binaries, in coordination with optical observations, in order to determine where and how accretion disk outbursts are triggered.`,
          details: `Accretion-disk outbursts are thought to be initiated by an instability within the disk, after which a heating front propagates through the accretion flow and causes the source to brighten. Optical emission from the cooler outer regions of the disk can precede the corresponding X-ray outburst by approximately 5–10 days, providing an early indication that an outburst is developing. Coordinated optical and X-ray observations can therefore be used to measure the delay between the optical and X-ray brightening. This delay provides information on the location at which the outburst was triggered and on the propagation of the heating front, which can in turn constrain properties of the accretion flow such as its viscosity. This objective therefore drives requirements on observation X-ray sensitivity, response to optical triggers and coordination with external optical observations.`,
        },
        {
          intro: `NEBULA-Xplorer shall characterise the early temporal evolution of X-ray outbursts in low mass X-ray binaries, in coordination with optical observations, in order to investigate differences between neutron-star and black-hole systems.”`,
          details: `Low-mass X-ray binaries containing neutron stars and black holes both undergo accretion-disk outbursts, but differences in the nature of the compact object may influence how these outbursts begin and evolve. By observing the earliest stages of outbursts in both classes of systems, NEBULA-Xplorer can compare their temporal evolution, optical-to-X-ray delay and early X-ray behaviour. These measurements can be used to determine whether the triggering and propagation of accretion-disk instabilities differ between neutron-star and black-hole systems, providing insight into the role of the compact object in the outburst process. This objective therefore drives requirements on X-ray sensitivity and coordination with external optical observations.`,
        },
      ],
    },
    {
      title: "Additional Science Goals and Required Pre-Requisites",
      image: neutronStarPulsar,
      alt: "Additional Science Goals and Required Pre-Requisites visualisation",
      requirements: [
        {
          intro: `NEBULA-Xplorer shall characterise the temporal and spectral evolution of X-ray emission from Gamma-Ray Burst afterglows to determine the physical processes responsible for the afterglow, including the external forward shock and continued energy injection from the central engine.`,
          details: `Gamma-Ray Burst afterglows evolve rapidly following the prompt gamma-ray emission and can remain observable in the X-ray band for thousands of seconds or longer. Their emission is understood to contain contributions from the external forward shock as the relativistic outflow interacts with the surrounding medium, as well as from continued activity of the central engine. Measuring how the X-ray spectrum and intensity evolve with time therefore provides a means to distinguish between these physical processes and to constrain the energy distribution of the afterglow. Achieving this objective requires rapid follow-up after an external trigger, followed by sufficiently long and sensitive X-ray observations with adequate temporal and spectral resolution. This objective therefore drives requirements on response time, observation duration, timing performance, spectral performance and instrument sensitivity.
This additional science goal requires a satellite design baseline larger than the current baseline design due to the need for an additional widefield instrument on board. In addition to this, quick communication with other spacecraft observing GRBs would have to be established and negotiated with other entities.`,
        },
      ],
    },
  ];
</script>

<section>
  {#each scienceObjectives as scienceObjective, index}
    <FeatureItem
      {...scienceObjective}
      index={index + 1}
      total={scienceObjectives.length}
    />
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }
</style>
