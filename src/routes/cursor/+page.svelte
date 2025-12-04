<!-- <script>
    import { nonpassive } from "svelte/legacy";
    import { createServerModuleRunnerTransport } from "vite";
</script> -->

<head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        defer
    ></script>
    <style>
        /* Reset & base layout */
        *,
        *::before,
        *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            width: 100%;
            min-height: 100vh;
            background: #e2e2e2;
            overflow: hidden;
            cursor: none;
        }

        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #385e7c;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }

        :global(.tree) {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        :global(.candle) {
            width: 4px; 
            height: 20px;
            border-radius: 1px;
        }

        :global(.star) {
            clip-path: polygon(
                50% 0%,
                61% 35%,
                100% 35%,
                69% 57%,
                80% 91%,
                50% 70%,
                20% 91%,
                31% 57%,
                0% 35%,
                39% 35%
            );
        }

        .img {
            position: absolute;
            width: 300px;
            height: 400px;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }

        .img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    </style>
</head>

<body>
    <div id="custom-cursor"></div>

    <div class="img">
        <img
            src="https://images.pexels.com/photos/3392982/pexels-photo-3392982.jpeg"
        />
    </div>
    <div class="img">
        <img
            src="https://images.pexels.com/photos/4348556/pexels-photo-4348556.jpeg"
        />
    </div>
    <div class="img">
        <img
            src="https://images.pexels.com/photos/2887774/pexels-photo-2887774.jpeg"
        />
    </div>
    <div class="img">
        <img
            src="https://images.pexels.com/photos/7184344/pexels-photo-7184344.jpeg"
        />
    </div>

    <div class="img">
        <img
            src="https://images.pexels.com/photos/3854478/pexels-photo-3854478.jpeg"
        />
    </div>

    <div class="img">
        <img
            src="https://images.pexels.com/photos/8467429/pexels-photo-8467429.jpeg"
        />
    </div>

    <div class="img">
        <img
            src="https://images.pexels.com/photos/6624869/pexels-photo-6624869.jpeg"
        />
    </div>

    <div class="img">
        <img
            src="https://images.pexels.com/photos/5255999/pexels-photo-5255999.jpeg"
        />
    </div>

    <div class="img">
        <img
            src="https://images.pexels.com/photos/7235328/pexels-photo-7235328.jpeg"
        />
    </div>

    <script>
        document.addEventListener("mousemove", (e) => {
            gsap.to(".img", {
                x: e.clientX,
                y: e.clientY,
                stagger: 0.1,
            });
        });
    </script>
</body>
