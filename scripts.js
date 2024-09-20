const container = document.querySelector(".container");
let gameRow = 4;
let matrix = [];

const createGameBoard = () => {
  for (let i = 0; i < gameRow * gameRow; i++) {
    let gameDiv = document.createElement("div");
    gameDiv.innerHTML = 0;
    gameDiv.classList.add("box");
    container.appendChild(gameDiv);
    matrix.push(gameDiv);
  }

  randomText();
  randomText();
};

const setColor = () => {
  for (let i = 0;i<16; i ++){
    if(matrix[i].innerHTML  == 2){
      matrix[i].style.backgroundColor = "#eee4da";
    }else if(matrix[i].innerHTML == 4) {
      matrix[i].style.backgroundColor = "#ede0c8";

    }
    else if(matrix[i].innerHTML == 8) {
      matrix[i].style.backgroundColor = "#f2b179";

    }
    else if(matrix[i].innerHTML == 16) {
      matrix[i].style.backgroundColor = "#f59563";

    }
    else if(matrix[i].innerHTML == 32) {
      matrix[i].style.backgroundColor = "#f67c5f";

    }
    else if(matrix[i].innerHTML == 64) {
      matrix[i].style.backgroundColor = "#f65e3b";

    }
    else if(matrix[i].innerHTML == 128) {
      matrix[i].style.backgroundColor = "#edcf72";

    }
    else if(matrix[i].innerHTML == 256) {
      matrix[i].style.backgroundColor = "#edcc61";

    }
    else if(matrix[i].innerHTML == 512) {
      matrix[i].style.backgroundColor = "#edc850"

    }
    else if(matrix[i].innerHTML == 1024) {
      matrix[i].style.backgroundColor = "#edc53f"

    }
    else if(matrix[i].innerHTML == 2048) {
      matrix[i].style.backgroundColor = "#edc22e"

    } else {
      matrix[i].style.backgroundColor = "#bbb6b0"
    }


  }
}

const generateRandomNum = () => Math.floor(Math.random() * matrix.length);
const randomText = () => {
  let randomNum = generateRandomNum();
  if (matrix[randomNum].innerHTML == 0) {
    let value = Math.random () < 0.9 ? 2 : 4;
    matrix[randomNum].innerHTML = value;
    setColor()
  } else {
    randomText();
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
          .fill(0)
          .concat(filteredRow);
      }
      if (dir === "left") {
        newRow = [...filteredRow, ...Array(4 - len).fill(0)];
      }

      matrix[i].innerHTML = newRow[0];
      matrix[i + 1].innerHTML = newRow[1];
      matrix[i + 2].innerHTML = newRow[2];
      matrix[i + 3].innerHTML = newRow[3];
    }
  }
};


const moveY  = (dir) => {
  
}


const combineRow = (dir) => {
  for (let i = 0; i < 15; i++) {
    if (
      matrix[i].innerHTML !== 0 &&
      matrix[i].innerHTML === matrix[i + 1].innerHTML
    ) {
      if (dir === "right")
        matrix[i + 1].innerHTML = parseInt(matrix[i].innerHTML) * 2;
      if (dir === "left")
        matrix[i].innerHTML = parseInt(matrix[i].innerHTML) * 2;
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
});
