//sketch for chrome extension -- bouncy snacks

document.body.insertAdjacentHTML('afterbegin', '<div id="p5Canvas"></div>') //Embed in body

//some vars and constants
let var1;
let spring = 0.8;
let gravity = 0.02;
let friction = -0.95;
let snacks = [];

//set up the canvas and run the overlay
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('p5Canvas')
  angleMode(DEGREES);
   for (let i = 0; i < 10; i++) {
    snacks[i] = new Snack(
      random(width),
      random(height),
      random(30, 70),
      i,
      snacks
    );
  }
  
  var1 = random(1,5);
}

//start the falling of snacks and set their movements
function draw() {
  clear() //Make the background transparent 
  
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
    if (var1 < 2) {
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
    } 
    else if (2 <= var1 && var1 < 3) {
      //snack pattern 2 -- a bag of chips 
      //bag
      noStroke();
      fill(230,57,0);
      rect((this.x-40),(this.y-50),80,100);
      arc((this.x+8),this.y,120,162,135,225);
      arc((this.x-8),this.y,120,162,315,45);
      fill(153,38,0);
      rect((this.x-40),(this.y-55),80,5);
      rect((this.x-40),(this.y+50),80,5);
      fill(179,45,0);
      triangle((this.x-40),(this.y-55),(this.x-30),(this.y-65),(this.x-20),(this.y-55));
      triangle((this.x-20),(this.y-55),(this.x-10),(this.y-65),this.x,(this.y-55));
      triangle(this.x,(this.y-55),(this.x+10),(this.y-65),(this.x+20),(this.y-55));
      triangle((this.x+20),(this.y-55),(this.x+30),(this.y-65),(this.x+40),(this.y-55));
      triangle((this.x-40),(this.y+55),(this.x-30),(this.y+65),(this.x-20),(this.y+55));
      triangle((this.x-20),(this.y+55),(this.x-10),(this.y+65),this.x,(this.y+55));
      triangle(this.x,(this.y+55),(this.x+10),(this.y+65),(this.x+20),(this.y+55));
      triangle((this.x+20),(this.y+55),(this.x+30),(this.y+65),(this.x+40),(this.y+55));
      //prints
      fill(255,204,0);
      ellipse(this.x,(this.y-10),50);
      fill(255,255,255);
      rect((this.x-30),(this.y-10),60,10);
      rect((this.x-30),(this.y-20),60,4);
      rect((this.x-38),(this.y+25),76,2);
      fill(153,38,0);
      rect((this.x-38),(this.y+30),76,8);
      //highlight
      stroke(255,121,77);
      strokeWeight(4);
      line((this.x-30),(this.y-45),(this.x+30),(this.y-45));
      noFill();
      arc((this.x-5),this.y,105,148,315,45);
    }
    else if (3 <= var1 && var1 < 4) {
      //snack pattern 3 -- peppermint candy
      //candy
      noStroke();
      fill(255,235,225);
      ellipse(this.x,this.y,120);
      fill(255,255,255);
      ellipse(this.x,this.y,40);
      //shadow and highlight
      noFill();
      stroke(255,200,160);
      strokeWeight(6);
      arc(this.x,this.y,110,110,45,225);
      stroke(255,205,200);
      arc(this.x,this.y,100,100,48,222);
      stroke(255,255,255);
      strokeWeight(6);
      arc(this.x,this.y,110,110,250,20);
      //spiral
      translate(this.x,this.y);
      fill(230,57,0); 
      stroke(230,57,0); 
      strokeWeight(1);
      var r1=0,r2=0,step=1,spiralwidth=6,dw=spiralwidth/60;
      beginShape(TRIANGLE_STRIP);
      for ( var i = 0 ; i < 60 ; i++ ){
        r1 += step;
        spiralwidth -= dw;
        r2 = r1 + spiralwidth;
        var ang = PI/0.15;
        var r1x = r1*sin(ang*i);
        var r1y = r1*cos(ang*i);
        var r2x = r2*sin(ang*i);
        var r2y = r2*cos(ang*i);
        vertex(r1x,r1y);
        vertex(r2x,r2y);
      }
      endShape();
      //coordinates back to original
      translate(-this.x,-this.y);
    }
    else if (4 <= var1 && var1 < 5) {
      //snack pattern 4 -- pudding
      noStroke();
      fill(255,235,102);
      quad((this.x-40),(this.y-45),(this.x+40),(this.y-45),(this.x+55),(this.y+45),(this.x-55),(this.y+45));
      //caramel
      fill(120,45,10);
      quad((this.x-40),(this.y-45),(this.x+40),(this.y-45),(this.x+46),(this.y-10),(this.x-46),(this.y-10));
      arc((this.x-39),(this.y-10),13,20,0,180);
      arc((this.x-26),(this.y-10),13,20,0,180);
      arc((this.x-13),(this.y-10),13,20,0,180);
      arc(this.x,(this.y-10),13,20,0,180);
      arc((this.x+13),(this.y-10),13,20,0,180);
      arc((this.x+26),(this.y-10),13,20,0,180);
      arc((this.x+39),(this.y-10),13,20,0,180);
      //shadow and highlight
      noFill();
      stroke(80,30,10);
      strokeWeight(6);
      line((this.x-35),(this.y-40),(this.x-40),(this.y-10));
      stroke(243,221,79);
      line((this.x-42),(this.y+2),(this.x-50),(this.y+40));
      line((this.x-45),(this.y+40),(this.x+40),(this.y+40));
      stroke(255,255,255);
      line((this.x+10),(this.y-38),(this.x+22),(this.y-38));
      line((this.x+33),(this.y-38),(this.x+42),(this.y+20)); 
    }
  }
}