let xpos = 1;
let ypos = 1;
let easing = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(222);
  angleMode(DEGREES);
}

//giving the variable i a random value for future use
function draw() {
  let targetX = mouseX;
  let dx = targetX - xpos;
  xpos += dx * easing;

  let targetY = mouseY;
  let dy = targetY - ypos;
  ypos += dy * easing;

  drawPaw1(xpos, ypos);
}

//creates pattern one -- white
function drawPaw1(x, y) {
  clear();
  //body
  noStroke();
  fill(255, 255, 255);
  ellipse(x, y, 70);
  fill(255, 179, 179);
  ellipse(x, y, 50);
  fill(255, 102, 102);
  ellipse(x + 11, y - 11, 8);
  noFill();
  stroke(255, 102, 102);
  strokeWeight(6);
  arc(x, y, 30, 30, 0, 180);
  //toes
  noStroke();
  fill(255, 255, 255);
  ellipse(x - 44, y - 32, 20);
  ellipse(x + 44, y - 32, 20);
  ellipse(x - 17, y - 50, 25);
  ellipse(x + 17, y - 50, 25);
  fill(255, 179, 179);
  ellipse(x - 44, y - 32, 10);
  ellipse(x + 44, y - 32, 10);
  ellipse(x - 17, y - 50, 15);
  ellipse(x + 17, y - 50, 15);
}
