function setup() {
  soundButton = document.getElementById("soundButton");
  soundButton.style.display = "block"
  soundButton.addEventListener("mousedown", function() {
    if (this.checked) {
      unity.setVolume(0.5, 1);
      volume = true
    } else {
      unity.setVolume(0, 0.2);
      volume = false
    }
  });
  p1Score = document.getElementById("p1Score");
  p2Score = document.getElementById("p2Score");
  game = document.getElementById("game");
  menu = document.getElementById("menu");
  play = document.getElementById("play");
  play.addEventListener("mousedown", toGame);
  p1name = document.getElementById("p1name");
  p2name = document.getElementById("p2name");
  p1r = document.getElementById("p1r");
  p1r.addEventListener("mouseover", function() {
    if (p1color != "red") {
      p1r.style.border = "grey solid 2px";
      p1r.style.opacity = 1
    }
  });
  p1r.addEventListener("mouseout", function() {
    if (p1color != "red") {
      p1r.style.border = "white solid 2px";
      p1r.style.opacity = 0.9
    }
  });
  p1r.addEventListener("mousedown", function() {
    if (p1color != "red") {
      p1color = "red";
      p1r.style.border = "black solid 2px";
      p1g.style.border = "white solid 2px";
      p1b.style.border = "white solid 2px";
      p1r.style.opacity = 1;
      p1g.style.opacity = 0.9;
      p1b.style.opacity = 0.9
    }
  });
  p1color = "red";
  p1r.style.border = "black solid 2px";
  p1g.style.border = "white solid 2px";
  p1b.style.border = "white solid 2px";
  p1r.style.opacity = 1;
  p1g.style.opacity = 0.9;
  p1b.style.opacity = 0.9;
  p1g = document.getElementById("p1g");
  p1g.addEventListener("mouseover", function() {
    if (p1color != "green") {
      p1g.style.border = "grey solid 2px";
      p1g.style.opacity = 1
    }
  });
  p1g.addEventListener("mouseout", function() {
    if (p1color != "green") {
      p1g.style.border = "white solid 2px";
      p1g.style.opacity = 0.9
    }
  });
  p1g.addEventListener("mousedown", function() {
    if (p1color != "green") {
      p1color = "green";
      p1r.style.border = "white solid 2px";
      p1g.style.border = "black solid 2px";
      p1b.style.border = "white solid 2px";
      p1r.style.opacity = 0.9;
      p1g.style.opacity = 1;
      p1b.style.opacity = 0.9
    }
  });
  p1b = document.getElementById("p1b");
  p1b.addEventListener("mouseover", function() {
    if (p1color != "blue") {
      p1b.style.border = "grey solid 2px";
      p1b.style.opacity = 1
    }
  });
  p1b.addEventListener("mouseout", function() {
    if (p1color != "blue") {
      p1b.style.border = "white solid 2px";
      p1b.style.opacity = 0.9
    }
  });
  p1b.addEventListener("mousedown", function() {
    if (p1color != "blue") {
      p1color = "blue";
      p1r.style.border = "white solid 2px";
      p1g.style.border = "white solid 2px";
      p1b.style.border = "black solid 2px";
      p1r.style.opacity = 0.9;
      p1g.style.opacity = 0.9;
      p1b.style.opacity = 1
    }
  });
  p2r = document.getElementById("p2r");
  p2r.addEventListener("mouseover", function() {
    if (p2color != "red") {
      p2r.style.border = "grey solid 2px";
      p2r.style.opacity = 1
    }
  });
  p2r.addEventListener("mouseout", function() {
    if (p2color != "red") {
      p2r.style.border = "white solid 2px";
      p2r.style.opacity = 0.9
    }
  });
  p2r.addEventListener("mousedown", function() {
    if (p2color != "red") {
      p2color = "red";
      p2r.style.border = "black solid 2px";
      p2g.style.border = "white solid 2px";
      p2b.style.border = "white solid 2px";
      p2r.style.opacity = 1;
      p2g.style.opacity = 0.9;
      p2b.style.opacity = 0.9
    }
  });
  p2g = document.getElementById("p2g");
  p2g.addEventListener("mouseover", function() {
    if (p2color != "green") {
      p2g.style.border = "grey solid 2px";
      p2g.style.opacity = 1
    }
  });
  p2g.addEventListener("mouseout", function() {
    if (p2color != "green") {
      p2g.style.border = "white solid 2px";
      p2g.style.opacity = 0.9
    }
  });
  p2g.addEventListener("mousedown", function() {
    if (p2color != "green") {
      p2color = "green";
      p2r.style.border = "white solid 2px";
      p2g.style.border = "black solid 2px";
      p2b.style.border = "white solid 2px";
      p2r.style.opacity = 0.9;
      p2g.style.opacity = 1;
      p2b.style.opacity = 0.9
    }
  });
  p2b = document.getElementById("p2b");
  p2b.addEventListener("mouseover", function() {
    if (p2color != "blue") {
      p2b.style.border = "grey solid 2px";
      p2b.style.opacity = 1
    }
  });
  p2b.addEventListener("mouseout", function() {
    if (p2color != "blue") {
      p2b.style.border = "white solid 2px";
      p2b.style.opacity = 0.9
    }
  });
  p2b.addEventListener("mousedown", function() {
    if (p2color != "blue") {
      p2color = "blue";
      p2r.style.border = "white solid 2px";
      p2g.style.border = "white solid 2px";
      p2b.style.border = "black solid 2px";
      p2r.style.opacity = 0.9;
      p2g.style.opacity = 0.9;
      p2b.style.opacity = 1
    }
  });
  p2color = "blue";
  p2r.style.border = "white solid 2px";
  p2g.style.border = "white solid 2px";
  p2b.style.border = "black solid 2px";
  p2r.style.opacity = 0.9;
  p2g.style.opacity = 0.9;
  p2b.style.opacity = 1;
  gameArea = document.getElementById("gameArea");
  speed = document.getElementById("speed");
  winScoreSlider = document.getElementById("winScore");
  let canvas = createCanvas(864, 576);
  canvas.parent("canvasArea");
  unity.setLoop(true);
  unity.play();
  unity.setVolume(0.5, 1)
  toMenu();
};