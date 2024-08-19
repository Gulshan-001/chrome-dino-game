let canvas;
let canvaswidth = 750;
let canvasheight = 250;
let context;

let charwid = 88;
let charheight = 94;
let charx = 50;
let charY = canvasheight - charheight;
let dinopic;

let dinofigure = {
  x: charx,
  y: charY,
  width: charwid,
  height: charheight,
};

let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = canvasheight - cactusHeight;

let cactus1;
let cactus2;
let cactus3;

let speedX = -3;
let speedY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function () {
  canvas = document.getElementById("board");
  canvas.height = canvasheight;
  canvas.width = canvaswidth;

  context = canvas.getContext("2d");

  dinopic = new Image();
  dinopic.src = "dino 2.png";
  dinopic.onload = function () {
    context.drawImage(dinopic, dinofigure.x, dinofigure.y, dinofigure.width, dinofigure.height);
  };

  cactus1 = new Image();
  cactus1.src = "cactus1.png";

  cactus2 = new Image();
  cactus2.src = "cactus2.png";

  cactus3 = new Image();
  cactus3.src = "cactus3.png";

  requestAnimationFrame(update);
  setInterval(placeCactus, 1000);
  document.addEventListener("keydown", moveDino);
};

function update() {
  if (gameOver) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  speedY += gravity;
  dinofigure.y = Math.min(dinofigure.y + speedY, charY);
  context.drawImage(dinopic, dinofigure.x, dinofigure.y, dinofigure.width, dinofigure.height);

  let currentVelocityX = speedX - Math.floor(score / 100);

  for (let i = 0; i < cactusArray.length; i++) {
    let cactus = cactusArray[i];
    cactus.x += currentVelocityX;
    context.drawImage(
      cactus.img,
      cactus.x,
      cactus.y,
      cactus.width,
      cactus.height
    );

    if (detectCollision(dinofigure, cactus)) {
      gameOver = true;
      dinopic.src = "dino-dead.png";
      dinopic.onload = function () {
        context.drawImage(dinopic, dinofigure.x, dinofigure.y, dinofigure.width, dinofigure.height);
      };
    }
  }

  context.fillStyle = "black";
  context.font = "20px courier";
  score++;
  context.fillText(score, 5, 20);

  requestAnimationFrame(update);
}

function moveDino(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dinofigure.y == charY) {
        speedY = -10;
    }
}

function placeCactus() {
  let cactus = {
    img: null,
    x: cactusX,
    y: cactusY,
    width: null,
    height: cactusHeight,
  };

  let placeCactusChance = Math.random();

  if (placeCactusChance > 0.9) {
    cactus.img = cactus3;
    cactus.width = cactus3Width;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.7) {
    cactus.img = cactus2;
    cactus.width = cactus2Width;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.5) {
    cactus.img = cactus1;
    cactus.width = cactus1Width;
    cactusArray.push(cactus);
  }

  if (cactusArray.length > 5) {
    cactusArray.shift();
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}