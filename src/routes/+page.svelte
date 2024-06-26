<script>
  import { Canvas } from "@threlte/core";
  import Scene from "$lib/components/scene.svelte";

  import About from "$lib/components/about.svelte";
  import Confetti from "$lib/components/confetti.svelte";
  import Javi from "$lib/components/javi.svelte";
  import Meta from "$lib/components/meta.svelte";
  import Music from "$lib/components/music.svelte";
</script>

<main style:height="100vh" style:width="100vw">
  <Canvas>
    <Scene />
  </Canvas>
</main>

<About />
<Confetti />
<Javi />
<Meta />
<Music />
