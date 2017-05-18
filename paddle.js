class Paddle {
	constructor(_x, _y, _width, _height, _color) {
		// Paddle variables
		this.y = _y;
		this.color = _color || "red";
		this.width = _width || 20;
		this.height = _height || 5;
		this.x = _x - this.width/2;
		this.lives = 3;
		this.speed = 4;
	}

}

// render paddle function
Paddle.prototype.show = function() {
	noStroke();
	fill(this.color);
	rect(this.x, this.y, this.width, this.height, 5, 5, 0, 0)
}

Paddle.prototype.showLives = function() {
	let x = 5, y = 5, width = 9, height = 5
	for(let i = 1; i <= this.lives; i++) {
		noStroke();
		fill(this.color);
		rect(5 * i * 2, y, width, height, 2, 2, 0, 0);
	}
}