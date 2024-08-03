<script>
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/components/scene.svelte";

  import Confetti from "$lib/components/confetti.svelte";
  import Javi from "$lib/components/javi.svelte";
</script>

<main style:width="100vw" style:height="100vh">
  <Canvas>
    <Scene />
  </Canvas>
</main>

<Confetti />
<Javi />
