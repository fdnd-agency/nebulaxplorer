<div class="abstract-canvas">
    <div class="color-layer layer-1"></div>
    <div class="color-layer layer-2"></div>
    <div class="color-layer layer-3"></div>
    <div class="color-layer layer-4"></div>
    <div class="color-layer layer-5"></div>
    <div class="color-layer layer-6"></div>
    <div class="color-layer layer-7"></div>
    <div class="color-layer layer-8"></div>
    <div class="color-layer layer-9"></div>
    <div class="color-layer layer-10"></div>
    <div class="color-layer layer-11"></div>
    <div class="color-layer layer-12"></div>
    <div class="color-layer layer-13"></div>
    <div class="color-layer layer-14"></div>
    <div class="color-layer layer-15"></div>
    <div class="color-layer layer-16"></div>
    <div class="color-layer layer-17"></div>
    <div class="color-layer layer-18"></div>
    <div class="color-layer layer-19"></div>
    <div class="color-layer layer-20"></div>

    <h2 class="overlay-text">Pretty Abstract Gradient Animation</h2>
</div>

<style>
    /* STAP 1 & 2: Registratie en Keyframes (Blijven ongewijzigd van de vorige stap) */

    @property --abstract-color {
        syntax: "<color>";
        initial-value: red;
        inherits: false;
    }
    @property --pos-x {
        syntax: "<length>";
        initial-value: 0px;
        inherits: false;
    }
    @property --pos-y {
        syntax: "<length>";
        initial-value: 0px;
        inherits: false;
    }
    @property --bg-color {
        syntax: "<color>";
        initial-value: #ffffff;
        inherits: false;
    }

    @keyframes abstractColorShift {
        0% {
            --abstract-color: #ff0000;
        }
        25% {
            --abstract-color: #ffff00;
        }
        50% {
            --abstract-color: #008000;
        }
        75% {
            --abstract-color: #0000ff;
        }
        100% {
            --abstract-color: #ff0000;
        }
    }

    @keyframes randomMotion {
        0% {
            --pos-x: -400px;
            --pos-y: 200px;
            transform: translate(var(--pos-x), var(--pos-y)) rotate(0deg);
        }
        33% {
            --pos-x: 550px;
            --pos-y: 280px;
            transform: translate(var(--pos-x), var(--pos-y)) rotate(120deg);
        }
        66% {
            --pos-x: -600px;
            --pos-y: -600px;
            transform: translate(var(--pos-x), var(--pos-y)) rotate(240deg);
        }
        100% {
            --pos-x: 600px;
            --pos-y: -450px;
            transform: translate(var(--pos-x), var(--pos-y)) rotate(360deg);
        }
    }

    @keyframes backgroundShift {
        0% {
            --bg-color: #ffffff;
        }
        25% {
            --bg-color: #90d5ff;
        }
        50% {
            --bg-color: #ff7f7f;
        }
        75% {
            --bg-color: #dfc5fe;
        }
        100% {
            --bg-color: #ffffff;
        }
    }

    /* STAP 3 & 4: De Container en Basisstijl */
    .abstract-canvas {
        width: 100vw;
        height: 100vh;
        position: relative;
        overflow: hidden;
        background-color: var(--bg-color);
        animation: backgroundShift 25s infinite alternate ease-in-out;
    }

    .color-layer {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 450px;
        height: 450px;
        border-radius: 50%;
        opacity: 0.65; /* Iets lagere transparantie door meer lagen */
        filter: blur(45px); /* Iets meer blur voor zachte overgangen */
        will-change: transform, background-color;

        animation:
            abstractColorShift 20s infinite linear alternate,
            randomMotion 10s infinite ease-in-out alternate;
    }

    /* STAP 5: Individuele Lagen (Uitgebreid naar 20) */

    /* De 20 lagen */
    .layer-1 {
        background: var(--abstract-color, #ff4500);
        transform: translate(-150px, -150px);
        animation-delay: 0s, 0s;
        animation-duration: 20s, 9s;
    }
    .layer-2 {
        background: var(--abstract-color, #adff2f);
        transform: translate(100px, -200px);
        animation-delay: -5s, 3s;
        animation-duration: 17s, 12s;
        width: 150px;
        height: 150px;
    }
    .layer-3 {
        background: var(--abstract-color, #00bfff);
        transform: translate(-250px, 100px);
        animation-delay: -10s, 7s;
        animation-duration: 22s, 8s;
    }
    .layer-4 {
        background: var(--abstract-color, #8a2be2);
        transform: translate(200px, 50px);
        animation-delay: -3s, 10s;
        animation-duration: 15s, 11s;
        opacity: 0.5;
    }
    .layer-5 {
        background: var(--abstract-color, #ffd700);
        transform: translate(-50px, 200px);
        animation-delay: -8s, 4s;
        animation-duration: 19s, 13s;
        width: 300px;
        height: 300px;
    }
    .layer-6 {
        background: var(--abstract-color, #fa8072);
        transform: translate(150px, -10px);
        animation-delay: -15s, 6s;
        animation-duration: 24s, 7s;
    }
    .layer-7 {
        background: var(--abstract-color, #00ff7f);
        transform: translate(-300px, -50px);
        animation-delay: -2s, 9s;
        animation-duration: 16s, 14s;
    }
    .layer-8 {
        background: var(--abstract-color, #4682b4);
        transform: translate(50px, 300px);
        animation-delay: -12s, 1s;
        animation-duration: 21s, 10s;
    }
    .layer-9 {
        background: var(--abstract-color, #ff69b4);
        transform: translate(300px, -100px);
        animation-delay: -1s, 2s;
        animation-duration: 18s, 9s;
        width: 180px;
        height: 180px;
        opacity: 0.6;
    }
    .layer-10 {
        background: var(--abstract-color, #b0e0e6);
        transform: translate(-50px, -300px);
        animation-delay: -4s, 5s;
        animation-duration: 23s, 11s;
    }
    .layer-11 {
        background: var(--abstract-color, #ff4500);
        transform: translate(-200px, 250px);
        animation-delay: -6s, 8s;
        animation-duration: 14s, 7s;
        width: 100px;
        height: 100px;
    }
    .layer-12 {
        background: var(--abstract-color, #adff2f);
        transform: translate(250px, 200px);
        animation-delay: -9s, 12s;
        animation-duration: 17s, 13s;
        opacity: 0.4;
    }
    .layer-13 {
        background: var(--abstract-color, #00bfff);
        transform: translate(-350px, -20px);
        animation-delay: -11s, 14s;
        animation-duration: 20s, 9s;
    }
    .layer-14 {
        background: var(--abstract-color, #8a2be2);
        transform: translate(0px, 150px);
        animation-delay: -13s, 15s;
        animation-duration: 19s, 14s;
        width: 350px;
        height: 350px;
    }
    .layer-15 {
        background: var(--abstract-color, #ffd700);
        transform: translate(100px, -300px);
        animation-delay: -14s, 0.5s;
        animation-duration: 16s, 8s;
    }
    .layer-16 {
        background: var(--abstract-color, #fa8072);
        transform: translate(-300px, 300px);
        animation-delay: -16s, 1.5s;
        animation-duration: 21s, 11s;
        width: 280px;
        height: 280px;
        opacity: 0.75;
    }
    .layer-17 {
        background: var(--abstract-color, #00ff7f);
        transform: translate(350px, -150px);
        animation-delay: -7s, 4.5s;
        animation-duration: 14s, 9.5s;
        width: 200px;
        height: 200px;
    }
    .layer-18 {
        background: var(--abstract-color, #4682b4);
        transform: translate(-10px, -350px);
        animation-delay: -18s, 7.5s;
        animation-duration: 25s, 12.5s;
    }
    .layer-19 {
        background: var(--abstract-color, #ff69b4);
        transform: translate(-400px, 180px);
        animation-delay: -2s, 11.5s;
        animation-duration: 17s, 8.5s;
        opacity: 0.6;
    }
    .layer-20 {
        background: var(--abstract-color, #b0e0e6);
        transform: translate(450px, 250px);
        animation-delay: -9.5s, 6.5s;
        animation-duration: 20s, 10.5s;
        width: 120px;
        height: 120px;
    }

    /* Styling voor de tekst (voorgrond) */
    .overlay-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #1a1a1a;
        font-size: 3em;
        font-family: sans-serif;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        z-index: 10;
    }
</style>
