const boardSize = 18;
const dirI = [1, 0, -1, 0];
const dirJ = [0, 1, 0, -1];
const snakeRow = [];
const snakeCol = [];
const inCell = Array.from(Array(boardSize), () => new Array(boardSize));
let headRow = boardSize / 2;
let headCol = boardSize / 2;
let snakeStartRow = 0;
let snakeStartCol = 0;
let gameStarted = 0;
let highScore = 0;
let dirType = -1;

/**
 * Prints the board on the screen
 */
function drawtable() {
  for (let row = 0; row < boardSize; ++row) {
    for (let col = 0; col < boardSize; ++col) {
      const el = document.createElement('div');
      el.style.gridRowStart = row + 1;
      el.style.gridColumnStart = col + 1;
      el.className = 'cell';
      el.id = row + '-' + col;
      el.style.backgroundColor = getColor(row, col);

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

  // starts the game
  if (!gameStarted && dirType != -1) {
    genRandomApple();
    gameStarted = setInterval(updateMove(), 100);
  }
});

/**
 * Moves the snake on the screen  
 */
function updateMove() {
  if (headRow + dirI[dirType] >= 0 && headRow + dirI[dirType] < boardSize &&
      headCol + dirJ[dirType] >= 0 && headCol + dirJ[dirType] < boardSize &&
      inCell[headRow + dirI[dirType]][headCol + dirJ[dirType]] != 'snake') {
    headRow += dirI[dirType];
    headCol += dirJ[dirType];
    snakeRow.push(headRow);
    snakeCol.push(headCol);
    updateTable(headRow, headCol);
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
  document.getElementById(snakeRow[snakeStartRow] + '-' + snakeCol[snakeStartCol])
      .style.backgroundColor = getColor(snakeRow[snakeStartRow], snakeCol[snakeStartCol]);

  if (inCell[currI][currJ] == 'apple') {
    genRandomApple();
    document.getElementById('currScore')
        .innerHTML = 'Current score: ' + (snakeRow.length - snakeStartRow - 1);
  } else if (snakeStartRow < snakeRow.length - 1) {
    inCell[snakeRow[snakeStartRow]][snakeCol[snakeStartCol]] = 'empty';
    ++snakeStartRow;
    ++snakeStartCol;
  }

  inCell[currI][currJ] = 'snake';
  document.getElementById(currI + '-' + currJ)
      .style.backgroundColor = '#c26f27';
}


/**
 * Generates a random apple on the board 
 */
function genRandomApple() {
  let randI = Math.floor(Math.random() * boardSize);
  let randJ = Math.floor(Math.random() * boardSize);

  while (inCell[randI][randJ] == 'snake') {
    randI = Math.floor(Math.random() * boardSize);
    randJ = Math.floor(Math.random() * boardSize);
  }

  inCell[randI][randJ] = 'apple';
  document.getElementById(randI + '-' + randJ)
      .style.backgroundColor = 'red';
}

/**
 * Resets the whole game, both on the screen and in the variables. 
 */
function endGame() {
  clearInterval(gameStarted);
  if (snakeRow.length - snakeStartRow > highScore) {
    highScore = snakeRow.length - snakeStartRow - 1;
  }

  // resets the values to the standard way
  gameStarted = 0;
  headRow = boardSize / 2;
  headCol = boardSize / 2;
  snakeStartRow = 0;
  snakeStartCol = 0;
  snakeRow.length = 0;
  snakeCol.length = 0;
  dirType = -1;

  // clears the table on the screen and in the logic
  for (let row = 0; row < boardSize; ++row) {
    for (let col = 0; col < boardSize; ++col) {
      inCell[row][col] = 'empty';
      document.getElementById(row + '-' + col)
          .style.backgroundColor = getColor(row, col);
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
 * @param {number} row the current row
 * @param {number} col the current column
 * @return {string} the wanted color for the current cell
 */
function getColor(row, col) {
  if ((row + col) % 2 == 0) {
    return '#32a852';
  }
  return '#4ef27a';
}
