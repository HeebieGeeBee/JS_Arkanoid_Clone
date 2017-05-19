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
let paddle;
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
let height = 700;
// hit sound
let hitSound;
let bounceSound;
let lifeSound;
let touchstart = false;
let rightDown = false;
let leftDown = false;
let left;
let right;
/****************************/
/*  P5.js Preload Function  */
/*__________________________*/

function preload() {
	hitSound = loadSound('sounds/NFF-tiny-select-02.wav');
	bounceSound = loadSound('sounds/NFF-switch-on.wav');
	lifeSound = loadSound('sounds/NFF-lose.wav');

}

/**************************/
/*  P5.js Setup Function  */
/*________________________*/


function setup() {

	// Create canvas
	createCanvas(width, height);
	controls(paddle, ...balls);
	//let controls = createCanvas(width, height/5);
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
	// Call Player lives show function
	paddle.showLives();
	// Call balls show function and their edges;
	balls.forEach((ball)=>{ball.show(); ball.edges(paddle);});
	// draw hit tiles
	tilesArr.forEach((tile)=>tile.show());
	// Call keyDown listeners

	keyDownListeners(...balls, paddle);
	// Call tile hit check functions
	tileHitCheck(...balls, tilesArr, hitSound);
	
	if(paused) {
		textSize(40);
		textAlign(CENTER);
		textFont("Arial");
		fill('silver');
		textStyle(BOLD);
		text("PAUSED", width/2, height/2);
	}

	if(paddle.lives < 0 || tilesArr.length === 0) {
		setTimeout(function() {
			textSize(40);
			textAlign(CENTER);
			textFont("Arial");
			fill('silver');
			textStyle(BOLD);
			text("GAMEOVER", width/2, height/2);
			text("Press S to Restart", width/2, height/2 + 40);
			noLoop();
		},100)
		
	}
	drawControls();
	controls(...balls, paddle);

}

/****************************/
/*  Draw Controls Function  */
/*__________________________*/

function drawControls() {
	noFill();
	stroke('silver');
	strokeWeight(5);
	ellipse(width/4 - 20, height-100, 160);
	strokeWeight(2);
	textAlign(CENTER);
	textSize(45);
	text("LEFT", width/4 - 20, height-85);
	strokeWeight(5);
	ellipse(width/4 * 3 + 20, height-100, 160);
	strokeWeight(2);
	textAlign(CENTER);
	textSize(45);
	text("RIGHT", width/4 * 3 + 20, height-85);
	strokeWeight(2);
	ellipse(width/2, height-100, 80);
	strokeWeight(2);
	textAlign(CENTER);
	textSize(20);
	text("START", width/2, height-92);
}


/***********************************************/
/*  Onscreen Mouse and Touch Control Function  */
/*_____________________________________________*/


function controls(_ball, _paddle) {
	// if mouse pressed or touch started and within range of left control	
	if((mouseIsPressed || touchstart) && mouseX < width/4 + 60 && _paddle.x > 5 && mouseY > 500) {
		//move paddle left
		_paddle.x -= _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+10;
		
		}
	}
	// if mouse pressed or touch started and with range of right control
	if((mouseIsPressed || touchstart) && mouseX > width/4 * 3 - 60 && _paddle.x < 495 - _paddle.width && mouseY > 500) {
		//move paddle right
		_paddle.x += _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+10;
		}
	}
	// if mouse pressed or touch started with in range of start button
	if((mouseIsPressed || touchstart) && mouseX < width/2 + 40 && mouseX > width/2 - 40 && mouseY > height - 140 && mouseY < height - 60) {
		//set ball move to true 
		_ball.move = true;
	}

}

/*******************************/
/*  Touch Detection Functions  */
/*_____________________________*/

function touchStarted() {
	//if touch started set touchstart variable to true
	touchstart = true;
	return false;
}

function touchEnded() {
	//if touch ended set touchstart variable to false 
	touchstart = false;
	//return false;
}


/*************************/
/*  Game Start Function  */
/*_______________________*/

function start(_level) {
	tilesArr.splice(0);
	balls.splice(0);
	paused = false;
	paddle = new Paddle(width/2, height - 240 , 50, 10);
	balls.push(new Ball(paddle.x+10, paddle.y-(paddle.height/2 -1), 10, "grey", bounceSound));
	tiles(_level);
	loop();
}

/*****************************/
/*  Tile Generator Function  */
/*___________________________*/

function tiles(level) {
	let x = 5; let y = 50; let tileWidth = (width-10)/level[0].length; let tileHeight = (height-200)/30;
	level.forEach(row=> {
		row.forEach(tile=> {
			if(tile >= 0) {
				tilesArr.push(new HitTile(x,y,tileWidth,tileHeight,tileColors[tile], tile));
			}
			x += tileWidth;
		})
		x = 5;
		y += tileHeight;
	})
}

/*****************************/
/*  Tile Hit Check Function  */
/*___________________________*/

function tileHitCheck(_ball, _tileArray, _hitSound) {
	// loop through every tile
	_tileArray.forEach((tile, index)=>{
		// check if tile hit function returns true
		if(tile.hit(_ball)) {
			_hitSound.play();
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
	if(_ball.y > 500) {
		if(balls.length > 1) {
			balls.splice(balls.indexOf(_ball), 1);
		}
		_ball.reset(_paddle);
		// decrease player lives
		_paddle.lives--;
		lifeSound.play();
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
		// Press S to start
		if(keyCode === 83) {
			start(level1);
		}
}

