<script>
  import blackholeImage from "$lib/assets/blackhole.jpg?enhanced";
  import Hero from "$lib/components/Hero/Hero.svelte";
  import logo from "$lib/assets/logos/SRON_Academy_OnSpaceBlue.svg";
</script>

<Hero
  pageTitle="Mission"
  sronIcon={logo}
  background={{ alt: "", file: blackholeImage }}
/>

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

<style>
  .paragraph-block {
    display: grid;
    grid-template-columns: subgrid;
    gap: inherit;
    row-gap: unset;

    > *:not(enhanced\:img, img, picture) {
      grid-column: 1 / -1;
      max-width: 43.75rem;
      padding-left: none;

      @media (min-width: 36.25rem) {
        grid-column: 1 / 4;
        padding-right: 1.5rem;
      }
      @media (min-width: 56.25rem) {
        padding-left: 2.5rem;
        grid-column: 1 / 8;
      }
    }

    .text-title {
      * + * {
        margin-top: 0.5rem;
      }
    }

    .text-content article {
      * + p {
        margin-top: 0.5rem;
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

    .subtitle span {
      color: var(--cleanroom-100);
    }
  }

  /* util classes */
  .orange {
    color: var(--cleanroom-100);
  }

  :global(enhanced\:img) {
    width: auto;
  }
</style>
