let stars = [];
let shootingStars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }

  shootingStars.push(new ShootingStar());
}

function draw() {
  background(0, 0, 0);

  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }

  for (let i = 0; i < shootingStars.length; i++) {
    shootingStars[i].draw();
    if (shootingStars[i].y > height) {
      shootingStars.push(new ShootingStar());

      shootingStars.splice(i, 1);
    }
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(0.2, 3);
    this.t = random(TAU);
    this.FlashSpeed = random(0.01, 0.1);
  }

  draw() {
    this.t += this.FlashSpeed;
    let scale = this.size + sin(this.t) * 2;
    noStroke();
    ellipse(this.x, this.y, scale, scale);
  }
}

class ShootingStar {
  constructor() {
    this.x = round(random(0, windowWidth));
    this.y = -10;
    this.xv = round(random([-3, -2, 2, 3]));
    this.yv = random(0.5, 1.5);
    this.tail = [];
    this.tailLength = 60;
    this.startColor = color("#fce1b4");
    this.endColor = color([255, 255, 255, 0]);
  }

  draw() {
    noStroke();
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
      const colorValue = map(i, this.tail.length, 0, 0, 1);
      const colorScale = lerpColor(this.startColor, this.endColor, colorValue);
      stroke(colorScale);
      strokeWeight(map(i, this.tail.length, 0, 3, 0));
      line(
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
