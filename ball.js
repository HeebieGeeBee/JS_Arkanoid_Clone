class Ball {
	constructor(_x, _y, _width, _color, _bounceSound) {
		// ball variables
		this.x = _x;
		this.y = _y;
		this.width = _width;
		this.color = _color || "white";
		this.speed = 4;
		this.speedY;
		this.speedX;
		this.move = false;
		this.sound = _bounceSound;
		this.sound.setVolume(0.0);
		this.radius = this.width/2;
		// go function to start ball moving
		this.go = ()=> {
			this.x += this.speedX;
			this.y += this.speedY;
		}
		// edge detection function to detect ball hitting passing in paddle variables
		this.edges = (_paddle)=> {
			const sixth = _paddle.width/6;
			// left wall bounds detection
			if(this.x - this.radius < 1) {this.speedX = Math.abs(this.speedX); this.sound.play()}
			// right wall bounds detection 
			if(this.x + this.radius > width -1) {this.speedX = -Math.abs(this.speedX); this.sound.play()}
			// ceiling bounds detection 
			if(this.y - this.radius < 1){ this.speedY = Math.abs(this.speedY); this.sound.play()}
			// paddle hit detection 
			if(this.hit(_paddle)) {
				//change angle ball travels depending on what part of the paddle is hit
				let diff = this.x - (_paddle.x + _paddle.width);
				let angle = map(diff, 0, _paddle.width, -radians(45), radians(45));
				this.speedX = this.speed * cos(angle);
				this.speedY = this.speed * sin(angle);
				if (this.move) {this.sound.play();}
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

Ball.prototype.hit = function(_paddle) {

	// define vertical and horizontal distances between the ball and the square
	let distX = Math.abs(this.x - _paddle.x - _paddle.width/2  );
	let distY = Math.abs(this.y - _paddle.y - _paddle.height/2  );
	// if distance is greater return false
	if ( distX > (_paddle.width/2 + this.radius) ) { return false; };
	if ( distY > (_paddle.height/2 + this.radius) ) { return false; };
	// if distance is less return true they've collidied;
	if ( distX < (_paddle.width/2 + this.radius) ) { return true; };
	if ( distY < (_paddle.height/2 + this.radius) ) { return true; };
	// if distance is less than half squares height of width return true
	if ( distX <= _paddle.width/2 ) { return true; };
	if ( distY <= _paddle.height/2 ) { return true; };
	// Pythagoras formula for square corner collision
	let dx = distX - _paddle.width/2;
	let dy = distY - this.height/2;
	return ( dx*dx + dy*dy <= ( this.radius * this.radius ) );

}