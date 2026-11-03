<script>
  import FeatureItem from "$lib/components/molecules/FeatureItem.svelte";

  import xrayReverberation from "$lib/assets/images/x-ray-reverberation.jpg?enhanced";
  import neutronStarPulsar from "$lib/assets/images/neutron-star-pulsar.jpg?enhanced";
  import windEvolution from "$lib/assets/images/wind-evolution.jpg?enhanced";

  const scienceObjectives = [
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
