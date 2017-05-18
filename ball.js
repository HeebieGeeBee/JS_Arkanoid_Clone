class Ball {
	constructor(_x, _y, _width, _color) {
		// ball variables
		this.x = _x;
		this.y = _y;
		this.width = _width;
		this.color = _color || "white";
		this.angle;
		this.speed = 4;
		this.speedY;
		this.speedX;
		this.move = false;
		this.radius = this.width/2
		// go function to start ball moving
		this.go = ()=> {
			this.x += this.speedX;
			this.y += this.speedY;
		}
		// edge detection function to detect ball hitting passing in paddle variables
		this.edges = (_paddle)=> {
			const sixth = _paddle.width/6;
			// left wall bounds detection
			if(this.x - this.radius < 1) {this.speedX = Math.abs(this.speedX);}
			// right wall bounds detection 
			if(this.x + this.radius > width -1) {this.speedX = -Math.abs(this.speedX);}
			// ceiling bounds detection 
			if(this.y - this.radius < 1){ this.speedY = Math.abs(this.speedY);}
			// paddle hit detection 
			if(this.x + this.radius > _paddle.x && this.x - this.radius < _paddle.x + _paddle.width && this.y + this.radius >= _paddle.y && this.y + this.radius < _paddle.y + _paddle.height) {
				//change angle ball travels depending on what part of the paddle is hit
				let diff = this.x - (_paddle.x + _paddle.width);
				let angle = map(diff, 0, _paddle.width, -radians(45), radians(45));
				this.speedX = this.speed * cos(angle);
				this.speedY = this.speed * sin(angle);
			}
		}
		// reset function to place ball back on paddle not moving;
		this.reset = (_paddle)=> {
			this.move = false;
			this.x = _paddle.x +10;
			this.y = _paddle.y -(_paddle.height/2 -1);
			this.speedY = -3;
			this.speedX = -3;
		}

		this.ballBounds = (_tile)=> {
			console.log( Math.sqrt((this.x - _tile.x) * (this.x - _tile.x) + (this.y - _tile.y) * (this.y - _tile.y)) < this.width/2);
		}

	}
	
} 

// show function to render ball to canvas
Ball.prototype.show = function() {
	fill(this.color);
	ellipse(this.x, this.y, this.width);
}