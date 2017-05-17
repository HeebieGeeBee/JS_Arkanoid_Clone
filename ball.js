class Ball {
	constructor(_x, _y, _width, _color) {
		// ball variables
		this.x = _x;
		this.y = _y;
		this.width = _width;
		this.color = _color || "white";
		this.speedY = -3;
		this.speedX = -3;
		this.move = false;
		// show function to render ball to canvas
		this.show = ()=> {
			fill(this.color);
			ellipse(this.x, this.y, this.width);
		}
		// go function to start ball moving
		this.go = ()=> {
			this.x += this.speedX;
			this.y += this.speedY;
		}
		// edge detection function to detect ball hitting passing in paddle variables
		this.edges = (_paddle)=> {
			const padQuarter = _paddle.width/4;
			// left wall bounds detection
			if(this.x < 5) {this.speedX = Math.abs(this.speedX);}
			// right wall bounds detection 
			if(this.x > 495) {this.speedX = -Math.abs(this.speedX);}
			// ceiling bounds detection 
			if(this.y < 5){ this.speedY = Math.abs(this.speedY);}
			// paddle hit detection 
			if(this.x > _paddle.x && this.x < _paddle.x + _paddle.width && this.y >= _paddle.y - this.width/2) {
				this.speedY = -Math.abs(this.speedY);
				if(this.x > _paddle.x + (padQuarter*2) && this.x < _paddle.x + (padQuarter*3)) {this.speedX = 3}
				if(this.x > _paddle.x + (padQuarter*3) && this.x < _paddle.x + _paddle.width) {this.speedX = 4}
				if(this.x < _paddle.x + (padQuarter*2) && this.x > _paddle.x + padQuarter) {this.speedX = -3;}
				if(this.x > _paddle.x && this.x < _paddle.x + padQuarter) {this.speedX = -4;}
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

		}
		} 