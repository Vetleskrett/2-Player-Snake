function preload() {
  unity = loadSound("sound/Unity.wav");
  unity.setLoop(true);
  unity.play();
  unity.setVolume(0.5, 1);
  bite = loadSound("sound/bite.wav");
  hit = loadSound("sound/hit.wav");
  bell = loadSound("sound/bell.mp3");
  ding = loadSound("sound/ding.mp3");
  turn = loadSound("sound/turn.wav");
  applePNG = loadImage("pictures/apple.png");
}
