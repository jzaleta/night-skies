<script>
  import { onMount } from "svelte";
  import Confetti from "js-confetti";

  const spaceEmojis = [
    "🪐",
    "🔭",
    "👽",
    "🛸",
    "✨",
    "🌎",
    "🌌",
    "🌞",
    "🌝",
    "🚀",
  ];

  /**
   * @type {Confetti | null}
   */
  let confetti;

  function triggerConfetti() {
    confetti?.addConfetti({ emojis: spaceEmojis });
  }

  onMount(() => {
    confetti = new Confetti();

    return () => {
      confetti = null;
    };
  });
</script>

<svelte:body on:click={triggerConfetti} />
