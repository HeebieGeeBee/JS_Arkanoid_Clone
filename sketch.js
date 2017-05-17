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
const paddle = new Paddle(250, 480, 50, 10);
// new instance of Ball
const ball = new Ball(paddle.x+10, paddle.y-(paddle.height/2 -1), 10, "grey");
// holding array for tiles
const tilesArr = [];
// game is paused 
let paused = false;
// tile colors 
let tileColors = ["gold" ,"silver", "red", "green", "orange", "blue", "purple",];
// width and height varables
let width = 500;
let height = 500;



/**************************/
/*  P5.js Setup Function  */
/*________________________*/


function setup() {

	// Create canvas
	createCanvas(width, height);
	
	tiles(level1);
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
	ball.edges(paddle);
	// Call ball show function
	ball.show();
	// draw hit tiles
	tilesArr.forEach((val)=>val.show());
	
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
	if(ball.y > paddle.y + paddle.height) {
		ball.reset(paddle);
		// decrease player lives
		paddle.lives--;
	}
	
	// call tile hit function
	tileHitCheck(ball, tilesArr);

}

/*****************************/
/*  Tile Generator Function  */
/*___________________________*/

function tiles(level) {
	let x = 0; let y = 30; let tileWidth = width/level[0].length; let tileHeight = height/30;
	level.forEach(row=> {
		row.forEach(tile=> {
			if(tile >= 0) {
				tilesArr.push(new HitSquare(x,y,tileWidth,tileHeight,tileColors[tile], tile));
			}
			x += tileWidth;
		})
		x = 0;
		y += tileHeight;
	})
}

/*****************************/
/*  Tile Hit Check Function  */
/*___________________________*/

function tileHitCheck(_ball, _tileArray) {
	// loop through every tile
	_tileArray.forEach((tile, index)=>{
		// check if tile hit function returns true;
		if(tile.hit(_ball)) {
			// decrease tile health or remove from array
			tile.health > 1 ? tile.health-- : tile.health === 0 ? tile : _tileArray.splice(index, 1);
			//change ball direction
			_ball.speedY = Math.abs(_ball.speedY);
			
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
		// Press P key to pause
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

