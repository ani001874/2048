const container = document.querySelector(".container");
let gameRow = 4;
let matrix = [];
let score = 0;
let startX = 0 
let endX = 0
let startY = 0
let endY = 0
document.querySelector(".score .score-val").innerHTML = score;

const scoreSetInLocal = (score) => {
  localStorage.setItem("score", JSON.stringify(score));
};

const getScoreFromLocal = () => JSON.parse(localStorage.getItem("score"))  || 0;
document.querySelector(".best-score .score-val").innerHTML = getScoreFromLocal();



const createGameBoard = () => {
  for (let i = 0; i < gameRow * gameRow; i++) {
    let gameDiv = document.createElement("div");
    gameDiv.innerHTML = null;
    gameDiv.classList.add("box");
    container.appendChild(gameDiv);
    matrix.push(gameDiv);
  }
  randomText();
  randomText();
};

const setColor = () => {
  for (let i = 0; i < 16; i++) {
    if (matrix[i].innerHTML == 2) {
      matrix[i].style.backgroundColor = "#eee4da";
    } else if (matrix[i].innerHTML == 4) {
      matrix[i].style.backgroundColor = "#ede0c8";
    } else if (matrix[i].innerHTML == 8) {
      matrix[i].style.backgroundColor = "#f2b179";
    } else if (matrix[i].innerHTML == 16) {
      matrix[i].style.backgroundColor = "#f59563";
    } else if (matrix[i].innerHTML == 32) {
      matrix[i].style.backgroundColor = "#f67c5f";
    } else if (matrix[i].innerHTML == 64) {
      matrix[i].style.backgroundColor = "#f65e3b";
    } else if (matrix[i].innerHTML == 128) {
      matrix[i].style.backgroundColor = "#edcf72";
    } else if (matrix[i].innerHTML == 256) {
      matrix[i].style.backgroundColor = "#edcc61";
    } else if (matrix[i].innerHTML == 512) {
      matrix[i].style.backgroundColor = "#edc850";
    } else if (matrix[i].innerHTML == 1024) {
      matrix[i].style.backgroundColor = "#edc53f";
    } else if (matrix[i].innerHTML == 2048) {
      matrix[i].style.backgroundColor = "#edc22e";
    } else {
      matrix[i].style.backgroundColor = "#bbb6b0";
    }
  }
};

setInterval(setColor, 30);

const isFull = () => matrix.every((ele) => ele.innerHTML != "");

const gameOver = () => {
  if (isFull()) {
    for (let i = 0; i < 15; i++) {
      if (i % 4 !== 3 && matrix[i].innerHTML == matrix[i + 1].innerHTML)
        return false;
      else if (i < 12 && matrix[i].innerHTML == matrix[i + 4].innerHTML)
        return false;
    }
    return true;
  }

  return false;
};

const generateRandomNum = () => Math.floor(Math.random() * matrix.length);
const randomText = () => {
  let randomNum = generateRandomNum();
  if (matrix[randomNum].innerHTML === "") {
    let value = Math.random() < 0.9 ? 2 : 4;
    matrix[randomNum].innerHTML = value;

    // console.log(gameOver())
    if (gameOver()) {
      let gameOverDiv = document.createElement("div");
      gameOverDiv.classList.add("gameOver");
      let gameOverMsg = `<p> Game Over </p>`;
      gameOverDiv.insertAdjacentHTML("afterbegin", gameOverMsg);
      document.body.appendChild(gameOverDiv);
    }
  } else {
    if (!isFull()) {
      randomText();
    }
  }
};

createGameBoard();

const moveX = (dir) => {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let firstItem = matrix[i];
      let secondItem = matrix[i + 1];
      let thirdItem = matrix[i + 2];
      let fourItem = matrix[i + 3];

      let row = [
        parseInt(firstItem.innerHTML),
        parseInt(secondItem.innerHTML),
        parseInt(thirdItem.innerHTML),
        parseInt(fourItem.innerHTML),
      ];

      let filteredRow = row.filter((item) => item);
      let len = filteredRow.length;

      let newRow = [];
      if (dir === "right") {
        newRow = Array(4 - len)
          .fill(null)
          .concat(filteredRow);
      }
      if (dir === "left") {
        newRow = [...filteredRow, ...Array(4 - len).fill(null)];
      }

      matrix[i].innerHTML = newRow[0];
      matrix[i + 1].innerHTML = newRow[1];
      matrix[i + 2].innerHTML = newRow[2];
      matrix[i + 3].innerHTML = newRow[3];
    }
  }
};

const moveY = (dir) => {
  for (let i = 0; i < 4; i++) {
    let firstItem = matrix[i];
    let secondItem = matrix[i + 4];
    let thirdItem = matrix[i + 8];
    let fourItem = matrix[i + 12];

    let col = [
      parseInt(firstItem.innerHTML),
      parseInt(secondItem.innerHTML),
      parseInt(thirdItem.innerHTML),
      parseInt(fourItem.innerHTML),
    ];

    let filteredCol = col.filter((num) => num);
    let len = filteredCol.length;
    let newCol = [];
    if (dir === "down") {
      newCol = Array(4 - len)
        .fill(null)
        .concat(filteredCol);
    }

    if (dir === "up") {
      newCol = [...filteredCol, ...Array(4 - len).fill(null)];
    }

    firstItem.innerHTML = newCol[0];
    secondItem.innerHTML = newCol[1];
    thirdItem.innerHTML = newCol[2];
    fourItem.innerHTML = newCol[3];
  }
};

const combineRow = (dir) => {
  for (let i = 0; i < 15; i++) {
    if (
      matrix[i].innerHTML &&
      matrix[i].innerHTML === matrix[i + 1].innerHTML
    ) {
      matrix[i].innerHTML = parseInt(matrix[i].innerHTML) * 2;
      score += parseInt(matrix[i].innerHTML);
      if (parseInt(getScoreFromLocal()) <= score) {
        scoreSetInLocal(score);
      }
      document.querySelector(".score-val").innerHTML = score;
      console.log(getScoreFromLocal())
      document.querySelector(".best-score .score-val").innerHTML =
  getScoreFromLocal() ;
      matrix[i + 1].innerHTML = null;
    }
  }
};

const combineCol = (dir) => {
  for (let i = 0; i < 12; i++) {
    if (
      matrix[i].innerHTML &&
      matrix[i].innerHTML === matrix[i + 4].innerHTML
    ) {
      matrix[i].innerHTML = parseInt(matrix[i].innerHTML) * 2;
      score += parseInt(matrix[i].innerHTML);
      if (parseInt(getScoreFromLocal()) <= score) {
        scoreSetInLocal(score);
      }
      document.querySelector(".score-val").innerHTML = score;
      document.querySelector(".best-score .score-val").innerHTML = getScoreFromLocal();
      matrix[i + 4].innerHTML = null;
    }
  }
};

document.addEventListener("keydown", (e) => {
  if (
    e.key !== "ArrowRight" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowUp" &&
    e.key !== "ArrowDown"
  )
    return;

  if (e.key === "ArrowRight") {
    moveX("right");
    combineRow("right");
    moveX("right");
    randomText();
  }

  if (e.key === "ArrowLeft") {
    moveX("left");
    combineRow("left");
    moveX("left");
    randomText();
  }

  if (e.key === "ArrowUp") {
    moveY("up");
    combineCol("up");
    moveY("up");
    randomText();
  }
  if (e.key === "ArrowDown") {
    moveY("down");
    combineCol("down");
    moveY("down");
    randomText();
  }
});

const gameReset  = () => {
  for  (let i = 0; i < 16; i++) {
    matrix[i].innerHTML = null;
  }
  
  score  = 0;
  document.querySelector(".score .score-val").innerHTML = score;
  

  let randomNum  = Math.floor(Math.random() * 16);
  let randomNum2  = Math.floor(Math.random() * 16);
  if (randomNum !== randomNum2) {
    let value = Math.random() < 0.9 ? 2 : 4;
    matrix[randomNum].innerHTML = value;
    matrix[randomNum2].innerHTML = value;
  } else {
    gameReset()
  }


}

document.querySelector('.reset-button').addEventListener('click',gameReset)

container.addEventListener("touchstart",(e) => {
   startX  = e.changedTouches[0].screenX;
   startY  = e.changedTouches[0].screenY;
})

container.addEventListener("touchend",(e) => {
   endX  = e.changedTouches[0].screenX;
   endY  = e.changedTouches[0].screenY;
   handleSwipe()
})

const handleSwipe = () => {
  let swipeDistanceX = endX - startX
  let swipeDistanceY = endY - startY
  let threshold = 30
  
  if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) ) {
    if (swipeDistanceX > threshold) {
    moveX("right");
    combineRow("right");
    moveX("right");
    randomText();
  }else if (swipeDistanceX < -threshold) {
    moveX("left");
    combineRow("left");
    moveX("left");
    randomText();
  }
  } else {
  if (swipeDistanceY > threshold) {
    moveY("down");
    combineCol("down");
    moveY("down");
    randomText();
  }else if (swipeDistanceY < -threshold) {
    moveY("up");
    combineCol("up");
    moveY("up");
    randomText();
  }
  }
  
  
}


