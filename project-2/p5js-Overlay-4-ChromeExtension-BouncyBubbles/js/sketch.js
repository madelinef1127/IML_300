//sketch for chrome extension -- bouncy snacks

document.body.insertAdjacentHTML('afterbegin', '<div id="p5Canvas"></div>') //Embed in body

//some vars and constants
let var1;
let spring = 0.08;
let gravity = 0.01;
let friction = -0.09;
let snacks = [];

//set up the canvas and run the overlay
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('p5Canvas')
}

//start the falling of snacks and set their movements
function draw() {
  clear() //Make the background transparent
  for (let i = 0; i < 2; i++) {
    snacks[i] = new Snack(
      random(width),
      random(height),
      random(30, 70),
      i,
      snacks
    );
  }
    
  let var1 = random(1,5);

  snacks.forEach(snack => {
    snack.collide();
    snack.move();
    snack.display();
  });
}

class Snack {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < 2; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }
  display() {
    //if (var 1 , 2) {
        //snack pattern 1 -- donut
        //dough
        noStroke();
        fill(255,180,51);
        ellipse(this.x, this.y,100);
        //topping
        fill(77,51,25);
        ellipse(this.x, this.y,60);
        ellipse(this.x,(this.y-25),30,28);
        ellipse(this.x,(this.y+25),30,28);
        ellipse((this.x-25),this.y,28,30);
        ellipse((this.x+25),this.y,28,30);
        ellipse((this.x-20),(this.y-20),22,22);
        ellipse((this.x+20),(this.y-20),22,22);
        ellipse((this.x-20),(this.y+20),22,22);
        ellipse((this.x+20),(this.y+20),22,22);
        //sprinkles
        stroke(153,204,255);
        strokeWeight(4);
        line((this.x-18),(this.y-15),(this.x-10),(this.y-8));
        line((this.x-4),(this.y+25),(this.x+6),(this.y+17));
        stroke(255,204,230);
        line((this.x+18),(this.y-12),(this.x+10),(this.y-5));
        line((this.x-20),(this.y+10),(this.x-12),(this.y+15));
        line((this.x+15),(this.y+20),(this.x+20),(this.y+12));
        stroke(255,255,153);
        line((this.x-2),(this.y+8),(this.x+1),(this.y-2));
        line((this.x+15),(this.y+2),(this.x+22),(this.y+5));
        stroke(210,255,77);
        line((this.x-1),(this.y-17),(this.x+3),(this.y-25));
        line((this.x-25),(this.y+3),(this.x-15),(this.y-2));
        //highlight
        stroke(255,220,189);
        noFill();
        arc(this.x, this.y,88,88,225,45);
        arc(this.x, this.y,88,88,60,210);
    //} 
    //else if (2 <= i && i < 3) {
        
    //}
    //else if (3 <= i && i < 4) {
        
    //}
    //else if (4 <= i && i < 5) }{
        
    //}
  }
}