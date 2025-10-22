<script>
    import blackholeImage from "$lib/assets/blackhole.jpg";
</script>

<h2>What are we <span>up</span> to?</h2>
<p>What our current project entails</p>

<h2 class="mission-brief">Mission brief</h2>
<h3>Mission in development</h3>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis
    finibus nunc id tincidunt. Cras sed ultrices tortor, sed fermentum nulla.
    Pellentesque mattis nisl ac elit consequat ultricies. Nulla facilisi. Donec
    blandit sollicitudin ullamcorper. Phasellus in tristique tortor. Donec
    tincidunt lectus sit amet blandit vehicula. Quisque eu felis congue, tempor
    purus cursus, iaculis felis. Donec lorem velit, congue non accumsan eget,
    eleifend quis ipsum. Aenean ut diam euismod, gravida libero ac, luctus est.
</p>

<h3>Questions surrounding X-ray binaries</h3>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis
    finibus nunc id tincidunt. Cras sed ultrices tortor, sed fermentum nulla.
    Pellentesque mattis nisl ac elit consequat ultricies. Nulla facilisi. Donec
    blandit sollicitudin ullamcorper. Phasellus in tristique tortor. Donec
    tincidunt lectus sit amet blandit vehicula. Quisque eu felis congue, tempor
    purus cursus, iaculis felis. Donec lorem velit, congue non accumsan eget,
    eleifend quis ipsum. Aenean ut diam euismod, gravida libero ac, luctus est.
</p>

<h3>Questions surrounding X-ray binaries</h3>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis
    finibus nunc id tincidunt. Cras sed ultrices tortor, sed fermentum nulla.
    Pellentesque mattis nisl ac elit consequat ultricies. Nulla facilisi. Donec
    blandit sollicitudin ullamcorper. Phasellus in tristique tortor. Donec
    tincidunt lectus sit amet blandit vehicula. Quisque eu felis congue, tempor
    purus cursus, iaculis felis. Donec lorem velit, congue non accumsan eget,
    eleifend quis ipsum. Aenean ut diam euismod, gravida libero ac, luctus est.
</p>

<enhanced:img src={blackholeImage} alt="Black Hole"/>

<style>

    h2 {
        position: relative;
    }

    h2,
    h3 {
        font-family: var(--heading);
    }

    p {
        font-family: var(--paragraph);
    }

    h3,
    h2,
    p {
        grid-column: 1 / 9;
    }

    .mission-brief,
    h3 {
        color: var(--cleanroom-100);
    }

    span {
        color: var(--cleanroom-100);
    }

    enhanced\:img {
        height: 250px;
        width: auto;


        @media (min-width: 1183px) {
            position: absolute;
            right: 0;
            top: 50%; /* Gebruik de boven- en onderkant om verticaal te centreren */
            transform: translateY(-50%);
            max-width: 400px;
            height: auto;
            /* z-index: 10; */
        }
    }
</style>
