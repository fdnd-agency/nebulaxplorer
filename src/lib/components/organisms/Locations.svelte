<script>  
    import leiden from '$lib/assets/images/SRON-Leiden.webp?enhanced&w=1600;800;400';  
    import groningen from '$lib/assets/images/SRON-Groningen.webp?enhanced&w=1600;800;400';  
</script>  

<ul>
    <li class="location">
        <enhanced:img src={ leiden } alt="sron building in leiden" sizes="50vw" loading="lazy"/>
        <h4 class="label visually-hidden">Leiden</h4>
        <address>
            Niels Bohrweg 4<br>
            2333 CA Leiden<br>
            The Netherlands<br>
            <a href="tel:+31887775600">+31 (0)88 777 56 00</a>
        </address>
    </li>
    <li class="location">
        <enhanced:img src={ groningen } alt="sron building in groningen" sizes="50vw" loading="lazy"/>
        <h4 class="label visually-hidden">Groningen</h4>
        <address>
            Landleven 12<br>
            9747 AD Groningen<br>
            The Netherlands<br>
            <a href="tel:+31503634074">+31 (0)50 363 40 74</a>
        </address>
    </li>
</ul>

<style> 
    ul {
        display: flex;
    }

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

    .label {
        color:  var(--color-neutral-lightest);
        z-index: 1000;
        
        @container (width > 30ch) {
            width: auto;
            clip-path: none;
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

    address {
        margin: 0.75rem var(--spacing-md);
        font-style: normal;
        color:  var(--color-neutral-lightest);

        a {
            text-decoration: none;
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
        @media (prefers-reduced-motion: no-preference) { 
            transition: 0.6s ease-in-out;
        }
    }

.label:hover + address,
.location:focus-within address {

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
</style>