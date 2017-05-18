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
// holding array for tiles
const tilesArr = [];
// holding array for balls;
const balls = [];
// game is paused 
let paused = false;
// tile colors 
let tileColors = ["gold" ,"silver", "red", "green", "blue", "purple",];
// width and height varables
let width = 500;
let height = 500;



/**************************/
/*  P5.js Setup Function  */
/*________________________*/


function setup() {

	// Create canvas
	createCanvas(width, height);
	start(level1);
	
}

/*************************/
/*  P5.js Draw Function  */
/*_______________________*/


function draw() {

	// Draw background
	background(000); 
	// Call paddle show function
	paddle.show();
	// Call balls show function and their edges;
	balls.forEach((ball)=>{ball.show(); ball.edges(paddle);});
	// draw hit tiles
	tilesArr.forEach((tile)=>tile.show());
	// Call keyDown listeners
	keyDownListeners(...balls, paddle);
	// call tile hit function
	tileHitCheck(...balls, tilesArr);

	if(paused) {
		textSize(40);
		textAlign(CENTER);
		textFont("Arial");
		fill('silver');
		textStyle(BOLD);
		text("PAUSED", width/2, height/2);
	}

}

/*************************/
/*  Game Start Function  */
/*_______________________*/

function start(_level) {
	tiles(_level);
	balls.push(new Ball(paddle.x+10, paddle.y-(paddle.height/2 -1), 10, "grey"));
}

/*****************************/
/*  Tile Generator Function  */
/*___________________________*/

function tiles(level) {
	let x = 0; let y = 50; let tileWidth = width/level[0].length; let tileHeight = height/30;
	level.forEach(row=> {
		row.forEach(tile=> {
			if(tile >= 0) {
				tilesArr.push(new HitSquare(x,y,tileWidth -1 ,tileHeight -1,tileColors[tile], tile));
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
			tile.hitFrom(_ball);
		}
	})
}

/*******************************/
/*  KeyDown Listener Function  */
/*_____________________________*/

function keyDownListeners(_ball, _paddle) {

		// event listener for left arrow
	if(keyIsDown(LEFT_ARROW) && _paddle.x > 5) {
		//move paddle left
		_paddle.x -= _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+10;
		}
	}
	// event listener for right arrow
	if(keyIsDown(RIGHT_ARROW) && _paddle.x < 495 - _paddle.width) {
		//move paddle right
		_paddle.x += _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+10;
		}
	}
	// detect if ball move started
	if(_ball.move) {
		// if yes call ball go function
		_ball.go();
	}
	// if ball goes below bounds reset the ball on paddle
	if(_ball.y > height) {
		if(balls.length > 1) {
			balls.splice(balls.indexOf(_ball), 1);
		}
		_ball.reset(_paddle);
		// decrease player lives
		_paddle.lives--;
	}

}


/*******************************/
/*  P5.js KeyPressed Function  */
/*_____________________________*/

function keyPressed() {      
		
		// Press enter of space to start ball moving
		if ((keyCode === ENTER || keyCode === 32) && !balls[0].move) {
			balls[0].move = true;
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

