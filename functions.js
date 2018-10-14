let newGame = function() {
  gameLoop = false;
  p1Header.innerHTML = p1name.value;
  p2Header.innerHTML = p2name.value;
  snake1Score = snake2Score = 0;
  cols = 12 * gameArea.value;
  rows = 8 * gameArea.value;
  w = width / cols;
  frameRate(pow(speed.value, 2));
  if (winScoreSlider.value == 1) {
    winScore = 1;
  } else if (winScoreSlider.value == 2) {
    winScore = 3;
  } else if (winScoreSlider.value == 3) {
    winScore = 5;
  } else if (winScoreSlider.value == 4) {
    winScore = 10;
  } else if (winScoreSlider.value == 5) {
    winScore = Infinity;
  };
  gridArray = createGridArray()
  newSnakes();
  newApple();
  drawFrame();
  setTimeout(function() {
    if (game.style.display == "flex") {
      gameLoop = true
    }
  }, 2000);
  setTimeout(function() {
    if (game.style.display == "flex" && volume) {
      bell.play()
    }
  }, 800)
};
let newSnakes = function() {
  snake1 = new Snake(1, 3, p1color, cpu1.checked, cpu1diff.value);
  snake2 = new Snake(cols - 2, 3, p2color, cpu2.checked, cpu2diff.value)
};
let toGame = function() {
  menu.style.display = "none";
  game.style.display = "flex";
  newGame()
};
let toMenu = function() {
  gameLoop = false;
  snake1Score = 0;
  snake2Score = 0;
  game.style.display = "none";
  menu.style.display = "flex"
};
let drawFrame = function() {
  background(240, 240, 215);
  showApple();
  snake1.show();
  snake2.show();
};
let newRound = function() {
  if (snake1.dead && !snake2.dead) {
    snake2Score++;
    if (volume) {
      ding.play()
    }
  } else if (snake2.dead && !snake1.dead) {
    snake1Score++;
    if (volume) {
      ding.play()
    }
  };
  drawFrame()
  let string;
  if (snake1Score < winScore && snake2Score < winScore) {
    if (snake1.dead && snake2.dead) {
      if (p1color != "green" && p2color != "green") {
        fill(0, 255, 0)
      } else if (p1color != "red" && p2color != "red") {
        fill(255, 0, 0)
      } else if (p1color != "blue" && p2color != "blue") {
        fill(0, 0, 255)
      };
      string = "Draw"
    } else if (snake1.dead) {
      if (p2color == "red") {
        fill(255, 30, 30)
      } else if (p2color == "green") {
        fill(0, 210, 0)
      } else if (p2color == "blue") {
        fill(60, 80, 255)
      };
      string = "Point " + p2name.value
    } else if (snake2.dead) {
      if (p1color == "red") {
        fill(255, 30, 30)
      } else if (p1color == "green") {
        fill(0, 210, 0)
      } else if (p1color == "blue") {
        fill(60, 80, 255)
      };
      string = "Point " + p1name.value
    }
    gridArray = createGridArray()
    newSnakes();
    newApple();
    setTimeout(drawFrame, 1500);
    setTimeout(function() {
      if (game.style.display == "flex") {
        gameLoop = true
      }
    }, 3000)
  } else {
    if (snake1.dead) {
      if (p2color == "red") {
        fill(255, 30, 30)
      } else if (p2color == "green") {
        fill(0, 210, 0)
      } else if (p2color == "blue") {
        fill(60, 80, 255)
      }
      string = p2name.value + " won"
    } else if (snake2.dead) {
      if (p1color == "red") {
        fill(255, 30, 30)
      } else if (p1color == "green") {
        fill(0, 210, 0)
      } else if (p1color == "blue") {
        fill(60, 80, 255)
      }
      string = p1name.value + " won"
    }
    setTimeout(toMenu, 4000)
  }
  textAlign(CENTER, CENTER);
  stroke(0);
  strokeWeight(4);
  textSize(80);
  setTimeout(function() {
    text(string, width / 2, height / 2)
  }, 300)
}
let newApple = function() {
  apple.x = floor(random(cols));
  apple.y = floor(random(rows));
  while (true) {
    let onSnake = false;
    for (let i = 0; i < snake1.tail.length; i++) {
      if (apple.x == snake1.tail[i].x && apple.y == snake1.tail[i].y) {
        onSnake = true
      }
    };
    for (let i = 0; i < snake2.tail.length; i++) {
      if (apple.x == snake2.tail[i].x && apple.y == snake2.tail[i].y) {
        onSnake = true
      }
    };
    if (apple.x == snake1.newHead.x && apple.y == snake1.newHead.y) {
      onSnake = true
    };
    if (apple.x == snake2.newHead.x && apple.y == snake2.newHead.y) {
      onSnake = true
    };
    if (onSnake) {
      apple.x++;
      if (apple.x >= cols) {
        apple.x = 0;
        apple.y++;
        if (apple.y >= rows) {
          apple.y = 0
        }
      }
    } else {
      break
    }
  }
};
let showApple = function() {
  image(applePNG, (apple.x * w) + 1, (apple.y * w) + 1, w - 2, w - 2)
};
let updateInfo = function() {
  p1Score.innerHTML = snake1Score;
  p2Score.innerHTML = snake2Score
};

let distance = function(x1, y1, x2, y2) {
  return abs(x1 - x2) + abs(y1 - y2)
}

let createGridArray = function() {
  let arr = []
  for (let x = 0; x < cols; x++) {
    let col = []
    for (let y = 0; y < rows; y++) {
      let obj = {
        x: x,
        y: y,
        g: Infinity,
        f: Infinity,
        snake: false,
        closed: false
      }
      let neighbours = []
      if (x > 0) {
        neighbours.push({
          x: x - 1,
          y: y
        })
      }
      if (y > 0) {
        neighbours.push({
          x: x,
          y: y - 1
        })
      }
      if (x < cols - 1) {
        neighbours.push({
          x: x + 1,
          y: y
        })
      }
      if (y < rows - 1) {
        neighbours.push({
          x: x,
          y: y + 1
        })
      }
      obj.neighbours = neighbours
      col.push(obj)
    }
    arr.push(col)
  }
  return arr.slice()
}

function keyPressed() {
  if (gameLoop) {
    if (snake2.changedDir && !snake2.cpu) {
      if (keyCode === 40) {
        if (snake2.direction !== "up" && snake2.direction !== "down") {
          snake2.direction = "down";
          snake2.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      } else if (keyCode === 38) {
        if (snake2.direction !== "down" && snake2.direction !== "up") {
          snake2.direction = "up";
          snake2.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      } else if (keyCode === 39) {
        if (snake2.direction !== "left" && snake2.direction !== "right") {
          snake2.direction = "right";
          snake2.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      } else if (keyCode === 37) {
        if (snake2.direction !== "right" && snake2.direction !== "left") {
          snake2.direction = "left";
          snake2.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      }
    };
    if (snake1.changedDir && !snake1.cpu) {
      if (keyCode === 83) {
        if (snake1.direction !== "up" && snake1.direction !== "down") {
          snake1.direction = "down";
          snake1.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      } else if (keyCode === 87) {
        if (snake1.direction !== "down" && snake1.direction !== "up") {
          snake1.direction = "up";
          snake1.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      } else if (keyCode === 68) {
        if (snake1.direction !== "left" && snake1.direction !== "right") {
          snake1.direction = "right";
          snake1.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      } else if (keyCode === 65) {
        if (snake1.direction !== "right" && snake1.direction !== "left") {
          snake1.direction = "left";
          snake1.changedDir = false
          if (volume) {
            turn.play();
            turn.setVolume(0.8)
          };
        }
      }
    }
  }
}