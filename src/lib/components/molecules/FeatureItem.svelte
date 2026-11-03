<script>
  //   import ContentAccordion from "$lib/components/atoms/ContentAccordion.svelte";

  let { index, total, title, intro, details, image, alt = "" } = $props();
</script>

<article>
  <div class="feature-content-wrapper">
    <span>{index}/{total}</span>
    <div class="feature-content">
      <h3>{title}</h3>
      <p>{intro}</p>
      <details>
        <summary>Read more</summary>
        <div>
          <p>
            Reverberation mapping using X-ray "light echoes" (photons emitted in
            one region of the plasma can either reach the observer directly, or
            first interact with other parts of the plasma, be re-processed and
            re-emitted at different energies, and only then reach the observer),
            can help us understand the geometry and properties of the accreting
            plasma directly surrounding the black hole. Reverberation mapping
            measures time delays between the direct and re-emitted photons and
            uses these light travel delays to reconstruct a map of the accretion
            flow. Because the reflected path is longer, this delay encodes
            distances at the light-crossing scale of the system. Mass and spin
            come from two different parts of the same signal. The overall size
            of the lag tells us the mass: bigger black holes mean bigger
            gravitational radii, so light takes longer to make the round trip.
            Spin shows up in how the lag changes with energy across the
            broadened iron K line, because a faster-spinning black hole lets the
            disk's inner edge sit closer in, shortening the path light must
            travel from the innermost region and reshaping the lag-energy
            profile. To measure this, we need long, near-continuous observations
            within fine time-tagging resolution, sufficient effective area, and
            energy resolution near the iron K line to detect the reverberation
            signal and resolve the lag-energy profile.
          </p>
        </div>
      </details>
    </div>
  </div>

  <img src={image} {alt} />
</article>

<style>
  article {
    color: var(--color-neutral-lightest);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    border-bottom: 1px solid var(--color-neutral-lightest);
    padding-bottom: var(--spacing-xl);

    @media (min-width: 768px) {
      flex-direction: row;
      gap: var(--spacing-2xl);
      justify-content: space-between;
    }
  }

  .feature-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);

    @media (min-width: 768px) {
      flex-direction: row;
      gap: var(--spacing-lg);
      align-items: baseline;
    }
  }

  span {
    color: var(--color-accent-mid);
    font-family: var(--font-heading);
    font-weight: bold;
    display: contents;
  }

  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 50px 0 50px 0;

    @media (min-width: 768px) {
      height: 400px;
    }
  }
</style>
