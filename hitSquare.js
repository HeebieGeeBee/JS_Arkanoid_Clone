class HitSquare {
	constructor(_x, _y, _width, _height, _color) {
		//hit square variables
		this.x = _x;
		this.y = _y;
		this.width = _width;
		this.height = _height;
		this.color = _color;
		this.strength = 1;
		// show function to render hit sqaures
		this.show = ()=> {
			fill(this.color);
			rect(this.x, this.y, this.width, this.height);
		}

		this.hit = (_ball)=> {

			if (_ball.x > this.x && _ball.x < this.x + this.width && _ball.y > this.y && _ball.y < this.y + this.height) {
				console.log('hit');
				return true;
			} 
			return false;
		}
	}

}