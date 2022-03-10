let logo;

function preload() {
    logo = createImg(imgUrl("1I2ZPhvu3ir-2U6jfy7_t2Bhmu-F8u-XH"), "");
}

function setup() {
    canvas = createCanvas(document.documentElement.scrollWidth,document.documentElement.scrollHeight);//2Dの場合は引数にWEBGLは要らない
    canvas.position(0, 0);//canvasをページの原点に固定
    canvas.style('z-index', '-1');//canvasを後ろに移動する
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    textSize(24);
    frameRate(60);
}

function draw() {
    clear();
    background("#00A0E933");
    line(width * 0.075, 100, width * 0.075, 300);

    fill(255);
    stroke(0);
    ellipse(width * 0.075, 130, 30, 30);

    fill(0);
    text("1", width * 0.075, 130);

    tint(255, 128);
    image(logo, windowWidth / 2, windowHeight / 2 +document.documentElement.scrollTop || document.body.scrollTop);
}

function imgUrl(id) {
    return "https://drive.google.com/uc?id=" + id;
}
