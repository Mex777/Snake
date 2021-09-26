const size = 18;
let headI = size / 2;
let headJ = size / 2;
const dirI = [1, 0, -1, 0];
const dirJ = [0, 1, 0, -1];
let dirType = -1;
const snakeI = [];
const snakeJ = [];
let startI = 0;
let startJ = 0;
let gameStarted = 0;
let highScore = 0;
const isUsed = Array.from(Array(size), () => new Array(size));

/**
 * Prints the board on the screen
 */
function drawtable() {
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      const el = document.createElement('div');
      el.style.gridRowStart = i + 1;
      el.style.gridColumnStart = j + 1;
      el.className = 'cell';
      el.id = i + '-' + j;
      el.style.backgroundColor = getColor(i, j);

      document.getElementById('grid').appendChild(el);
    }
  }
}

drawtable();

/**
 * Moves the snake according to the arrows pressed by the user
 */
document.addEventListener('keydown', function(event) {
  if (event.key == 'ArrowDown' && dirType != 2) {
    dirType = 0;
  }

  if (event.key == 'ArrowRight' && dirType != 3) {
    dirType = 1;
  }

  if (event.key == 'ArrowUp' && dirType != 0) {
    dirType = 2;
  }

  if (event.key == 'ArrowLeft' && dirType != 1) {
    dirType = 3;
  }

  if (!gameStarted && dirType != -1) {
    startGame();
  }
});

/**
 * 
 */
function startGame() {
  genRandomApple();
  gameStarted = setInterval(updateMove, 150);
}

/**
 * 
 */
function updateMove() {
  if (headI + dirI[dirType] >= 0 && headI + dirI[dirType] < size &&
      headJ + dirJ[dirType] >= 0 && headJ + dirJ[dirType] < size &&
      isUsed[headI + dirI[dirType]][headJ + dirJ[dirType]] != 'snake') {
    headI += dirI[dirType];
    headJ += dirJ[dirType];
    snakeI.push(headI);
    snakeJ.push(headJ);
    updateTable(headI, headJ);
  } else {
    endGame();
  }
}

/**
 * Moves the snake on the screen
 * @param {number} currI the row of the head of the snake
 * @param {number} currJ the column of the head of the snake
 */
function updateTable(currI, currJ) {
  document.getElementById(snakeI[startI] + '-' + snakeJ[startJ])
      .style.backgroundColor = getColor(snakeI[startI], snakeJ[startJ]);

  if (isUsed[currI][currJ] == 'apple') {
    genRandomApple();
    document.getElementById('currScore')
        .innerHTML = 'Current score: ' + (snakeI.length - startI - 1);
  } else if (startI < snakeI.length - 1) {
    isUsed[snakeI[startI]][snakeJ[startJ]] = 'empty';
    ++startI;
    ++startJ;
  }

  isUsed[currI][currJ] = 'snake';
  document.getElementById(currI + '-' + currJ)
      .style.backgroundColor = '#c26f27';
}


/**
 * Generates a random apple on the board 
 */
function genRandomApple() {
  let randI = Math.floor(Math.random() * size);
  let randJ = Math.floor(Math.random() * size);

  while (isUsed[randI][randJ] == 'snake') {
    randI = Math.floor(Math.random() * size);
    randJ = Math.floor(Math.random() * size);
  }

  isUsed[randI][randJ] = 'apple';
  document.getElementById(randI + '-' + randJ).style.backgroundColor = 'red';
}

/**
 * Resets the whole game, both on the screen and in the variables. 
 */
function endGame() {
  clearInterval(gameStarted);
  if (snakeI.length - startI > highScore) {
    highScore = snakeI.length - startI - 1;
  }

  // resets the values to the standard way
  gameStarted = 0;
  headI = size / 2;
  headJ = size / 2;
  startI = 0;
  startJ = 0;
  snakeI.length = 0;
  snakeJ.length = 0;

  // clears the table on the screen and in the logic
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      isUsed[i][j] = 'empty';
      document.getElementById(i + '-' + j)
          .style.backgroundColor = getColor(i, j);
    }
  }

  // updates the current score and the high score
  document.getElementById('highScore')
      .innerHTML = 'Highscore: ' + highScore;
  document.getElementById('currScore')
      .innerHTML = 'Current score: 0';
}

/**
 * Returns the wanted color for the given row and color
 * @param {number} i the current row
 * @param {number} j the current column
 * @return {string} the wanted color for the current cell
 */
function getColor(i, j) {
  if ((i + j) % 2 == 0) {
    return '#32a852';
  }
  return '#4ef27a';
}
