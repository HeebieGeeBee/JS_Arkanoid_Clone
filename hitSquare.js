class HitSquare {
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
HitSquare.prototype.show = function() {
	noStroke();
	fill(this.color);
	rect(this.x, this.y, this.width, this.height, 1, 1, 1, 1);
}

HitSquare.prototype.hit = function(_ball) {
	return (_ball.x > this.x && _ball.x < this.x + this.width && _ball.y > this.y && _ball.y < this.y + this.height)
}

HitSquare.prototype.hitFrom = function(_ball) {
	if(_ball.x < this.x + _ball.width/2 &&  _ball.y > this.y && _ball.y < this.y + this.height) {
		_ball.speedX = -Math.abs(_ball.speedX);
		return "LEFT";
	}
	if(_ball.x > this.x + this.width - _ball.width/2  && _ball.y > this.y && _ball.y < this.y + this.height) {
		_ball.speedX = Math.abs(_ball.speedX);
		return "RIGHT";
	}
	if(_ball.y < this.y + _ball.width/2 && _ball.x > this.x + _ball.width/2 && _ball.x < this.x + this.width - _ball.width/2) {
		_ball.speedY = -Math.abs(_ball.speedY); 
		return "TOP";
	}
	if(_ball.y > this.y + this.height - _ball.width/2 && _ball.x > this.x + _ball.width/2 && _ball.x < this.x + this.width - _ball.width/2) {
		_ball.speedY = Math.abs(_ball.speedY);
		return "BOTTOM";
	}

}