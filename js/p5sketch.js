let canvas;

let logo;
let logoW;
let logoH;
let logoTop;
let logoLeft;
let X = [];
let flowInfos;
let index = [0];
let p;
let headerH;
let mainTop;
let srchTop;
let srchH;
let rsvTop;
let rsvH;
let subTop;
let footerH;
let scrollY;

let mainH;
let subH;

let cherries = [];
let touch = false;

function preload() {
  logo = select("#logo");
  flowInfos = selectAll(".flowInfo");
  // p = createP("paragraph").position(0, 150);
}

function windowResized() {
  let canvasH = document.getElementsByTagName("body")[0].getBoundingClientRect().height - document.getElementsByTagName("main")[0].getBoundingClientRect().height;
  resizeCanvas(windowWidth, canvasH);

  // headerH = document.getElementsByTagName("header")[0].getBoundingClientRect().height;
  // footerH = document.getElementsByTagName("footer")[0].getBoundingClientRect().height;
  // logoW = Math.min(windowWidth, windowHeight - headerH - footerH) * 0.7;
  // logoH = logoW * logo.height / logo.width;
  // logo.style("width", logoW + "px");
  // logo.style("height", logoH + "px");
  // logoTop = (windowHeight - headerH - footerH) / 2 + headerH - logoH / 2;
  // logoLeft = windowWidth / 2 - logoW / 2;
  // logo.position(logoLeft, logoTop);
  // logo.style("position", "fixed");
}

function touchStarted() {
  touch = true;
}
function touchEnded() {
  touch = false;
}

function setup() {
  let canvasH = document.getElementsByTagName("body")[0].getBoundingClientRect().height - document.getElementsByTagName("main")[0].getBoundingClientRect().height;
  canvas = createCanvas(windowWidth, canvasH);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  textSize(24);

  // frameRate(30);

  for (i = 0; i < flowInfos.length; i++) {
    X.push(width + i);
  }

  headerH = document.getElementsByTagName("header")[0].getBoundingClientRect().height;
  footerH = document.getElementsByTagName("footer")[0].getBoundingClientRect().height;
  logoW = Math.min(windowWidth, windowHeight - headerH - footerH) * 0.7;
  logoH = logoW * logo.height / logo.width;
  logo.style("width", logoW + "px");
  logo.style("height", logoH + "px");
  logoTop = (windowHeight - headerH - footerH) / 2 + headerH - logoH / 2;
  logoLeft = windowWidth / 2 - logoW / 2;
  logo.position(logoLeft, logoTop);
  logo.style("position", "fixed");

}

function draw() {
  clear();
  console.log(frameRate());
  scrollY = -document.body.getBoundingClientRect().y//document.documentElement.scrollTop;
  mainTop = document.getElementsByClassName("main")[0].getBoundingClientRect().top;
  srchTop = document.getElementById("srchField").offsetTop;
  srchH = document.getElementById("srchField").offsetHeight;
  rsvTop = document.getElementById("rsvField").offsetTop;
  rsvH = document.getElementById("rsvField").offsetHeight;
  subTop = document.getElementsByClassName("sub")[0].getBoundingClientRect().top;
  mainH = document.getElementsByClassName("main")[0].getBoundingClientRect().height;
  subH = document.getElementsByClassName("sub")[0].getBoundingClientRect().height;

  //background
  // background(255, 128);

  //line
  stroke(0);
  line(width * 0.075, mainTop, width * 0.075, subTop + scrollY);

  // number 1
  fill(255);
  stroke(0);
  let posY1 = mainTop + 30 + 2 * scrollY;
  ellipse(width * 0.075, Math.min(posY1, rsvTop - 30), 30, 30);

  fill(0);
  text("1", width * 0.075, Math.min(posY1, rsvTop - 30));

  // number 2
  fill(255);
  stroke(0);
  let posY2 = rsvTop + 20;
  ellipse(width * 0.075, Math.min(Math.max(posY1, posY2), subTop + scrollY - 30), 30, 30);

  fill(0);
  text("2", width * 0.075, Math.min(Math.max(posY1, posY2), subTop + scrollY - 30));

  // flowing information
  for (let i = 0; i < flowInfos.length; i++) {
    flowInfos[i].position(X[i], 0);
  }

  for (let i of index) {
    X[i] -= 50 / frameRate();
  }

  addIndex();
  rePosition();
  // p.html(X[0] + "/" + X[1] + "/" + X[2]);
  // p.html(X[1]-X[0]-flowInfos[0].size().width);

  // falling cherries
  if (touch) {
    let p = random(0, 1);
    if (p < 0.3) {
      cherries.push(new Cherry(mouseX, mouseY, 20));
    }
  }

  for (let i = 0; i < cherries.length; i++) {
    cherries[i].show();
    cherries[i].fall();
    if (cherries[i].edge()) {
      cherries.splice(i, 1);
    }
  }
}

function convertUrl(id) {
  return "https://drive.google.com/uc?id=" + id;
}

function addIndex() {
  let i = index[index.length - 1]
  if (X[i] + flowInfos[i].size().width < width - 50) {
    let j = (i + 1) % flowInfos.length;
    if (j > 0) {
      index.push(j);
    }
  }
}

function rePosition() {
  const aryMin = function (a, b) { return Math.min(a, b); };
  const aryMax = function (a, b) { return Math.max(a, b); };
  let max = X.reduce(aryMax);
  if (max + flowInfos[X.indexOf(max)].size().width < width - 50) {
    let min = X.reduce(aryMin);
    X[X.indexOf(min)] = width;
  }
}

class Cherry {
  constructor(x, y, r) {
    this.x = x + random(0, 20);
    this.y = y + random(0, 40);
    this.r = r;
    this.vely = 50 / frameRate();
    this.velx = (60 * map(noise(this.y), 0, 1, -2, 2)) / frameRate();
    this.xoff = random(0, 10);
    this.angle = random(-PI / 6, PI / 6);
  }

  show() {
    noStroke();
    fill(255, 40, 64, 30);
    push();
    translate(this.x, this.y - 9);
    rotate(this.angle);
    // ellipse(this.x, this.y, this.r);
    beginShape();
    vertex(0, 0);
    bezierVertex(-6, -6, -9, -12, -3, -18);
    vertex(0, -15);
    vertex(3, -18);
    bezierVertex(9, -12, 6, -6, 0, 0);
    endShape();
    pop();
  }

  fall() {
    this.x = this.x + this.velx + map(noise(this.xoff), 0, 1, -1, 1);
    this.y += this.vely;
    this.xoff += 0.6 / frameRate();
    this.angle += 4 * map(noise(this.xoff), 0, 1, -1, 1) / frameRate();
  }

  edge() {
    if (this.x < 0 || this.x > width || this.y > height) {
      return true;
    }
  }
}
