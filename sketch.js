// Exporting a function called 'mySketch'
export const mySketch = (p) => {
  let stars = [];
  let shootingStars = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (let i = 0; i < 1200; i++) {
      stars[i] = new Star();
    }

    shootingStars.push(new ShootingStar());
  };

  p.draw = () => {
    p.background(0, 0, 0);

    for (let i = 0; i < stars.length; i++) {
      stars[i].draw();
    }

    for (let i = 0; i < shootingStars.length; i++) {
      shootingStars[i].draw();
      if (shootingStars[i].y > p.height) {
        shootingStars.push(new ShootingStar());
        shootingStars.splice(i, 1);
      }
    }
  };

  class Star {
    constructor() {
      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.size = p.random(0.2, 3);
      this.t = p.random(p.TAU);
      this.FlashSpeed = p.random(0.01, 0.1);
      this.color = p.color(
        p.random(200, 255),
        p.random(200, 255),
        p.random(200, 255)
      );
    }

    draw() {
      this.t += this.FlashSpeed;
      let scale = this.size + p.sin(this.t) * 2;
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.x, this.y, scale, scale);
    }
  }

  class ShootingStar {
    constructor() {
      this.x = p.round(p.random(0, p.windowWidth));
      this.y = -10;
      this.xv = p.round(p.random([-3, -2, 2, 3]));
      this.yv = p.random(0.5, 1.5);
      this.tail = [];
      this.tailLength = 60;
      this.startColor = p.color("#fce1b4");
      this.endColor = p.color([255, 255, 255, 0]);
    }

    draw() {
      p.noStroke();
      this.move();
      this.history();
      this.drawTail();
    }

    history() {
      if (this.tail.length > this.tailLength) {
        this.tail.shift();
      }
      this.tail.push({
        x: this.x,
        y: this.y,
        alpha: 255,
      });
    }

    drawTail() {
      for (let i = this.tail.length - 1; i > 0; i--) {
        const colorValue = p.map(i, this.tail.length, 0, 0, 1);
        const colorScale = p.lerpColor(
          this.startColor,
          this.endColor,
          colorValue
        );
        p.stroke(colorScale);
        p.strokeWeight(p.map(i, this.tail.length, 0, 3, 0));
        p.line(
          this.tail[i].x,
          this.tail[i].y,
          this.tail[i - 1].x,
          this.tail[i - 1].y
        );

        this.tail[i].alpha -= 255 / this.tailLength;
      }
    }

    move() {
      this.x += this.xv;
      this.y += this.yv;
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.window.innerWidth, p.window.innerHeight);
  };
};
