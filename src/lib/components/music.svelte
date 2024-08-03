<script>
  import { onMount } from "svelte";

  /**
   * @type {HTMLAudioElement | null}
   */
  let audio;

  $: musicPlaying = false;

  const toggleMusic = () => {
    if (audio) {
      musicPlaying ? audio.pause() : audio.play();
      musicPlaying = !musicPlaying;
    }
  };

  onMount(() => {
    audio = new Audio("music/Gymnopedie.mp3");
    audio.loop = true;

    return () => {
      if (audio) {
        audio.pause();
        audio = null;
      }
    };
  });
</script>

<div class="min-h-screen flex flex-col items-center">
  <button
    on:click={toggleMusic}
    class="fixed top-4 left-4 px-2 py-1 text-sm font-medium text-black bg-white border border-white rounded-md cursor-pointer"
  >
    {musicPlaying ? "Pause music 🔇" : "Play music 🔊"}
  </button>
</div>
