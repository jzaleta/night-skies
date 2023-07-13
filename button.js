const audio = new Audio("music/gymnopedie.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});
