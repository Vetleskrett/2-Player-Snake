let snake1, snake2, p1Score, p2Score, w, applePNG, play, cols, rows, winScore, winScoreSlider, p1name, p2name, gameArea, speed, unity, bite, hit, bell, ding, turn, gridArray, sliderStyle1, sliderStyle2, cpu1diffDiv, cpu1diff, cpu1, sliderStyle3, sliderStyle4, cpu2diffDiv, cpu2diff, cpu2, loadingSpinner;
let apple = {
  x: undefined,
  y: undefined
};
let gameLoop = false;
let volume = true;
let p1color = "red";
let p2color = "blue";
let snake1Score = snake2Score = 0;

function draw() {
  if (gameLoop) {
    if (!snake1.dead) {
      if (snake1.cpu) {
        snake1.newPath()
        snake1.cpuUpdate()
      } else {
        snake1.playerUpdate();
      }
    }
    if (!snake2.dead) {
      if (snake2.cpu) {
        snake2.newPath()
        snake2.cpuUpdate()
      } else {
        snake2.playerUpdate();
      }
    }
    snake1.collision();
    snake2.collision();
    if (!snake1.dead) {
      snake1.move();
    }
    if (!snake2.dead) {
      snake2.move();
    }
    drawFrame()
    if (snake1.dead || snake2.dead) {
      newRound();
      gameLoop = false
    }
  }
  updateInfo()
}