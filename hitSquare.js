class HitTile {
	constructor(_x, _y, _width, _height, _color, _id) {
		//hit square variables
		this.id = _id;
		this.x = _x;
		this.y = _y;
		this.width = _width;
		this.height = _height;
		this.color = _color;
		this.health = this.id === 1 ? 2 : this.id === 0 ? 0 : 1;
	}
}

// show function to draw square instances
HitTile.prototype.show = function() {
	strokeWeight(1);
	stroke("black");
	fill(this.color);
	rect(this.x, this.y, this.width, this.height, 2, 2, 2, 2);
}

HitTile.prototype.hit = function(_ball) {

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

HitTile.prototype.hitFrom = function(_ball) {

	// detect what direction the ball was hit from 
	if(_ball.x < this.x && _ball.y > this.y && _ball.y < this.y + this.height) {
		_ball.speedX = -Math.abs(_ball.speedX);
		return "LEFT";
	}
	if(_ball.x > this.x + this.width && _ball.y > this.y && _ball.y < this.y + this.height) {
		_ball.speedX = Math.abs(_ball.speedX);
		return "RIGHT";
	}
	if(_ball.y < this.y) {
		_ball.speedY = -Math.abs(_ball.speedY); 
		return "TOP";
	}
	if(_ball.y > this.y + this.height) {
		_ball.speedY = Math.abs(_ball.speedY);
		return "BOTTOM";
	}


}