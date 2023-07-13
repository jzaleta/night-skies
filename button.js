export const music = () => {
    const audio = new Audio("gymnopedie.mp3");
    const buttons = document.querySelectorAll("button");
  
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        audio.play();
      });
    });
  };
