<script>
    import satelliteImage from "$lib/assets/images/nebula-xplorer.jpg";
</script>

<section class="mission-brief-container mission-grid">
    <article class="content">
        <h1 class="main-title">Mission brief</h1>

        <section>
            <h2 class="section-title">Mission in development</h2>
            <p>
                NEBULA-Xplorer staat voor "Netherlands Educational Satellite for
                Exploration of Binary-Linked Astrophysics - X-ray Observer".
                Ongeveer vierhonderd studenten helpen SRON, veertien Nederlandse
                onderwijsinstellingen en vele industriële partners om deze
                ruimtemissie te ontwikkelen van begin tot eind, onder leiding
                van wetenschappers en ingenieurs.
            </p>

            <h2 class="section-title">Vraagtekens rond röntgendubbelsterren</h2>
            <p>
                Veel van de helderste objecten in het heelal zijn
                röntgendubbelsterren. Dit zijn combinaties van een extreem
                compact object, zoals een zwart gat of een neutronenster, en een
                begeleidende ster. Het compacte object onttrekt in de loop van
                de tijd de materie van zijn begeleidende ster. Hierbij komt veel
                energie vrij in een gebundelde straal—een jet. Wetenschappers
                begrijpen dit proces is nog niet helemaal, en zeker de aard van
                de stroom van materie vlak naast het zwarte gat blijft een groot
                mysterie.
            </p>

            <h2 class="section-title">Lange observatieperiodes</h2>
            <p>
                NEBULA-Xplorer gaat onderzoeken hoe jets vormen en hoe deze
                röntgendubbelsterren evolueren. Hiervoor observeert hij deze
                objecten voor lange periodes om te zien hoe de emissie van deze
                bronnen varieert op tijdschalen van milliseconden tot weken.
                Deze lange observatietijd maakt het mogelijk om
                röntgenactiviteit te combineren met gegevens uit andere
                golflengtes van andere telescopen.
            </p>
        </section>
    </article>

    <figure class="sticky-image-wrapper mission-image-wrapper">
        <img
            src={satelliteImage}
            alt="NEBULA-Xplorer satellite model"
            class="satellite-image"
        />
    </figure>
</section>

<style>
    .mission-brief-container {
        background-color: var(--space-100);
        color: var(--white);
        padding: 3.125rem;
    }

    .mission-grid {
        display: block;
    }

    .content,
    .sticky-image-wrapper {
        width: 100%;
        padding-left: 0;
    }

    .sticky-image-wrapper {
        position: relative;
        top: auto;
        order: -1;
        margin-bottom: 1.25rem;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .mission-image-wrapper {
        width: 18.75rem;
        height: 18.75rem;
    }

    .satellite-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .main-title {
        font-weight: bold;
        color: var(--cleanroom-100);
        margin-bottom: 3.125rem;
    }

    section {
        margin-bottom: 6.25rem;
    }

    .section-title {
        font-weight: bold;
        color: var(--cleanroom-100);
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
        font-size: 2rem;
    }

    p {
        font-size: 1.125rem;
        line-height: 1.5;
    }

    @media (min-width: 48.0625rem) {
        .mission-grid {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .content {
            width: 60%;
        }

        .sticky-image-wrapper {
            position: sticky;
            top: 50%;
            width: 35%;
            padding-left: 3.125rem;
            order: initial;
            margin-bottom: 0;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .mission-image-wrapper {
            height: 20rem;
        }
    }
</style>