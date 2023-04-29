var stars = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
	
	for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}
}

function draw() {
  background(0, 0, 0);
	
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
}

class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.2, 3);
		this.t = random(TAU);
	}
	
	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}
