<script>
    import { onMount } from 'svelte';
    import satelliteImage from "$lib/assets/images/nebula-xplorer.jpg";

    // Current window scroll position (simplifies component logic)
    let scrollY = 0;
    // Reference to the main container element
    let container;

    // Component's total height for scroll duration
    const CONTENT_HEIGHT = 760; 
    
    // Max rotation/translation values
    const MAX_ROTATION_X = 5; 
    const MAX_ROTATION_Y = 10; 
    const MAX_TRANSLATE_Z = 100; 
    const MAX_TRANSLATE_Y = 50; // Max drift/sway movement

    // Calculated transform values
    let rotateX = 0;
    let rotateY = 0;
    let translateY_drift = 0; 
    let translateZ = 0;
    let scroll_y_offset = 0;

    // Fixed image height in pixels (18.75rem * 16px = 300px, assuming base 16px font)
    const IMAGE_HEIGHT = 300; 
    
    // Reactive calculation block that runs whenever scrollY changes
    $: {
        if (container) {
            const containerTop = container.offsetTop;
            
            // Calculate scroll progress (0 to 1) within the component's height
            let progress = (scrollY - containerTop) / CONTENT_HEIGHT;
            progress = Math.max(0, Math.min(1, progress));
            const progressCenter = progress - 0.5;

            // 1. 3D Rotation and Depth (Rotation based on progressCenter, Z based on cosine wave)
            rotateY = progressCenter * MAX_ROTATION_Y * 2; 
            rotateX = Math.sin(progress * Math.PI * 2) * MAX_ROTATION_X;
            translateZ = Math.cos(progress * Math.PI * 2) * MAX_TRANSLATE_Z;
            
            // 2. Vertical 'Sway' (light, organic movement based on sine wave)
            translateY_drift = Math.sin(progress * Math.PI * 1.5) * MAX_TRANSLATE_Y;
            
            // 3. VERTICAL SCROLL COMPENSATION (Ensures image follows text to the bottom)
            // Total distance the image needs to travel vertically (Component Height - Image Height)
            const MAX_VERTICAL_TRAVEL = CONTENT_HEIGHT - IMAGE_HEIGHT;
            
            // The image starts at the top of the text and moves down by this offset
            scroll_y_offset = progress * MAX_VERTICAL_TRAVEL;
        }
    }
    
    // Final CSS transform string
    $: transformStyle = `
        transform: 
            perspective(62.5rem) 
            translateY(${translateY_drift + scroll_y_offset}px) 
            translateZ(${translateZ}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg);
    `;

    // Use Svelte's built-in binding for scrollY on the window object
    onMount(() => {
        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        // Explicitly bind to window scroll to ensure it works correctly
        window.addEventListener('scroll', handleScroll); 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div class="mission-brief-container" bind:this={container} style="height: {CONTENT_HEIGHT}px;">
    
    <div class="mission-grid">
        
        <div class="content">
            <h1 class="main-title">Mission brief</h1>

            <section>
                <h2 class="section-title">Mission in development</h2>
                <p>
                    NEBULA-Xplorer staat voor "Netherlands Educational Satellite for Exploration of Binary-Linked Astrophysics - X-ray Observer". Ongeveer vierhonderd studenten helpen SRON, veertien Nederlandse onderwijsinstellingen en vele industriële partners om deze ruimtemissie te ontwikkelen van begin tot eind, onder leiding van wetenschappers en ingenieurs.
                </p>

                <h2 class="section-title">Vraagtekens rond röntgendubbelsterren</h2>
                <p>
                    Veel van de helderste objecten in het heelal zijn röntgendubbelsterren. Dit zijn combinaties van een extreem compact object, zoals een zwart gat of een neutronenster, en een begeleidende ster. Het compacte object onttrekt in de loop van de tijd de materie van zijn begeleidende ster. Hierbij komt veel energie vrij in een gebundelde straal—een jet. Wetenschappers begrijpen dit proces is nog niet helemaal, en zeker de aard van de stroom van materie vlak naast het zwarte gat blijft een groot mysterie.
                </p>

                <h2 class="section-title">Lange observatieperiodes</h2>
                <p>
                    NEBULA-Xplorer gaat onderzoeken hoe jets vormen en hoe deze röntgendubbelsterren evolueren. Hiervoor observeert hij deze objecten voor lange periodes om te zien hoe de emissie van deze bronnen varieert op tijdschalen van milliseconden tot weken. Deze lange observatietijd maakt het mogelijk om röntgenactiviteit te combineren met gegevens uit andere golflengtes van andere telescopen.
                </p>
            </section>
        </div>

        <div class="parallax-sticky-wrapper">
            <div class="mission-image-wrapper" style={transformStyle}>
                <img 
                    src={satelliteImage} 
                    alt="NEBULA-Xplorer satellite model" 
                    class="satellite-image"
                />
            </div>
        </div>

    </div>
</div>

<style>

    .mission-brief-container {
        position: relative;
        background-color: var(--space-100);
        color: var(--white);
        padding: 3.125rem; 
    }

    .mission-grid {
        display: flex;
        justify-content: space-between;
    }

    .content {
        position: relative;
        z-index: 9; 
        width: 60%; 
        padding-top: 0; 
        min-height: 100%; 
    }
    
    .parallax-sticky-wrapper {
        position: sticky;
        top: 3.125rem; 
        height: 100vh; 
        display: flex;
        justify-content: flex-start; 
        align-items: flex-start; 
        pointer-events: none;
        z-index: 9;
        width: 40%; 
        padding-top: 0; 
    }

    .mission-image-wrapper {
        will-change: transform;
        width: 18.75rem;
        height: 18.75rem; 
        transition: transform 0.0s linear; 
        transform: perspective(62.5rem); 
    }
    
    .satellite-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .main-title {
        font-size: 3rem;
        font-weight: bold;
        color: var(--cleanroom-100);
        margin-bottom: 3.125rem;
        padding-top: 0; 
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
        font-size: 1.1rem; 
        line-height: 1.5;
    }
</style>