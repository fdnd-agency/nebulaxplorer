<script>
  import { onMount } from "svelte";
  
  onMount(async () => {
    const { gsap } = await import("gsap");
    
    const button = document.querySelector('[data-target="button"]');
    const mainTl = gsap.timeline({ paused: true });
    const confettiPaths = document.querySelectorAll(".confetti path");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const buttonTl = (el) => {
      const tl = gsap
        .timeline()
        .to(el, { duration: 0.05, scale: 0.9 })
        .to(el, { duration: 0.1, rotation: "5deg" })
        .to(el, { duration: 0.1, rotation: "-5deg" })
        .to(el, { duration: 0.1, rotation: "0", scale: 1 });
      return tl;
    };

    const individualTl = (id, path) => {
      const tl = gsap
        .timeline()
        .to(id, {
          duration: 0.5,
          motionPath: {
            path: path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
          },
          opacity: 1
        })
        .to(
          id,
          {
            duration: 0.1,
            opacity: 0
          },
          ">-.1"
        );
      return tl;
    };

    const buildMainTl = (timeline) => {
      timeline.add(buttonTl(button));
      for (let i = 1; i <= confettiPaths.length; i++) {
        timeline.add(individualTl(`#c${i}`, `#p${i}`), "<+.1");
      }
    };

    if (!reduceMotion.matches) {
      buildMainTl(mainTl);
      button.addEventListener("mouseup", () => {
        mainTl.play(0);
      });
    }
  });
</script>

<!-- Button & Text -->


<div class="stars"></div>
<section class="background">
<div class="container">


<main>

  <div>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 60 55">
    <g>
      <path id="p1" d="M28 53c-6.5-34.41-16.04-14.34-20 0" />
      <path id="p2" d="M29 53c5.74-35.6 21.18-56.57 28 0" />
      <path id="p3" d="M28 51c.2-12.6-18-57.5-25 2" />
      <path id="p4" d="M29 51.54C28.81 39.63 39.9-.23 49 53" />
      <path id="p5" d="M29 51c1-49.5-14.5-58.5-14 2" />
      <path id="p6" d="M29.04 50.82C28.12-3.02 42.45-12.8 42 53" />
      <path id="p7" d="M28.98 50.64C29.34-7.9 23.83-18.53 24 53" />
      <path id="p8" d="M28.98 50.64C29.34-7.9 23.83-18.53 24 53" />
      <path id="p9" d="M29.04 50.82C28.12-3.02 42.45-12.8 42 53" />
      <path id="p10" d="M29 51c1-49.5-14.5-58.5-14 2" />
      <path id="p11" d="M29 51.54C28.81 39.63 39.9-.23 49 53" />
      <path id="p12" d="M28 51c.2-12.6-18-57.5-25 2" />
      <path id="p13" d="M29 53c5.74-35.6 21.18-56.57 28 0" />
      <path id="p14" d="M28 53c-6.5-34.41-16.04-14.34-20 0" />
    </g>

    <g class="confetti">
      <path id="c1" fill="#F7BB83" d="M24 49h6v2h-6z" />
      <path id="c2" fill="#99E6D8" d="M26 49h6v2h-6z" />
      <path id="c3" fill="#AB78DA" d="M28 49h6v2h-6z" />
      <path id="c4" fill="#F4D569" d="M30 49h6v2h-6z" />
      <path id="c5" fill="#7ED16A" d="M32 49h6v2h-6z" />
      <path id="c6" fill="#6AACD1" d="M34 49h6v2h-6z" />
      <path id="c7" fill="#EB8D93" d="M36 49h6v2h-6z" />
      <path id="c8" fill="#F7BB83" d="M24 49h6v2h-6z" />
      <path id="c9" fill="#99E6D8" d="M26 49h6v2h-6z" />
      <path id="c10" fill="#AB78DA" d="M28 49h6v2h-6z" />
      <path id="c11" fill="#F4D569" d="M30 49h6v2h-6z" />
      <path id="c12" fill="#7ED16A" d="M32 49h6v2h-6z" />
      <path id="c13" fill="#6AACD1" d="M34 49h6v2h-6z" />
      <path id="c14" fill="#EB8D93" d="M36 49h6v2h-6z" />
    </g>
  </svg>
  <button data-target="button">Submit</button>
</div>
</main>

</div>
</section>


<style>

/* Text Styling */

h1{
  color: #64054c;  
}

/* Layout */

 .background {
  margin:0;
  padding:0;
  width:100%;
  height:100vh;
  background-color: #32262f;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  font-family: dynapuff;
}

.container {
  max-width: 80vw;
}

/* Button */

button {
  display: inline-block;
  outline: none;
  padding: 8px 14px;
  background: transparent;
  border: solid 4px #a10f7d;
  color: #a10f7d;
  text-decoration: none;
  border-radius: 99px;
  padding: 12px 25px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  line-height: 18px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}


/* Stars */ 

.stars {
    position: fixed;
    top: 50%;
    left: 50%;
    height: 1px;
    width: 1px;
    background-color: #fff;
    border-radius: 50%; 
  box-shadow: 24vw 9vh 1px 0px #fff,12vw -24vh 0px 1px #fff,-45vw -22vh 0px 0px #fff,-37vw -40vh 0px 1px #fff,29vw 19vh 0px 1px #fff,4vw -8vh 0px 1px #fff,-5vw 21vh 1px 1px #fff,-27vw 26vh 1px 1px #fff,-47vw -3vh 1px 1px #fff,-28vw -30vh 0px 1px #fff,-43vw -27vh 0px 1px #fff,4vw 22vh 1px 1px #fff,36vw 23vh 0px 0px #fff,-21vw 24vh 1px 1px #fff,-16vw 2vh 1px 0px #fff,-16vw -6vh 0px 0px #fff,5vw 26vh 0px 0px #fff,-34vw 41vh 0px 0px #fff,1vw 42vh 1px 1px #fff,11vw -13vh 1px 1px #fff,48vw -8vh 1px 0px #fff,22vw -15vh 0px 0px #fff,45vw 49vh 0px 0px #fff,43vw -27vh 1px 1px #fff,20vw -2vh 0px 0px #fff,8vw 22vh 0px 1px #fff,39vw 48vh 1px 1px #fff,-21vw -11vh 0px 1px #fff,-40vw 45vh 0px 1px #fff,11vw -30vh 1px 0px #fff,26vw 30vh 1px 0px #fff,45vw -29vh 0px 1px #fff,-2vw 18vh 0px 0px #fff,-29vw -45vh 1px 0px #fff,-7vw -27vh 1px 1px #fff,42vw 24vh 0px 0px #fff,45vw -48vh 1px 0px #fff,-36vw -18vh 0px 0px #fff,-44vw 13vh 0px 1px #fff,36vw 16vh 0px 1px #fff,40vw 24vh 0px 0px #fff,18vw 11vh 0px 0px #fff,-15vw -23vh 1px 0px #fff,-24vw 48vh 0px 1px #fff,27vw -45vh 1px 0px #fff,-2vw -24vh 0px 1px #fff,-15vw -28vh 0px 0px #fff,-43vw 13vh 1px 0px #fff,7vw 27vh 1px 0px #fff,47vw 5vh 0px 0px #fff,-45vw 15vh 1px 1px #fff,-5vw -28vh 0px 1px #fff,38vw 25vh 1px 1px #fff,-39vw -1vh 1px 0px #fff,5vw 0vh 1px 0px #fff,49vw 13vh 0px 0px #fff,48vw 10vh 0px 1px #fff,19vw -28vh 0px 0px #fff,4vw 7vh 0px 0px #fff,21vw 21vh 1px 1px #fff,-15vw -15vh 0px 1px #fff,-6vw -42vh 1px 0px #fff,-15vw 48vh 1px 1px #fff,-23vw 25vh 1px 1px #fff,-48vw 25vh 0px 1px #fff,-31vw -19vh 0px 1px #fff,4vw 37vh 1px 1px #fff,-43vw 28vh 0px 0px #fff,3vw -25vh 0px 1px #fff,-39vw 14vh 0px 1px #fff,-40vw 31vh 0px 1px #fff,35vw -36vh 1px 1px #fff,16vw 49vh 0px 0px #fff,6vw 39vh 0px 0px #fff,3vw -35vh 0px 1px #fff,-44vw -2vh 1px 0px #fff,-6vw 21vh 1px 0px #fff,48vw 9vh 1px 1px #fff,-43vw 30vh 1px 1px #fff,29vw -12vh 1px 1px #fff,-48vw 13vh 1px 0px #fff,-42vw 32vh 1px 1px #fff,34vw 15vh 1px 1px #fff,29vw -37vh 1px 1px #fff,28vw 2vh 0px 0px #fff;
  animation: zoom 10s alternate infinite; 
}

@keyframes zoom {
    0%{
        transform: scale(1);
    }
    100%{
        transform: scale(1.5);
    }
}

body {
  background-color: #313752;
  display: grid;
  font-family: "Orelega One", sans-serif;
  min-height: 100vh;
  place-items: center;
}

div {
  position: relative;
  text-align: center;
}

svg {
  bottom: 0;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 400px;
  z-index: -1;
}

.confetti {
  path {
    opacity: 0;
  }
}

button {
  background-color: #202541;
  border: unset;
  border-radius: 999px;
  color: $primary;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  padding: 1rem 2rem;

  :hover {
    box-shadow: 0 0.25rem 0.75rem -0.125rem rgba(black, 0.2),
      0 0.25rem 1rem -0.75rem rgba($primary, 0.5);
    color: lighten($primary, 10%);
    transition-duration: 0.15s;
    transition-property: box-shadow, color;
    transition-timing-function: ease-out;
  }

  :active {
    box-shadow: unset;
    transition-duration: 0.15s;
    transition-property: box-shadow;
    transition-timing-function: ease-out;
  }
}

 </style>