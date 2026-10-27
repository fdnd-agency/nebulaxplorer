<footer>
    <div class="footer-top">
        <a href="/"><img class="logosron" src="src/lib/assets/logos/SRON_Academy_OnSpaceBlue-1024x422.png" alt="logo of sron academy" width="230" height="100"></a>

        <address>
            Niels Bohrweg 4<br />
            2333 CA Leiden<br />
            The Netherlands<br />
            31 (0)88 777 56 00<br />
        </address>

        <address>
            Landleven 12<br />
            9747 AD Groningen<br />
            The Netherlands<br />
            31 (0)50 363 40 74<br />
        </address>
        
        <a href="https://www.sron.nl/"><img class="white-logo-sron" src="src/lib/assets/logos/SRON_Full_White.webp" alt="full white logo of sron" width="200" height="45"></a>
    </div>

    <nav class="footer-nav">
        <ul>
            <li><a href="/">About us</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="https://www.nwo-i.nl/en/privacy-policy/">Privacy Policy</a></li>
        </ul>

        <p>Follow nebula</p>

        <ul class="social-icons">
            <li><a href="https://web-cdn.bsky.app/profile/did:plc:xskzoixc54ebxryzak45u7ra"><img src="src/lib/assets/images/Social_Icon_BlueSky.png" alt="logo of bluesky" width="25" height="25"></a></li>
            <li><a href="https://www.instagram.com/sron_space/"><img src="src/lib/assets/images/Social_Icon_Instagram.png" alt="logo of instagram" width="25" height="25"></a></li>
            <li><a href="https://www.linkedin.com/company/sron"><img src="src/lib/assets/images/Social_Icon_LinkedIn.png" alt="logo of linkedin" width="25" height="25"></a></li>
        </ul>  
    </nav>

    <p class="quote">What happens up there, starts down here.</p>
</footer>

<style>
    .footer-top {
        margin: var(--spacing-lg) var(--spacing-xl);
        color: var(--color-neutral-lightest);

        @media (width > 850px) {
            display: grid;
            grid-template-columns: 1fr auto auto auto;
            margin: var(--spacing-xl);
            align-items: end;
            column-gap: var(--spacing-lg);
            margin: var(--spacing-xl);
            font-size:  var(--step-0);  
        }
    }
    address {
        display: none;

        @media (width > 1150px) {
            display: flex;
            font-style: normal;
        }
    }
    .white-logo-sron {
        margin-top: var(--spacing-lg);

        @media (width > 850px) {
            align-self: end;
            margin-left: var(--spacing-md);
            margin-top: 0rem;
        }
    }

    .footer-nav {
        margin: var(--spacing-lg) var(--spacing-xl);
        color: var(--color-neutral-lightest);
        text-transform: uppercase;
        
        border-top: 3px solid;
        border-top-color: var(--color-accent-mid);
        padding-top: var(--spacing-lg);
        
        ul {
            list-style: none;

             @media (width > 850px) {
                display: flex;
                gap: var(--spacing-lg);
            }
        }
        p {
            margin-bottom: var(--spacing-sm);
        }

        a {
            text-decoration: none;
            &:hover {
                text-decoration: underline;
                text-underline-offset: 5px;
            }
        }

        @media (width > 850px) {
            display: grid;
            grid-template-columns: 1fr auto auto;
            align-items: center;
            column-gap: var(--spacing-lg);
            margin: var(--spacing-lg) var(--spacing-xl);
            color: var(--color-neutral-lightest);
            text-transform: uppercase;
        }
    }

    .social-icons {
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;
        list-style: none;
    }

     .quote {
        text-align: center;
        font-family: var(--font-caption);
        background-color: var(--color-accent-mid);
        font-size: 1rem;
        max-width: none;
    }
</style>