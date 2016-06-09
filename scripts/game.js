// GAME
// create paddle A and B,
// create ball,
// create playing area,
// move paddles according to user input,
// drop ball,
// bounce Ball if it hits racket,
// ball bounces off edges within the playing area,
// if ball hits a paddle than switch player,
// if ball misses paddle than other player scores,
// update display,
// first player who wins 5 times wins game,
// reset score and play new game


// BOUNCE/COLLIDE
// If ball hits paddles,
// invert the y-speed vector ball,
// increment the points, play the collision sound,
// save collision's position,
// set variable,
// change the score multiplier

// gravity
// set x position
// set y position
// set starting gravity speed
// set increase of speed for each frame
// calculate trajectory
// loop until it hits the paddle
//
// function gravity(width, height, color, x, y, type) {
//     this.type = type;
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.gravity = 0.05;
//     this.gravitySpeed = 0;
//     this.update = function() {

//     }
// new position of ball
//     this.newPos = function() {
//         this.gravitySpeed += this.gravity;
//         this.x += this.speedX;
//         this.y += this.speedY + this.gravitySpeed;
//     }
// }


$(document).ready(function(){
  // Gameloop
  var gameloop = null;

  // Players 1 & 2
  var $paddleA     = $("#paddleA");
  var $paddleB     = $("#paddleB");
  var paddleSpeed  = 5;
  var paddleHeight = 15;
  var paddleWidth  = 100;

  // Ball
  var $ball          = $("#ball");
  var verticalMove   = 4;
  var horizontalMove = 4;
  var ballHeight     = 200;
  var ballWidth      = 104;
  var lastContact    = '';

  //Controls
  var keyBindings = { p1Left: 90, p1Right: 88, p2Left: 37, p2Right: 39};
  var p1Movement  = { left: false, right: false };
  var p2Movement  = { left: false, right: false };

  // Default Settings
  var gameHeight   = 600;
  var gameWidth    = 1000;
  var xMin         = 0;
  var xMax         = 1000;
  var yMin         = 0;
  var yMax         = 600;

  // Score needed to win game
  var winScore = 5;

  // Each players starting score
  var score1 = 0
  var score2 = 0



  var bindKeypress = function() {
    // Store in for keyboard knowledge
    // set movement to true on keydown
    $(document).on('keydown', function(e) {
      switch (e.keyCode) {
        case keyBindings.p1Left:
          p1Movement.left = true;
          break;
        case keyBindings.p1Right:
          p1Movement.right = true;
          break;
        case keyBindings.p2Left:
          p2Movement.left = true;
          break;
        case keyBindings.p2Right:
          p2Movement.right = true;
          break;
      }
    });

    // set movement to false on keyup
    $(document).on('keyup', function(e) {
      switch (e.keyCode) {
        case keyBindings.p1Left:
          p1Movement.left = false;
          break;
        case keyBindings.p1Right:
          p1Movement.right = false;
          break;
        case keyBindings.p2Left:
          p2Movement.left = false;
          break;
        case keyBindings.p2Right:
          p2Movement.right = false;
          break;
      }
    });
  };


  // Control movement of paddles based on keyboard events
  var movePaddles = function () {
    // Check keyboard events
    var p1Position = $paddleA.position();
    var p1Left     = p1Position.left;
    var p1Right    = p1Position.left + paddleWidth;

    var p2Position = $paddleB.position();
    var p2Left     = p2Position.left;
    var p2Right    = p2Position.left + paddleWidth;

    // Move the paddle A left
    if (p1Movement.left && p1Left > xMin && p1Left - paddleSpeed >= xMin) {
      $paddleA.css("left", p1Position.left - paddleSpeed);
    } else if (p1Left - paddleSpeed < xMin) {
      $paddleA.css("left", xMin);
    }

    // Move the paddle A right
    if (p1Movement.right && p1Right < xMax && p1Right + paddleSpeed <= xMax) {
      $paddleA.css("left", p1Position.left + paddleSpeed);
    } else if (p1Right - paddleSpeed > xMax) {
      $paddleA.css("left", xMax - paddleWidth);
    }

    // Move the paddle B left
    if (p2Movement.left && p2Left > xMin && p2Left - paddleSpeed >= xMin) {
      $paddleB.css("left", p2Position.left - paddleSpeed);
    } else if (p2Left - paddleSpeed < xMin) {
      $paddleB.css("left", xMin);
    }

    // Move the paddle B right
    if (p2Movement.right && p2Right < xMax && p2Right + paddleSpeed <= xMax) {
      $paddleB.css("left", p2Position.left + paddleSpeed);
    } else if (p2Right - paddleSpeed > xMax) {
      $paddleB.css("left", xMax - paddleWidth);
    }
  };

   // Meow sound effect
  var meow = new buzz.sound("./sound/animal_cat_meow.mp3", { preload: true, loop: false });
  var boing = new buzz.sound("./sound/beep9.mp3", { preload: true, loop: false });


  // ball positioning
  var moveBall = function (){
    // ball boundery collision
    var position = $ball.position();
    var ballTop  = position.top;
    var ballBot  = position.top + ballHeight;
    var ballLeft = position.left;
    var ballRight= position.left + ballWidth;


    // boundary collision
    if (ballTop <= yMin && lastContact != "topBoundary") {
      verticalMove = -verticalMove;
      lastContact = "topBoundary";
      boing.play();
    }

    if (ballBot >= yMax && lastContact != "botBoundary") {
       verticalMove = -verticalMove;
      lastContact = "botBoundary";
      // clearInterval(gameloop);
      // check winner and add score
      // reset the horizontal and vertical move to default
      // reset lastContact to default
      // reset the cat position
      // start gameloop
    }

    if (ballLeft <= xMin && lastContact != "leftBoundary") {
      horizontalMove = -horizontalMove;
      lastContact = "leftBoundary";
      boing.play();
    }

    if (ballRight >= xMax && lastContact != "rightBoundary") {
      horizontalMove = -horizontalMove;
      lastContact = "rightBoundary";
      boing.play();
    }


    // paddleA collision
    var paddleAPosition = $paddleA.position();
    var paddleATop      = paddleAPosition.top;
    var paddleABot      = paddleAPosition.top + paddleHeight;
    var paddleALeft     = paddleAPosition.left;
    var paddleARight    = paddleAPosition.left + paddleWidth;

    if (ballLeft <= paddleARight && ballRight >= paddleALeft && ballTop <= paddleABot && ballBot >= paddleATop && lastContact !== 'paddleA') {
      verticalMove = -verticalMove;
      lastContact = 'paddleA';
      meow.play();
    }


    // paddleB collision
    var paddleBPosition = $paddleB.position();
    var paddleBTop      = paddleBPosition.top;
    var paddleBBot      = paddleBPosition.top + paddleHeight;
    var paddleBLeft     = paddleBPosition.left;
    var paddleBRight    = paddleBPosition.left + paddleWidth;

    if (ballLeft <= paddleBRight && ballRight >= paddleBLeft && ballTop <= paddleBBot && ballBot >= paddleBTop && lastContact !== 'paddleB') {
      verticalMove = -verticalMove;
      lastContact = 'paddleB';
      meow.play();
    }

    $ball.css({
       top:  ballTop + verticalMove,
       left: ballLeft + horizontalMove
    });
  };


  var startGame = function () {
    // Main loop of the game
    // Set main loop frame rate (60 fps the best). Fps stands for 'frames per second'
    gameloop = setInterval(function(){
      moveBall();
      movePaddles();
    }, 1000 / 60);

    bindKeypress();
  };

  startGame();
});