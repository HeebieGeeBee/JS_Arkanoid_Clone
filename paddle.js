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
	fill(this.color);
	rect(this.x, this.y, this.width, this.height, 5, 5, 0, 0);
}

Paddle.prototype.showLives = function() {
	let x = 5, y = 5, width = 9, height = 5
	for(let i = 1; i <= this.lives; i++) {
		noStroke();
		fill(this.color);
		rect(5 * i * 2, y, width, height, 2, 2, 0, 0);
	}
}

Paddle.prototype.hit = function(_ball) {

	// define vertical and horizontal distances between the ball and the square
	let distX = Math.abs(_ball.x - this.x - this.width/2  );
	let distY = Math.abs(_ball.y - this.y - this.height/2  );
	// if distance is greater return false
	if ( distX > (this.width/2 + _ball.radius) ) { return false; };
	if ( distY > (this.height/2 + _ball.radius) ) { return false; };
	// if distance is less return true they've collidied;
	if ( distX < (this.width/2 + _ball.radius) ) { return true; };
	if ( distY < (this.height/2 + _ball.radius) ) { return true; };
	// if distance is less than half squares height of width return true
	if ( distX <= this.width/2 ) { return true; };
	if ( distY <= this.height/2 ) { return true; };
	// Pythagoras formula for square corner collision
	let dx = distX - this.width/2;
	let dy = distY - this.height/2;
	return ( dx*dx + dy*dy <= ( _ball.radius * _ball.radius ) );

}