<script>
  // This is where the fun begins!
  // Added a bunch of comments and JSDoc stuff because my skills are pretty rough
  import { onMount } from "svelte";

  const star = { size: 1.5, speed: 2, tail: 100 };
  const timeout = { min: 1000, max: 3000 };

  /** @type {HTMLCanvasElement} */
  let canvas;

  class ShootingStar {
    /**
     * Create a new ShootingStar instance
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
      this.canvas = canvas;
      this.color = `hsl(45, 95%, 85%)`; // Cozy and warm, yellowish color
      this.x = Math.random() * this.canvas.width;
      this.y = -star.size; // Start above the canvas
      this.angle = Math.PI * (0.25 + Math.random() * 0.5); // Random angle between 45° and 135°
    }

    /**
     * Draw the shooting star on the canvas
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
      this.updatePosition();
      this.drawStar(ctx);
      this.drawTail(ctx);
    }

    // Update the position of the shooting star
    updatePosition() {
      this.x += star.speed * Math.cos(this.angle);
      this.y += star.speed * Math.sin(this.angle);
    }

    /**
     * Draw the starry part of the shooting star
     * @param {CanvasRenderingContext2D} ctx
     */
    drawStar(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, star.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    /**
     * Draw the tail of the shooting star
     * @param {CanvasRenderingContext2D} ctx
     */
    drawTail(ctx) {
      const tailEndX = this.x - star.tail * Math.cos(this.angle);
      const tailEndY = this.y - star.tail * Math.sin(this.angle);

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailEndX, tailEndY);

      // Create a gradient for the tail
      const gradient = ctx.createLinearGradient(
        this.x,
        this.y,
        tailEndX,
        tailEndY
      );
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, "transparent");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = star.size * 2;
      ctx.stroke();
    }

    /**
     * Check if the star has moved beyond the bottom of the canvas
     * @returns {boolean}
     */
    isOutOfBounds() {
      return this.y > this.canvas.height + star.tail;
    }
  }

  onMount(() => {
    /** @type {CanvasRenderingContext2D | null} */
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /** @type {ShootingStar[]} */
    const shootingStars = [];

    // Create a new shooting star and schedule the next one
    const createShootingStar = () => {
      if (shootingStars.length === 0) {
        shootingStars.push(new ShootingStar(canvas));

        setTimeout(
          createShootingStar,
          Math.floor(Math.random() * (timeout.max - timeout.min)) + timeout.min
        );
      }
    };

    // Update and draw the active shooting star
    const updateShootingStars = () => {
      shootingStars.forEach((star, index) => {
        star.draw(ctx);
        if (star.isOutOfBounds()) {
          shootingStars.splice(index, 1); // Remove the star if it's out of bounds
        }
      });
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      createShootingStar();
      updateShootingStars();
      requestAnimationFrame(animate); // Schedule next frame
    };

    animate(); // Start the animation loop
  });
</script>

<canvas
  bind:this={canvas}
  id="starfield"
  style="display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;background:black;"
/>
