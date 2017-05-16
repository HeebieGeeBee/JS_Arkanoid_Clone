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
		this.edges = (_paddleX, _paddleY, _paddleWidth)=> {
			// left wall bounds detection
			if(this.x < 5) {this.speedX = 3;}
			// right wall bounds detection 
			if(this.x > 495) {this.speedX = -3;}
			// ceiling bounds detection 
			if(this.y < 5){ this.speedY = 3;}
			// paddle hit detection 
			if(this.x > _paddleX && this.x < _paddleX + _paddleWidth && this.y >= _paddleY - this.width/2) {
				this.speedY = -3;
				if(this.x > _paddleX + _paddleWidth/2) {this.speedX = 3;}
				if(this.x < _paddleX + _paddleWidth/2) {this.speedX = -3;}
			}
		}
		// reset function to place ball back on paddle not moving;
		this.reset = (_paddleX, _paddleY, _paddleHeight)=> {
			this.move = false;
			this.x = _paddleX+10;
			this.y = _paddleY-(_paddleHeight/2 -1);
			this.speedY = -3;
			this.speedX = -3;
		}
	}
}