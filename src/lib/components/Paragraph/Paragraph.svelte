<script>
    const paragraphs = [
        {
            title: "Mission in development",
            text: "NEBULA - Xplorer staat voor “Netherlands Educational Satellite for Exploration of Binary-Linked Astrophysics - X-ray Observer”. Ongeveer vierhonderd studenten helpen SRON, veertien Nederlandse onderwijsinstellingen en vele industriële partners om deze ruimtemissie te ontwikkelen van begin tot eind, onder leiding van wetenschappers en ingenieurs."
        },
        {
            title: "Vraagtekens rond röntgendubbelsterren",
            text: "Veel van de helderste objecten in het heelal zijn röntgendubbelsterren. Dit zijn combinaties van een extreem compact object, zoals een zwart gat of een neutronenster, en een begeleidende ster. Het compacte object onttrekt in de loop van de tijd de materie van zijn begeleidende ster. Hierbij komt veel energie vrij in een gebundelde straal—een jet. Wetenschappers begrijpen dit proces is nog niet helemaal, en zeker de aard van de stroom van materie vlak naast het zwarte gat blijft een groot mysterie."
        },
        {
            title: "Lange observatieperiodes",
            text: "NEBULA-Xplorer gaat onderzoeken hoe jets vormen en hoe deze röntgendubbelsterren evolueren. Hiervoor observeert hij deze objecten voor lange periodes om te zien hoe de emissie van deze bronnen varieert op tijdschalen van milliseconden tot weken. Deze lange observatietijd  maakt het mogelijk om röntgenactiviteit te combineren met gegevens uit andere golflengtes van andere telescopen."
        }
    ];
</script>



<section class="grid-wrapper">
    <ul class="paragraphs-grid">
        {#each paragraphs as paragraph}
            <li class="paragraph-item">
                <div class="paragraph-content">
                    <span class="paragraph-title"></span>
                    <h3>{paragraph.title}</h3>
                    <span class="paragraph-text"></span>
                    <p>{paragraph.text}</p>
                </div>

            </li>
        {/each}
    </ul>
</section>
