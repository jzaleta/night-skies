<script>
  import { onMount } from "svelte";

  let audio;
  let musicPlaying = false;

  const toggleMusic = () => {
    if (audio) {
      if (musicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      musicPlaying = !musicPlaying;
    }
  };

  onMount(() => {
    audio = new Audio("music/Gymnopedie.mp3");
    audio.loop = true;
  });
</script>

<div class="min-h-screen flex flex-col items-center">
  <button
    on:click={toggleMusic}
    class="fixed top-4 left-4 px-2 py-1 text-sm font-medium text-black bg-white border border-white rounded-md cursor-pointer"
  >
    {#if musicPlaying}
      Pause music 🔇
    {:else}
      Play music 🔊
    {/if}
  </button>
</div>
