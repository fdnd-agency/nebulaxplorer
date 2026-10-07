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
        
    }  
    address {
        margin: 0.75rem 1rem 0.75rem 1rem;
        font-style: normal;


    .label:hover + address {

    }
</style>
