<script>
  import xrayReverberation from "$lib/assets/images/x-ray-reverberation.jpg";
  import neutronStarPulsar from "$lib/assets/images/neutron-star-pulsar.jpg";
  import windEvolution from "$lib/assets/images/wind-evolution.jpg";
</script>

<section>
  <article>
    <div class="feature-content">
      <span>01/09</span>
      <h3>X-ray reverberation</h3>
      <p>
        NEBULA-Xplorer shall be able to determine the mass and spin of accreting
        stellar-mass black holes in Galactic X-ray binaries by measuring the
        amplitude and energy dependence of X-ray reverberation lags during
        outburst, using long, high-cadence observations.
      </p>

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

    <div class="feature-image">
      <img src={xrayReverberation} alt="" />
    </div>
  </article>

  <article>
    <div class="feature-content">
      <span>02/09</span>
      <h3>Quasi-Periodic Oscillations</h3>
      <p>
        NEBULA-Xplorer shall be able to detect quasi-periodic oscillations
        (QPOs) in galactic black holes and neutron star X-ray binaries during
        outburst and other high-accretion states, to constrain the neutron star
        equation of state and test the universality of QPO mechanisms (e.g.,
        Lense-Thirring precession or spiral density waves) across compact object
        types.
      </p>

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

    <div class="feature-image">
      <img src={neutronStarPulsar} alt="" />
    </div>
  </article>

  <article>
    <div class="feature-content">
      <span>03/09</span>
      <h3>Wind Evolution over an Outburst</h3>
      <p>
        NEBULA-Xplorer shall be able to detect blue shifted absorption lines in
        high-sensitivity X-ray spectra with high-cadence to determine mass
        outflow rates in compact objects to understand linked stellar formation
        and accretion disk makeup.
      </p>

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

    <div class="feature-image">
      <img src={windEvolution} alt="" />
    </div>
  </article>
</section>

<style>
  section {
    * {
      color: var(--color-neutral-lightest);
    }

    .feature-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      span {
        color: var(--color-accent-mid);
      }

      details {
        &[open] summary:after {
          transform: rotate(45deg);
        }

        summary {
          border-top: 1px solid var(--color-neutral-lightest);
          cursor: pointer;
          position: relative;
          list-style: none;
          padding-top: var(--spacing-sm);

          &::after {
            content: "+";
            position: absolute;
            right: 0;
            transform-origin: center;
            transition: 0.3s linear;
          }
        }

        p {
          padding-top: var(--spacing-md);
        }
      }
    }
  }
</style>
