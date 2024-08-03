<script>
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/components/scene.svelte";

  import Confetti from "$lib/components/confetti.svelte";
  import Corner from "$lib/components/corner.svelte";
  import Footer from "$lib/components/footer.svelte";
  import Javi from "$lib/components/javi.svelte";
  import Music from "$lib/components/music.svelte";
</script>

<main style:width="100vw" style:height="100vh">
  <Canvas>
    <Scene />
  </Canvas>
</main>

<Confetti />
<Corner />
<Footer />
<Javi />
<Music />
