<script>
  import { T } from "@threlte/core";
  import { onMount } from "svelte";
  import { Grid, OrbitControls } from "@threlte/extras";
  import {
    CustomBlending,
    MinEquation,
    OneFactor,
    MultiplyBlending,
    SrcAlphaFactor,
    AddEquation,
    OneMinusSrcAlphaFactor,
  } from "three";
  console.log(CustomBlending, "hi");

  const layers = 2;
  const cols = 5;
  const rows = 3;

  const radius = 0.3;
  const gap = 0.15;

  const step = radius * 2 + gap;

  const primaryColor = getComputedStyle(document.body)
    .getPropertyValue("--primary")
    .trim();

  const secondaryColor = getComputedStyle(document.body)
    .getPropertyValue("--secondary")
    .trim();

  let offsetX = 0;
  let offsetY = 0;
  let cameraX = 0;
  let cameraY = 0;
  let aspect = 0;

  const calculateOffsets = () => {
    aspect = window.innerWidth / window.innerHeight;
    const cameraZ = 5;
    const targetZ = -2;
    const distance = cameraZ - targetZ;
    const fov = 50;

    const fovRadians = fov * (Math.PI / 180);
    const visibleHeight = 2 * Math.tan(fovRadians / 2) * distance;
    const visibleWidth = visibleHeight * aspect;

    offsetX = -visibleWidth / 2 + radius;
    offsetY = visibleHeight / 2 - radius - step; // Move down 1 row
  };

  const handleMouseMove = (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    const parallaxStrength = 0.1;
    cameraX = mouseX * parallaxStrength * aspect;
    cameraY = mouseY * parallaxStrength;
  };

  onMount(() => {
    calculateOffsets();
    window.addEventListener("resize", calculateOffsets);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", calculateOffsets);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
</script>

<T.PerspectiveCamera position={[cameraX, cameraY, 5]} makeDefault />

<T.AmbientLight intensity={1} color={"white"} />
<T.PointLight position={[0, 0, 5]} intensity={30} />

{#each Array(layers) as _, layerIndex}
  {#each Array(rows) as _, rowIndex}
    {#each Array(cols) as _, colIndex}
      <T.Mesh
        position={[
          offsetX + colIndex * step - layerIndex * -0.35,
          offsetY - rowIndex * step - layerIndex * -0.02,
          -2 + layerIndex * 0.5,
        ]}
      >
        <T.SphereGeometry args={[radius, 16, 16]} />
        <T.MeshStandardMaterial
          color={layerIndex % 2 === 0 ? primaryColor : secondaryColor}
          roughness={1}
          opacity={0.8}
          transparent
          blending={CustomBlending}
          blendEquation={AddEquation}
          blendSrc={SrcAlphaFactor}
          blendDst={OneMinusSrcAlphaFactor}
          depthTest={false}
        />
      </T.Mesh>
    {/each}
  {/each}
{/each}
