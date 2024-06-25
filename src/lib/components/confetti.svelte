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
  let confetti;

  function triggerConfetti() {
    confetti?.addConfetti({ emojis: spaceEmojis });
  }

  onMount(() => {
    confetti = new Confetti();
    document.addEventListener("click", triggerConfetti);

    return () => {
      document.removeEventListener("click", triggerConfetti);
      confetti = null;
    };
  });
</script>
