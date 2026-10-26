<script>  
    import leiden from '$lib/assets/images/SRON-Leiden.webp?enhanced&w=1600;800;400';  
    import groningen from '$lib/assets/images/SRON-Groningen.webp?enhanced&w=1600;800;400';  
</script>  
        <enhanced:img src={ leiden } alt="sron building in leiden" sizes="50vw" loading="lazy"/>
        <enhanced:img src={ groningen } alt="sron building in groningen" sizes="50vw" loading="lazy"/>
    .location {
        position: relative;
        display: grid;
        font-size: var(--font-size-body-md);
        align-content: start;

        container-type: inline-size;
        flex: 1 0 auto;
        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }
        @container (width > 30ch) {
            display: flex;
            text-transform: uppercase;
            position: absolute;
            top:0;
            left: 0;
            padding: var(--spacing-md);
            background-color: var(--color-brand-darkest);
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            min-height: 11rem;
            justify-content: center;            
        } 
    }  
        @container (width > 30ch) {
            display: flex;
            justify-content: center;
            text-align: center;
            font-size: var(--font-size-body-md);
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            margin: 0;
            min-height: 11rem;
            pointer-events: none;
        }
        @container (width > 30ch) {
            opacity: 1;
            font-style: normal;
            left: var(--spacing-2xl);
            padding: var(--spacing-md);
            background-color:  var(--color-brand-darkest);
            border-left: 2px solid var(--color-accent-dark);
            min-height: 11rem;
            text-align: center;
            justify-content: center;
            z-index: 1000;
        }
    }
