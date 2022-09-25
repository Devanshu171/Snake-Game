const canvas = document.getElementById("canvas");
const scoreEle = document.getElementById("score");
const highcoreEle = document.getElementById("highScore");
const modeButton = document.querySelector("button");

//  specifing frame of our graphic stracture we and on this canvas element
const ctx = canvas.getContext("2d");
//  and it returns object with alot of functions
// console.log(ctx);

// definig the 2d stracture that  we want
// fillRect takes 4 parameter i.e cordinates x-axis ,y-axis ,height,width
// ctx.fillStyle = "#333";
// ctx.fillRect(0, 0, 50, 40);
//  but this is static size but we want dynamic size snake so will do something else
let square = 40;
let snakeCell = [[0, 0]]; // cordinates
let bheight = 600;
let bwidth = 1000;
let direction = "default";
let body = new Set();
// localStorage.se("highScore");
if (!localStorage.getItem("highScore")) {
  localStorage.setItem("highScore", 0);
}
let highScore = localStorage.getItem("highScore");
highcoreEle.textContent = highScore;
function setHighScore() {
  highScore = Math.max(score, localStorage.getItem("highScore"));
  localStorage.setItem("highScore", highScore);

  highcoreEle.textContent = highScore;
}
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    if (direction != "left") direction = "right";
  } else if (event.key === "ArrowLeft") {
    if (direction != "right") direction = "left";
  } else if (event.key === "ArrowUp") {
    if (direction != "down") direction = "up";
  } else if (event.key === "ArrowDown") {
    if (direction != "up") direction = "down";
  }
  // console.log(direction);
});
// update funtion will take care of what size or where to move etx.
let gameOver = false;
let foodG = genrateRandomCell();
let width = 50;
let height = 50;
let ind = 7;
let ind1 = 0;
let score = 0;
function update() {
  headX = snakeCell[snakeCell.length - 1][0];
  headY = snakeCell[snakeCell.length - 1][1];
  let newX = headX;
  let newY = headY;

  if (direction === "default") {
    newX = headX;
    newY = headY;
  } else if (direction === "down") {
    newY += square;
    if (newY == bheight) {
      gameOver = true;
    }
  } else if (direction === "up") {
    newY -= square;
    if (newY < 0) {
      gameOver = true;
    }
  } else if (direction === "left") {
    newX -= square;
    if (newX < 0) {
      gameOver = true;
    }
  } else {
    newX += square;
    if (newX === bwidth) {
      gameOver = true;
    }
  }
  if (body.has([newX, newY]) && direction != "default") {
    gameOver = true;
  }

  //  adding new cordinates to our array
  if (gameOver) {
    canvas.style.backgroundColor = "#333";
    let h1 = document.createElement("h1");
    h1.textContent = "GAME OVER";
    h1.style.color = "white";

    h1.style.fontSize = "5rem";
    h1.style.position = "absolute";
    h1.style.left = "700px";
    h1.style.bottom = "300px";

    document.querySelector("html").append(h1);
    clearInterval(id);
    setHighScore();
    return;
  }
  let flag = 0;
  if (newX === foodG[0] && newY === foodG[1]) {
    ind1 = ind;
    ind = Math.trunc(Math.random() * arr.length);
    foodG = genrateRandomCell();
    scoreEle.textContent = ++score;
    flag = 1;
    speed -= 10;
  }

  snakeCell.push([newX, newY]);
  if (!flag) {
    body.delete(snakeCell[0]);
    snakeCell.shift();
  }
  // body;
  // removing first cell so we movw to next cell with same height
}

function genrateRandomCell() {
  return [
    Math.round((Math.random() * (bwidth - square)) / square) * square,
    Math.round((Math.random() * (bheight - square)) / square) * square,
  ];
}
let arr = [
  " rgb(30, 255, 0)",
  " rgb(255, 115, 0)",
  "rgb(255, 0, 170)",
  "rgb(200, 255, 0)",
  "rgb(200, 0, 255)",
  "rgb(0, 170, 255)",
  "rgb(20, 213, 194)",
  "rgb(213, 20, 20)",
  "rgb(34, 67, 255)",
  "rgb(255, 34, 111)",
];

//  this  functon will take care all sizes of snake 4
let speed = 200;
function draw() {
  //
  ctx.clearRect(0, 0, bwidth, bheight);
  for (let cell of snakeCell) {
    ctx.fillStyle = arr[ind1];
    body.add([cell[0], cell[1]]);
    ctx.fillRect(cell[0], cell[1], square, square);
  }

  //  draw food
  ctx.fillStyle = arr[ind];
  ctx.fillRect(foodG[0], foodG[1], square, square);
}

let id = setInterval(function () {
  update();
  draw();
}, 100);
