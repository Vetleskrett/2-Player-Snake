let Snake = class {
  constructor(x, y, color) {
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
    this.color = color;
    this.direction = "down";
    this.changedDir = true;
    this.dead = false;
    this.newHead = {
      x: this.tail[0].x,
      y: this.tail[0].y
    }
  };
  update() {
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
    if (!snake1.dead && !snake2.dead) {
      if (apple.x != this.newHead.x || apple.y != this.newHead.y) {
        this.tail.pop();
        this.tail.unshift(this.newHead)
      } else {
        if (volume) {
          bite.play()
        };
        newApple()
        if (snake1.tail[snake1.tail.length - 1].x == this.newHead.x && snake1.tail[snake1.tail.length - 1].y == this.newHead.y) {
          this.dead = true
        } else if (snake2.tail[snake2.tail.length - 1].x == this.newHead.x && snake2.tail[snake2.tail.length - 1].y == this.newHead.y) {
          this.dead = true
        } else {
          this.tail.unshift(this.newHead)
        }
      }
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