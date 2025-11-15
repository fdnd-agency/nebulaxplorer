<script>
  import blackholeImage from "$lib/assets/blackhole.jpg?enhanced";
  import Hero from "$lib/components/Hero/Hero.svelte";
  import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
</script>


<!-- HERO BLOCK -->

<Hero
  pageTitle="Mission"
  sronIcon={logo}
  background={{ alt: "", file: blackholeImage }}
/>

<!-- FIRST PARAGRAPH + IMG BLOCK -->

<section class="paragraph-block">
  <div class="text-title">
    <h2 class="subtitle">What are we <span class="orange">up</span> to?</h2>
    <p class="heading">What our current project entails</p>
  </div>

  <section class="text-content">
    <h3 class="orange subtitle text-content--title">Mission brief</h3>

    <article>
      <h4 class="orange heading">Mission in development</h4>
      <p>
        NEBULA – Xplorer staat voor “Netherlands Educational Satellite for
        Exploration of Binary-Linked Astrophysics – X-ray Observer”. Ongeveer
        vierhonderd studenten helpen SRON, veertien Nederlandse
        onderwijsinstellingen en vele industriële partners om deze ruimtemissie
        te ontwikkelen van begin tot eind, onder leiding van wetenschappers en
        ingenieurs.
      </p>
    </article>

    <article>
      <h4 class="orange heading">Questions surrounding X-ray binaries</h4>
      <p>
        Veel van de helderste objecten in het heelal zijn röntgendubbelsterren.
        Dit zijn combinaties van een extreem compact object, zoals een zwart gat
        of een neutronenster, en een begeleidende ster. Het compacte object
        onttrekt in de loop van de tijd de materie van zijn begeleidende ster.
        Hierbij komt veel energie vrij in een gebundelde straal—een jet.
        Wetenschappers begrijpen dit proces is nog niet helemaal, en zeker de
        aard van de stroom van materie vlak naast het zwarte gat blijft een
        groot mysterie.
      </p>
    </article>
    <article>
      <h4 class="orange heading">Questions surrounding X-ray binaries</h4>
      <p>
        NEBULA-Xplorer gaat onderzoeken hoe jets vormen en hoe deze
        röntgendubbelsterren evolueren. Hiervoor observeert hij deze objecten
        voor lange periodes om te zien hoe de emissie van deze bronnen varieert
        op tijdschalen van milliseconden tot weken. Deze lange observatietijd
         maakt het mogelijk om röntgenactiviteit te combineren met gegevens uit
        andere golflengtes van andere telescopen.
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
  <ul class="steps-content">
    <li class="step-item">
      <input type="checkbox" id="step-1" class="step-checkbox" />
      <label for="step-1" class="step-label">
        <span class="step-number caption">1</span>
        <enhanced:img
          class="steps-img"
          src={blackholeImage}
          alt="Step 1 for launch"
        />
        <p class="steps-img-overlay">
          The first step to take before Nebula launches.
        </p>
      </label>
    </li>

    <li class="step-item">
      <input type="checkbox" id="step-2" class="step-checkbox" />
      <label for="step-2" class="step-label">
        <span class="step-number caption">2</span>
        <enhanced:img
          class="steps-img"
          src={blackholeImage}
          alt="Step 2 for launch"
        />
        <p class="steps-img-overlay">
          The second step to take before Nebula launches.
        </p>
      </label>
    </li>

    <li class="step-item">
      <input type="checkbox" id="step-3" class="step-checkbox" />
      <label for="step-3" class="step-label">
        <span class="step-number caption">3</span>
        <enhanced:img
          class="steps-img"
          src={blackholeImage}
          alt="Step 3 for launch"
        />
        <p class="steps-img-overlay">
          The third step to take before Nebula launches.
        </p>
      </label>
    </li>

    <li class="step-item">
      <input type="checkbox" id="step-4" class="step-checkbox" />
      <label for="step-4" class="step-label">
        <span class="step-number caption">4</span>
        <enhanced:img
          class="steps-img"
          src={blackholeImage}
          alt="Step 4 for launch"
        />
        <p class="steps-img-overlay">
          The fourth step to take before Nebula launches.
        </p>
      </label>
    </li>

    <li class="step-item">
      <input type="checkbox" id="step-5" class="step-checkbox" />
      <label for="step-5" class="step-label">
        <span class="step-number caption">5</span>
        <enhanced:img
          class="steps-img"
          src={blackholeImage}
          alt="Step 5 for launch"
        />
        <p class="steps-img-overlay">
          The fifth step to take before Nebula launches.
        </p>
      </label>
    </li>
  </ul>
</section>

<!-- SECOND IMG + PARAGRAPH BLOCK -->

<section class="paragraph-block-right">
  <enhanced:img
    class="paragraph-img-left"
    src={blackholeImage}
    alt="Black Hole"
  />
  <section class="text-content-right">
    <h3 class="orange subtitle text-content--title">Mission brief</h3>

    <article>
      <h4 class="orange heading">Mission in development</h4>
      <p>
        NEBULA – Xplorer staat voor “Netherlands Educational Satellite for
        Exploration of Binary-Linked Astrophysics – X-ray Observer”. Ongeveer
        vierhonderd studenten helpen SRON, veertien Nederlandse
        onderwijsinstellingen en vele industriële partners om deze ruimtemissie
        te ontwikkelen van begin tot eind, onder leiding van wetenschappers en
        ingenieurs.
      </p>
    </article>

    <article>
      <h4 class="orange heading">Questions surrounding X-ray binaries</h4>
      <p>
        Veel van de helderste objecten in het heelal zijn röntgendubbelsterren.
        Dit zijn combinaties van een extreem compact object, zoals een zwart gat
        of een neutronenster, en een begeleidende ster. Het compacte object
        onttrekt in de loop van de tijd de materie van zijn begeleidende ster.
        Hierbij komt veel energie vrij in een gebundelde straal—een jet.
        Wetenschappers begrijpen dit proces is nog niet helemaal, en zeker de
        aard van de stroom van materie vlak naast het zwarte gat blijft een
        groot mysterie.
      </p>
    </article>
    <article>
      <h4 class="orange heading">Questions surrounding X-ray binaries</h4>
      <p>
        NEBULA-Xplorer gaat onderzoeken hoe jets vormen en hoe deze
        röntgendubbelsterren evolueren. Hiervoor observeert hij deze objecten
        voor lange periodes om te zien hoe de emissie van deze bronnen varieert
        op tijdschalen van milliseconden tot weken. Deze lange observatietijd
         maakt het mogelijk om röntgenactiviteit te combineren met gegevens uit
        andere golflengtes van andere telescopen.
      </p>
    </article>
  </section>
</section>

<!-- THIRD PARAGRAPH + IMG BLOCK -->

<section class="paragraph-block-3">

  <section class="text-content-3">
    <h3 class="orange subtitle text-content--title">Mission brief</h3>

    <article>
      <h4 class="orange heading">Mission in development</h4>
      <p>
        NEBULA – Xplorer staat voor “Netherlands Educational Satellite for
        Exploration of Binary-Linked Astrophysics – X-ray Observer”. Ongeveer
        vierhonderd studenten helpen SRON, veertien Nederlandse
        onderwijsinstellingen en vele industriële partners om deze ruimtemissie
        te ontwikkelen van begin tot eind, onder leiding van wetenschappers en
        ingenieurs.
      </p>
    </article>

    <article>
      <h4 class="orange heading">Questions surrounding X-ray binaries</h4>
      <p>
        Veel van de helderste objecten in het heelal zijn röntgendubbelsterren.
        Dit zijn combinaties van een extreem compact object, zoals een zwart gat
        of een neutronenster, en een begeleidende ster. Het compacte object
        onttrekt in de loop van de tijd de materie van zijn begeleidende ster.
        Hierbij komt veel energie vrij in een gebundelde straal—een jet.
        Wetenschappers begrijpen dit proces is nog niet helemaal, en zeker de
        aard van de stroom van materie vlak naast het zwarte gat blijft een
        groot mysterie.
      </p>
    </article>
    <article class="article">
      <h4 class="orange heading">Questions surrounding X-ray binaries</h4>
      <p>
        NEBULA-Xplorer gaat onderzoeken hoe jets vormen en hoe deze
        röntgendubbelsterren evolueren. Hiervoor observeert hij deze objecten
        voor lange periodes om te zien hoe de emissie van deze bronnen varieert
        op tijdschalen van milliseconden tot weken. Deze lange observatietijd
         maakt het mogelijk om röntgenactiviteit te combineren met gegevens uit
        andere golflengtes van andere telescopen.
      </p>
    </article>
  </section>
  <enhanced:img src={blackholeImage} alt="Black Hole" />
</section>

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

  /* STEPS BLOCK */

  .steps-block {
    display: grid;
    grid-template-columns: subgrid;
    gap: inherit;
    row-gap: unset;
    grid-column: 1 / -1;
    max-width: 100%;
    background-color: var(--white);
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
    margin-bottom: 3rem;

    @media (min-width: 56.25rem) {
      height: 26.25rem;
    }
  }

  .steps-img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 15.063rem;
    height: 20.5rem;
    background: rgba(0, 0, 0, 0.5); /* Black see-through */
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

  /* Mobile: use checkbox checked state */
  .step-checkbox:checked ~ .step-label .steps-img-overlay {
    opacity: 1;
  }

  /* Desktop: use hover only */
  @media (min-width: 56.25rem) {
    .step-checkbox:checked ~ .step-label .steps-img-overlay {
      opacity: 0;
    }

    .step-label:hover .steps-img-overlay {
      opacity: 1;
    }

    .steps-img-overlay {
      height: 26.25rem;
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
    box-shadow: 0 .25rem .375rem rgba(0, 0, 0, 0.3);
    box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.3);
  }

  .step-item :global(enhanced\:img) {
    width: 15.063rem;
  }


  /* SECOND PARAGRAPH BLOCK */

  .paragraph-block-right {
    display: grid;
    grid-template-columns: subgrid;
    gap: inherit;
    row-gap: unset;
    margin-bottom: 2rem;

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
    background-color: var(--white);

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
      color: var(--space-100);
      font-weight: 500;
    }
  }

  .article {
    margin-bottom: 2rem;
  }

  /* util classes */
  .orange {
    color: var(--cleanroom-100);
  }

  :global(enhanced\:img) {
    width: auto;
  }

  h2, h3 {
    font-weight: 600;
    line-height: 1.5;
  }

  h4 {
    font-weight: 500;
  }

  article + article {
    margin-top: 2rem;
  }
</style>
