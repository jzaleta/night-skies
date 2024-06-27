<script>
  import { onMount } from "svelte";

  class ShootingStar {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.size = 1.5;
      this.speed = 2;
      this.color = this.generateColor();
      this.reset();
    }

    generateColor() {
      const r = Math.floor(Math.random() * 55 + 200);
      const g = Math.floor(Math.random() * 55 + 200);
      const b = Math.floor(Math.random() * 55 + 200);
      return `rgb(${r}, ${g}, ${b})`;
    }

    reset() {
      this.x = Math.random() * this.canvasWidth;
      this.y = -this.size;
      this.angle = Math.PI / 4 + (Math.random() * Math.PI) / 2;
      this.tailLength = 100;
    }

    update() {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
    }

    isOutOfBounds() {
      return this.y > this.canvasHeight + this.tailLength;
    }

    draw(ctx) {
      this.update();

      ctx.save();
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();

      const gradient = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x - this.tailLength * Math.cos(this.angle),
        this.y - this.tailLength * Math.sin(this.angle)
      );
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - this.tailLength * Math.cos(this.angle),
        this.y - this.tailLength * Math.sin(this.angle)
      );
      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.size * 2;
      ctx.stroke();

      ctx.restore();
    }
  }

  let canvas;
  let ctx;

  let shootingStar = null;

  let timeoutId = null;

  function createNewShootingStar() {
    shootingStar = new ShootingStar(canvas.width, canvas.height);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shootingStar) {
      shootingStar.draw(ctx);

      if (shootingStar.isOutOfBounds()) {
        shootingStar = null;

        timeoutId = setTimeout(
          createNewShootingStar,
          Math.random() * 2000 + 1000
        );
      }
    } else if (!timeoutId) {
      createNewShootingStar();
    }

    requestAnimationFrame(draw);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (shootingStar) {
      shootingStar.canvasWidth = canvas.width;
      shootingStar.canvasHeight = canvas.height;
    }
  }

  onMount(() => {
    canvas = document.getElementById("starfield");
    ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (timeoutId) clearTimeout(timeoutId);
    };
  });
</script>

<canvas id="starfield"></canvas>

<style>
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    background: black;
  }
</style>
