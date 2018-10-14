function setup() {
  loadingSpinner.style.display = "none"
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
      p1r.style.border = "transparent solid 2px";
      p1r.style.opacity = 0.9
    }
  });
  p1r.addEventListener("mousedown", function() {
    if (p1color != "red") {
      p1color = "red";
      p1r.style.border = "black solid 2px";
      p1g.style.border = "transparent solid 2px";
      p1b.style.border = "transparent solid 2px";
      p1r.style.opacity = 1;
      p1g.style.opacity = 0.9;
      p1b.style.opacity = 0.9
    }
  });
  p1color = "red";
  p1r.style.border = "black solid 2px";
  p1g.style.border = "transparent solid 2px";
  p1b.style.border = "transparent solid 2px";
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
      p1g.style.border = "transparent solid 2px";
      p1g.style.opacity = 0.9
    }
  });
  p1g.addEventListener("mousedown", function() {
    if (p1color != "green") {
      p1color = "green";
      p1r.style.border = "transparent solid 2px";
      p1g.style.border = "black solid 2px";
      p1b.style.border = "transparent solid 2px";
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
      p1b.style.border = "transparent solid 2px";
      p1b.style.opacity = 0.9
    }
  });
  p1b.addEventListener("mousedown", function() {
    if (p1color != "blue") {
      p1color = "blue";
      p1r.style.border = "transparent solid 2px";
      p1g.style.border = "transparent solid 2px";
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
      p2r.style.border = "transparent solid 2px";
      p2r.style.opacity = 0.9
    }
  });
  p2r.addEventListener("mousedown", function() {
    if (p2color != "red") {
      p2color = "red";
      p2r.style.border = "black solid 2px";
      p2g.style.border = "transparent solid 2px";
      p2b.style.border = "transparent solid 2px";
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
      p2g.style.border = "transparent solid 2px";
      p2g.style.opacity = 0.9
    }
  });
  p2g.addEventListener("mousedown", function() {
    if (p2color != "green") {
      p2color = "green";
      p2r.style.border = "transparent solid 2px";
      p2g.style.border = "black solid 2px";
      p2b.style.border = "transparent solid 2px";
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
      p2b.style.border = "transparent solid 2px";
      p2b.style.opacity = 0.9
    }
  });
  p2b.addEventListener("mousedown", function() {
    if (p2color != "blue") {
      p2color = "blue";
      p2r.style.border = "transparent solid 2px";
      p2g.style.border = "transparent solid 2px";
      p2b.style.border = "black solid 2px";
      p2r.style.opacity = 0.9;
      p2g.style.opacity = 0.9;
      p2b.style.opacity = 1
    }
  });
  p2color = "blue";
  p2r.style.border = "transparent solid 2px";
  p2g.style.border = "transparent solid 2px";
  p2b.style.border = "black solid 2px";
  p2r.style.opacity = 0.9;
  p2g.style.opacity = 0.9;
  p2b.style.opacity = 1;

  //-------------------------------------------------------
  sliderStyle1 = document.querySelector('[data="1"]');
  sliderStyle2 = document.querySelector('[data="2"]');
  cpu1diffDiv = document.getElementById("cpu1diffDiv")
  cpu1diff = document.getElementById("cpu1diff")
  cpu1diff.disabled = true
  cpu1diff.style.cursor = "default"
  cpu1diffDiv.style.color = "grey"
  sliderStyle1.innerHTML = "#cpu1diff::-webkit-slider-thumb { background: grey; }";
  sliderStyle2.innerHTML = "#cpu1diff:hover { opacity: .7; }";
  cpu1 = document.getElementById("cpu1")
  cpu1.addEventListener("change", function() {
    cpu1diff.disabled = !cpu1.checked
    if (cpu1.checked) {
      cpu1diffDiv.style.color = "black"
      sliderStyle1.innerHTML = "#cpu1diff::-webkit-slider-thumb { background: rgb(0, 120, 255); }";
      sliderStyle2.innerHTML = "#cpu1diff:hover { opacity: 1; }";
      cpu1diff.style.cursor = "pointer"

    } else {
      cpu1diffDiv.style.color = "grey"
      sliderStyle1.innerHTML = "#cpu1diff::-webkit-slider-thumb { background: grey; }";
      sliderStyle2.innerHTML = "#cpu1diff:hover { opacity: .7; }";
      cpu1diff.style.cursor = "default"

    }
  })

  //-------------------------------------------------------

  sliderStyle3 = document.querySelector('[data="3"]');
  sliderStyle4 = document.querySelector('[data="4"]');
  cpu2diffDiv = document.getElementById("cpu2diffDiv")
  cpu2diff = document.getElementById("cpu2diff")
  cpu2diff.disabled = true
  cpu2diffDiv.style.color = "grey"
  sliderStyle3.innerHTML = "#cpu2diff::-webkit-slider-thumb { background: grey; }";
  sliderStyle4.innerHTML = "#cpu2diff:hover { opacity: .7; }";
  cpu2diff.style.cursor = "default"
  cpu2 = document.getElementById("cpu2")
  cpu2.addEventListener("change", function() {
    cpu2diff.disabled = !cpu2.checked
    if (cpu2.checked) {
      cpu2diffDiv.style.color = "black"
      sliderStyle3.innerHTML = "#cpu2diff::-webkit-slider-thumb { background: rgb(0, 120, 255); }";
      sliderStyle4.innerHTML = "#cpu2diff:hover { opacity: 1; }";
      cpu2diff.style.cursor = "pointer"
    } else {
      cpu2diffDiv.style.color = "grey"
      sliderStyle3.innerHTML = "#cpu2diff::-webkit-slider-thumb { background: grey; }";
      sliderStyle4.innerHTML = "#cpu2diff:hover { opacity: .7; }";
      cpu2diff.style.cursor = "default"
    }
  })

  //-------------------------------------------------------

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