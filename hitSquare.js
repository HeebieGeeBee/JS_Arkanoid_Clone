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
	fill(this.color);
	rect(this.x, this.y, this.width, this.height, 5, 5, 5, 5);
}

HitSquare.prototype.hit = function(_ball) {
	return (_ball.x > this.x && _ball.x < this.x + this.width && _ball.y > this.y && _ball.y < this.y + this.height)
}