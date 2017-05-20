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
let tileColors = ["gold", "silver", "red", "green", "blue", "purple"];
// width and height varables
let width = window.innerHeight/1.77;
let height = window.innerHeight;
// sound variables
let hitSound;
let bounceSound;
let lifeSound;
// running and touching booleans
let touchstart = false;
let running = false;


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
	//screen.orientation.lock('portrait-primary');
	// Create canvas
	createCanvas(width, height);
	start(level1);
}

/*************************/
/*  Game Start Function  */
/*_______________________*/

function start(_level) {
	tilesArr.splice(0);
	balls.splice(0);
	paused = false;
	running = true;
	paddle = new Paddle(width/2, height/100 * 60 , width/10, width/60, "red");
	balls.push(new Ball(paddle.x+paddle.width/4, paddle.y-(paddle.height/2 -1), width/40, "grey", bounceSound));
	tiles(_level);
	loop();
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
	// Draw hit tiles
	tilesArr.forEach((tile)=>tile.show());
	// Draw controls
	drawControls();
	// Call keyDown listeners
	keyDownListeners(...balls, paddle);
	// Call tile hit check functions
	tileHitCheck(...balls, tilesArr, hitSound);
		// detect if ball move started
	if(balls[0].move) {
		// if yes call ball go function
		balls[0].go();
	}
	// Paused
	if(paused) {
		textSize(width/15);
		textAlign(CENTER);
		textFont("Arial");
		fill('silver');
		text("PAUSED", width/2, height/2);

	}
	// Game over 
	if(paddle.lives < 0 || tilesArr.length === 0) {
		setTimeout(function() {
			textSize(width/15);
			fill('silver');
			text("GAMEOVER", width/2, height/2);
			running = false;
			noLoop();
		},100)
		
	}	
}


/****************************/
/*  Draw Controls Function  */
/*__________________________*/

function drawControls() {
	noFill();
	stroke('silver');
	// pause and fullscreen boxes
	strokeWeight(width/300);
	rect(width - width/4, 0, width/4, width/14, 0, 0, 0, width/100); //fullscreen
	rect(0, 0, width/4, width/14, 0, 0, width/100, 0); //pause
	// left, right and go circles
	strokeWeight(width/100);
	ellipse(width/2, height-(height/9), width/8); //go
	//controls text
	textAlign(CENTER);
	textSize(width/5);
	fill('silver');
	noStroke();
	text("\u25c4", width/5, height-(height/8));  //left
	text("\u25ba", width/5 * 4, height-(height/8));  //right
	textSize(width/20);
	text("GO", width/2, height-(width/5.5)); //start
	textSize(width/30);
	text('FULLSCREEN', width - width/8, width/22);  //fullscreen
	text('PAUSE', width/8, width/22);  //pause
}

/*******************************/
/*  Touch Detection Functions  */
/*_____________________________*/

function touchStarted() {
	touchstart = true;
	//if go button is touched
	if(mouseX < width/2 + width/16 && mouseX > width/2 - width/16 && mouseY > height - 140 && mouseY < height - 60) {
		if(!running) {
			start(level1);			
			running =  true;
			
		}
		else if(running) {
			balls[0].move = true;
		}
		return false //prevent browser default
	}	
	// if fall screen button is touched
	if(mouseX > width - width/4 && mouseY < width/14) {
		var fs = fullscreen();
    	fullscreen(!fs);
    	return false //prevent browser default
	}
	//if pause button touched
	if(mouseX < width/4 && mouseY < width/14) {
		if(paused) {
				loop();	
				paused = false;
			} else {
				noLoop();
				paused = true;
			} 
		return false // prevent browser default
	}
}

function touchEnded() {
	touchstart = false;
}

/*******************************/
/*  KeyDown Listener Function  */
/*_____________________________*/

function keyDownListeners(_ball, _paddle) {
	// event listener for left arrow
	if(keyIsDown(LEFT_ARROW) && _paddle.x > width/100) {
		//move paddle left
		_paddle.x -= _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+_paddle.width/4;
		}
	}
	// event listener for right arrow
	if(keyIsDown(RIGHT_ARROW) && _paddle.x < width - _paddle.width - width/100) {
		//move paddle right
		_paddle.x += _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+_paddle.width/4;
		}
	}
	// if ball goes below bounds reset the ball on paddle
	if(_ball.y > (height/100 * 64) ){
		if(balls.length > 1) {
			balls.splice(balls.indexOf(_ball), 1);
		}
		_ball.reset(_paddle);
		// decrease player lives
		_paddle.lives--;
		lifeSound.play();
	}
	//left paddle touched 
	if((mouseIsPressed || touchstart) && mouseX < (width/4) + (width/6) && _paddle.x > width/100 && mouseY > height-(height/7) - (width/6) ) {
		//move paddle left
		_paddle.x -= _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+10;	
		}
	}
	//right paddle touched
	if((mouseIsPressed || touchstart) && mouseX > (width/4 * 3) - (width/6) && _paddle.x < width - _paddle.width - width/100 && mouseY > height-(height/7) - (width/6) ) {
		//move paddle right
		_paddle.x += _paddle.speed;
		//if ball not moving and still on paddle move ball too
		if(!_ball.move) {
			_ball.x = _paddle.x+10;
		}
	}
}

/*******************************/
/*  P5.js KeyPressed Function  */
/*_____________________________*/

function keyPressed() {
		
		// Press enter of space to start ball moving
		if ((keyCode === ENTER || keyCode === 32) && !balls[0].move) {
			if(!running) {
				start(level1);			
				running =  true;	
			}
			else if(running) {
				balls[0].move = true;
			}
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

/*****************************/
/*  Tile Generator Function  */
/*___________________________*/

function tiles(level) {
	let x = 0; let y = height/20; let tileWidth = width/level[0].length; let tileHeight = height/40;
	level.forEach(row=> {
		row.forEach(tile=> {
			if(tile >= 0) {
				tilesArr.push(new HitTile(x,y,tileWidth,tileHeight,tileColors[tile], tile));
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