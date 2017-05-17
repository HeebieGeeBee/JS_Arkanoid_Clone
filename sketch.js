/************************************/
/*  Arkanoid Clone by HeebieGeeBee  */
/*                                  */
/*         16th May 2017            */
/*                                  */
/*__________________________________*/

/**********************/
/*  Global Variables  */
/*____________________*/

// new instance of Paddle
const paddle = new Paddle(250, 480, 40, 10);
// new instance of Ball
const ball = new Ball(paddle.x+10, paddle.y-(paddle.height/2 -1), 10, "grey");

const tilesArr = [];

let paused = false;

function tiles() {
	let x = 0;
	let y = 70;
	let width = 50;
	let height = 25;
	let color = "red";
	for(var i = 0; i < 11; i++) {
		tilesArr.push(new HitSquare(x, y, width, height, color));
		x += width;
	}
}

/**************************/
/*  P5.js Setup Function  */
/*________________________*/


function setup() {

	// Create canvas
	createCanvas(500, 500);
	
	tiles();
}

/*************************/
/*  P5.js Draw Function  */
/*_______________________*/


function draw() {

	// Draw background
	background(000); 
	// Call paddle show function
	paddle.show();
	// Call ball edges function
	ball.edges(paddle.x, paddle.y, paddle.width);
	// Call ball show function
	ball.show();

	for(var i = 0; i < tilesArr.length; i++) {
		tilesArr[i].show();
	}
	// event listener for left arrow
	if(keyIsDown(LEFT_ARROW) && paddle.x > 5) {
		//move paddle left
		paddle.x -= paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!ball.move) {
			ball.x = paddle.x+10;
		}
	}
	// event listener for right arrow
	if(keyIsDown(RIGHT_ARROW) && paddle.x < 495-paddle.width) {
		//move paddle right
		paddle.x += paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!ball.move) {
			ball.x = paddle.x+10;
		}
	}
	// detect if ball move started
	if(ball.move) {
		// if yes call ball go function
		ball.go();
	}
	// if ball goes below bounds reset the ball on paddle
	if(ball.y > 500) {
		ball.reset(paddle.x, paddle.y, paddle.height);
		// decrease player lives
		paddle.lives--;
	}
	
	tilesArr.forEach((val, index)=>{
		if(val.hit(ball)){
			ball.speedY = 3;
			tilesArr.splice(index, 1);
		}
	})

}

/*******************************/
/*  P5.js KeyPressed Function  */
/*_____________________________*/

function keyPressed() {      
		
		// Press enter of space to start ball moving
		if ((keyCode === ENTER || keyCode === 32) && !ball.move) {
			ball.move = true;
		}

		if (keyCode === 80) {
			if(paused) {
				loop();	
				paused = false;
			} else {
				noLoop();
				paused = true;
			} 
		}

}

