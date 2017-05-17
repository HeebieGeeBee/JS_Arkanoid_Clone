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
		// show function to render paddle in canvas
		this.show = ()=> { 
			fill(this.color);
			rect(this.x, this.y, this.width, this.height, 5, 5, 5, 5)
		}

	}
}