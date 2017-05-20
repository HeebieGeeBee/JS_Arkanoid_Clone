class Paddle {
	constructor(_x, _y, _width, _height, _color) {
		// Paddle variables
		this.y = _y;
		this.color = _color;
		this.width = _width;
		this.height = _height;
		this.x = _x - this.width/2;
		this.lives = 3;
		this.speed = height/120;
	}
}
// render paddle function
Paddle.prototype.show = function() {
	noStroke();
	fill(this.color);
	rect(this.x, this.y, this.width, this.height, 5, 5, 0, 0);
}
// render lives
Paddle.prototype.showLives = function() {
	let y = this.y + width/10, w = this.width/2, x = this.width/3, h = this.height/2;
	for(let i = 1; i <= this.lives; i++) {
		noStroke();
		fill(this.color);
		rect( (w * i) * 1.2, y, w, h, 2, 2, 0, 0);		 
	}
}
// paddle hit function
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