let snake1, snake2, p1Score, p2Score, w, applePNG, play, cols, rows, winScore, winScoreSlider, p1name, p2name, gameArea, speed, unity, bite, hit, bell, ding, turn;
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
    if (!snake1.dead && !snake2.dead) {
      snake1.update();
      snake2.update();
      snake1.collision();
      snake2.collision();
      snake1.move();
      snake2.move();
      drawFrame()
    } else {
      newRound();
      gameLoop = false
    }
  };
  updateInfo()
}