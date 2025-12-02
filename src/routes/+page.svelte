<script>
  import { onMount } from "svelte";

  onMount(async () => {
    try {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);

      await document.fonts.ready;
      gsap.set(".split", { opacity: 1 });

      const split = SplitText.create(".split", { type: "chars, words", mask: "chars" });

      const tween = gsap.from(split.chars, {
        duration: 2,
        yPercent: "random([-150, 150])",
        xPercent: "random([-150, 150])",
        stagger: { from: "random", amount: 0.6 },
        ease: "power3.out"
      });

      const btn = document.querySelector("button");
      if (btn) btn.addEventListener("click", () => tween.play(0));
    } catch (err) {
      console.error("GSAP init failed:", err);
    }
  });
</script>

<!-- Poem -->

<section class="poem">
<div class="container">
<p class="heading">Nevertheless</p>
<p class="heading">Trotzdem</p>
  <p class="split">
    her call sounds like <br>
all kinds of fruit; green and purple <br>
                         a loud laugh.— <br>
she just needs to let herself <br>
fall <br>
cherries and grapes
  </p>
</div>

<p class="secondary">Translated from the author</p>
<h2 class="tertiary">Annette C. Boehm</h2>
<p class="secondary">November 2024</p>
<button>Replay</button>
</section>


 <style>

@import url('https://fonts.googleapis.com/css2?family=Modak&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sirivennela&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap');

.modak-regular {
  font-family: "Modak", system-ui;
  font-weight: 400;
}

.sirivennela-regular {
  font-family: "Sirivennela", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.dynapuff {
  font-family: "DynaPuff", system-ui;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

 .poem {
  margin:0;
  padding:0;
  width:100%;
  height:100vh;
  background-color: #EA96BD;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  font-family: dynapuff;
  background: #0e100f;
  background: radial-gradient(129% 99% at 112% 85%, #f0b5eb, #C489C1 90%),    
    url('https://assets.codepen.io/16327/noise-e82662fe.png');  
  background-blend-mode: color-dodge;
}

.container {
  max-width: 80vw;
}

.split {
  opacity: 0;
  text-align:center;
  font-size: clamp(2rem, 6rem, 3vw);
  letter-spacing: 0.05rem;
  will-change: transform;
  color: #3B6919;
}

.split * {
  will-change: transform;
}

button {
  display: inline-block;
  outline: none;
  padding: 8px 14px;
  background: transparent;
  border: solid 4px #0c4509;
  color: #0c4509;
  text-decoration: none;
  border-radius: 99px;
  padding: 12px 25px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  line-height: 18px;
}

.heading{
font-size: 3rem;
font-family: modak;
  text-align:center;
  color: #f0b5eb;  
  margin: 0;
}

.secondary{
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align:center;
  color: #3B6919;  
}

.tertiary{
font-family: sirivennela;
  text-align:center;
  color: #3B6919;  
}
 </style>