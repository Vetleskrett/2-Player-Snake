let Snake = class {
  constructor(x, y, color, cpu, diff) {
    this.tail = [{
      x: x,
      y: y
    }, {
      x: x,
      y: y - 1
    }, {
      x: x,
      y: y - 2
    }];
    gridArray[x][y].snake = true
    gridArray[x][y - 1].snake = true

    this.color = color;
    this.direction = "down";
    this.changedDir = true;
    this.dead = false;
    this.newHead = {
      x: this.tail[0].x,
      y: this.tail[0].y
    }
    this.cpu = cpu
    if (this.cpu) {
      this.path = []
      this.updateFrequency = 7 - (diff * 2)
    }
  };
  newPath() {
    let needNew = false
    if (this.path.length == 0 || frameCount % this.updateFrequency == 0) {
      needNew = true
    }
    if (needNew) {
      this.path = []
      let g = 0
      let h = distance(this.tail[0].x, this.tail[0].y, apple.x, apple.y)
      let f = g + h
      let openSet = []
      for (let i = 0; i < gridArray.length; i++) {
        let col = []
        for (let j = 0; j < gridArray[i].length; j++) {
          let obj = Object.assign({}, gridArray[i][j])
          col.push(obj)
        }
        openSet.push(col)
      }
      openSet[this.tail[0].x][this.tail[0].y].g = g
      openSet[this.tail[0].x][this.tail[0].y].h = h
      openSet[this.tail[0].x][this.tail[0].y].f = f
      openSet[this.tail[0].x][this.tail[0].y].camefrom = null

      let finished = false

      while (!finished) {
        let node = {
          f: Infinity
        }
        for (let i = 0; i < openSet.length; i++) {
          for (let j = 0; j < openSet[i].length; j++) {
            if (openSet[i][j].f < node.f && !openSet[i][j].closed) {
              node = openSet[i][j]
            }
          }
        }

        if (node.f === Infinity) {
          finished = true
          let neighbours = openSet[this.tail[0].x][this.tail[0].y].neighbours
          let arr = []
          for (let i = 0; i < neighbours.length; i++) {
            let current = openSet[neighbours[i].x][neighbours[i].y]
            if (!current.snake) {
              arr.push(neighbours[i])
            }
          }
          if (arr.length > 0) {
            let cell = arr[0]
            this.path = [{
              x: cell.x,
              y: cell.y
            }]
          }
        } else {
          for (let i = 0; i < node.neighbours.length; i++) {
            let current = openSet[node.neighbours[i].x][node.neighbours[i].y]
            if (!current.snake && !current.closed) {
              let g = node.g + 1
              if (current.g > g) {
                let h = distance(current.x, current.y, apple.x, apple.y)
                let f = g + h
                current.g = g
                current.h = h
                current.f = f
                current.camefrom = {
                  x: node.x,
                  y: node.y
                }
                if (h === 0) {
                  finished = true
                  while (current.camefrom !== null) {
                    this.path.push({
                      x: current.x,
                      y: current.y
                    })
                    current = openSet[current.camefrom.x][current.camefrom.y]
                  }
                  this.path.reverse()
                }
              }
            }
          }
          node.closed = true
        }
      }
    }
  }
  cpuUpdate() {
    if (this.path.length > 0) {
      this.newHead = {
        x: this.path[0].x,
        y: this.path[0].y,
      }
      this.path.shift()

      let xdiff1 = this.newHead.x - this.tail[0].x
      let xdiff2 = this.tail[0].x - this.tail[1].x

      let ydiff1 = this.newHead.y - this.tail[0].y
      let ydiff2 = this.tail[0].y - this.tail[1].y

      if (xdiff1 != xdiff2 || ydiff1 != ydiff2) {
        if (volume) {
          turn.setVolume(0.8)
          turn.play();
        };
      }
    } else {
      this.dead = true
    }
  }
  playerUpdate() {
    this.changedDir = true;
    this.newHead = {
      x: this.tail[0].x,
      y: this.tail[0].y
    };
    if (this.direction == "down") {
      this.newHead.y++
    } else if (this.direction == "up") {
      this.newHead.y--
    } else if (this.direction == "right") {
      this.newHead.x++
    } else if (this.direction == "left") {
      this.newHead.x--
    }
  };
  collision() {
    if (this.newHead.x < 0 || this.newHead.x >= cols || this.newHead.y < 0 || this.newHead.y >= rows) {
      this.dead = true
    };
    if (snake1.newHead.x == snake2.newHead.x && snake1.newHead.y == snake2.newHead.y) {
      this.dead = true
    };
    for (let i = 0; i < snake1.tail.length - 1; i++) {
      if (snake1.tail[i].x == this.newHead.x && snake1.tail[i].y == this.newHead.y) {
        this.dead = true;
        break
      }
    };
    for (let i = 0; i < snake2.tail.length - 1; i++) {
      if (snake2.tail[i].x == this.newHead.x && snake2.tail[i].y == this.newHead.y) {
        this.dead = true;
        break
      }
    };
    if (this.dead) {
      if (volume) {
        hit.play()
      }
    }
  };
  move() {
    if (!this.dead) {
      if (apple.x != this.newHead.x || apple.y != this.newHead.y) {
        gridArray[this.tail[this.tail.length - 2].x][this.tail[this.tail.length - 2].y].snake = false
        this.tail.pop();
        this.tail.unshift(this.newHead)
      } else {
        if (volume) {
          bite.play()
        }
        newApple()
        if (snake1.tail[snake1.tail.length - 1].x == this.newHead.x && snake1.tail[snake1.tail.length - 1].y == this.newHead.y) {
          this.dead = true
        } else if (snake2.tail[snake2.tail.length - 1].x == this.newHead.x && snake2.tail[snake2.tail.length - 1].y == this.newHead.y) {
          this.dead = true
        } else {
          this.tail.unshift(this.newHead)
        }
      }
      gridArray[this.newHead.x][this.newHead.y].snake = true
    }
  };
  show() {
    noStroke();
    if (this.color == "red") {
      fill(255, 30, 30)
    } else if (this.color == "green") {
      fill(0, 210, 0)
    } else if (this.color == "blue") {
      fill(60, 80, 255)
    };
    if (this.tail[1].y > this.tail[0].y) {
      rect(this.tail[0].x * w + 1, this.tail[0].y * w + 1, w - 2, w)
    } else if (this.tail[1].y < this.tail[0].y) {
      rect(this.tail[0].x * w + 1, this.tail[0].y * w - 1, w - 2, w)
    } else if (this.tail[1].x > this.tail[0].x) {
      rect(this.tail[0].x * w + 1, this.tail[0].y * w + 1, w, w - 2)
    } else if (this.tail[1].x < this.tail[0].x) {
      rect(this.tail[0].x * w - 1, this.tail[0].y * w + 1, w, w - 2)
    };
    let len = this.tail.length - 1;
    if (this.tail[len - 1].y > this.tail[len].y) {
      rect(this.tail[len].x * w + 1, this.tail[len].y * w + 1, w - 2, w)
    } else if (this.tail[len - 1].y < this.tail[len].y) {
      rect(this.tail[len].x * w + 1, this.tail[len].y * w - 1, w - 2, w)
    } else if (this.tail[len - 1].x > this.tail[len].x) {
      rect(this.tail[len].x * w + 1, this.tail[len].y * w + 1, w, w - 2)
    } else if (this.tail[len - 1].x < this.tail[len].x) {
      rect(this.tail[len].x * w - 1, this.tail[len].y * w + 1, w, w - 2)
    };
    for (let i = 1; i < this.tail.length - 1; i++) {
      if (this.tail[i - 1].y > this.tail[i].y || this.tail[i + 1].y > this.tail[i].y) {
        rect(this.tail[i].x * w + 1, this.tail[i].y * w + 1, w - 2, w)
      };
      if (this.tail[i - 1].y < this.tail[i].y || this.tail[i + 1].y < this.tail[i].y) {
        rect(this.tail[i].x * w + 1, this.tail[i].y * w - 1, w - 2, w)
      };
      if (this.tail[i - 1].x > this.tail[i].x || this.tail[i + 1].x > this.tail[i].x) {
        rect(this.tail[i].x * w + 1, this.tail[i].y * w + 1, w, w - 2)
      };
      if (this.tail[i - 1].x < this.tail[i].x || this.tail[i + 1].x < this.tail[i].x) {
        rect(this.tail[i].x * w - 1, this.tail[i].y * w + 1, w, w - 2)
      }
    };
    fill(0);
    if (this.tail[1].y > this.tail[0].y) {
      ellipse(this.tail[0].x * w + w / 2 - w / 4, this.tail[0].y * w + w / 2, w / 4);
      ellipse(this.tail[0].x * w + w / 2 + w / 4, this.tail[0].y * w + w / 2, w / 4)
    } else if (this.tail[1].y < this.tail[0].y) {
      ellipse(this.tail[0].x * w + w / 2 - w / 4, this.tail[0].y * w + w - w / 2, w / 4);
      ellipse(this.tail[0].x * w + w / 2 + w / 4, this.tail[0].y * w + w - w / 2, w / 4)
    } else if (this.tail[1].x > this.tail[0].x) {
      ellipse(this.tail[0].x * w + w / 2, this.tail[0].y * w + w / 2 - w / 4, w / 4);
      ellipse(this.tail[0].x * w + w / 2, this.tail[0].y * w + w / 2 + w / 4, w / 4)
    } else if (this.tail[1].x < this.tail[0].x) {
      ellipse(this.tail[0].x * w + w - w / 2, this.tail[0].y * w + w / 2 - w / 4, w / 4);
      ellipse(this.tail[0].x * w + w - w / 2, this.tail[0].y * w + w / 2 + w / 4, w / 4)
    }
  }
}