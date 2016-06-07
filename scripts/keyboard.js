var gameProperties = {
  screenWidth: 800,
  screenHeight: 600,
};


$(document).ready(function() {

// set key movement left and right
var $slider = $('#slider');
​
var movement = {
  left: false,
  right: false
};
​
$('document').on('keydown', function(e){
  switch (e.key) {
    case 's':
      movement.up = true;
      break;
  }
});
​
$('target').on('keyup', function(e){
  switch (e.key) {
    case 's':
      movement.up = false;
      break;
  }
});
​
var moveSlider = function () {
  var position = $slider.position();
​
  if (movement.left) {
    $slider.css({top: position.left - 1});
  }
  if (movement.right) {
    $slider.css({top: position.left + 1});
  }
};
​
  var startGame = function() {
    gameloop = setInterval(function(){
  moveObjects();
  moveSlider();
  }, 17);
  };
  startGame();

});