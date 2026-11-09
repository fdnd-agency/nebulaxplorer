<script>
    let { image, alt, city, street, postalCode, phone } = $props();
</script>

<li class="location">
    <enhanced:img src={image} alt={alt} sizes="50vw" loading="lazy"/>
    <h4 class="label visually-hidden">{city}</h4>
    <address>
        {street}<br>
        {postalCode}<br>
        The Netherlands<br>
        <a href="tel:">{phone}</a>
    </address>
</li>

<style>
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