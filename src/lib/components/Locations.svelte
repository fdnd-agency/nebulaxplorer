<div class="wrapper">
    <div class="location">
        <img src="src/lib/assets/images/SRON-Leiden-e1742232793581.webp" alt="sron building in leiden">
        <p class="label">Leiden</p>
        <address>
            Niels Bohrweg 4<br />
            2333 CA Leiden<br />
            The Netherlands<br />
            31 (0)88 777 56 00<br />
        </address>
    </div>
    <div class="location">
        <img src="src/lib/assets/images/SRON-Groningen.webp" alt="sron building in groningen">
        <p class="label">Groningen</p>
        <address>
            Landleven 12<br />
            9747 AD Groningen<br />
            The Netherlands<br />
            31 (0)50 363 40 74<br />
        </address>
    </div>
</div>

<style> 
    .wrapper {
        display: flex;
        container-type: inline-size;
        
         @container (width > 650px) {
            display: flex;
            overflow: hidden;
         }
    }

    .location {
        position: relative;
        display: grid;
        font-size: 1rem;
        align-content: start;
        font-family: var(--font-detail);
        img {
            display: block;
            width: 100%;
            object-fit: cover;
        }
    }

    .label {
        display: none;
        
        @container (width > 1150px) {
            display: flex;
            text-transform: uppercase;
            position: absolute;
            top:0;
            left: 0;
            padding: var(--spacing-md);
            background-color: var(--palette-brand-700);
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            font-family: var(--font-detail);
            min-height: 11rem;
            justify-content: center;
        } 
    }  
    address {
        margin: 0.75rem 1rem 0.75rem 1rem;
        font-style: normal;

        @container (width > 1150px) {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 1rem;
            opacity: 0;
            pointer-events: none;
            margin: 0;
            min-height: 11rem;
            text-align: center;
            justify-content: center;
        }
        @media (prefers-reduced-motion: no-preference) { 
            transition: 0.6s ease-in-out;
        }
    }

    .label:hover + address {

        @container (width > 950px) {
            opacity: 1;
            font-style: normal;
            left: 4rem;
            padding: var(--spacing-md);
            background-color: var(--palette-brand-700);
            border-left: 2px solid var(--palette-accent-500);
            min-height: 11rem;
            text-align: center;
            justify-content: center;
        }
    }
</style>
