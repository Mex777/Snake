import Table from './tableClass.js';
import Snake from './snakeClass.js';

const boardSize = 20;
let gameStarted = 0;
let highScore = 0;
let table;
let snake;
let updateScreen;
let onScreen = 0;

function start() {
  table = new Table(boardSize);
  snake = new Snake(boardSize / 2, boardSize / 2, 'black');
  document.getElementById('currScore').innerHTML = 'Current score: 0';
  if (!onScreen) {
    table.genTable();
    onScreen = 1;
  }
  table.genRandomApple();
}

/**
 * Sets the direction of the snake according to the keys pressed by the user.
 */
document.addEventListener('keydown', function (event) {
  if (event.key == 'ArrowDown') {
    snake.setDirection(0);
  } else if (event.key == 'ArrowRight') {
    snake.setDirection(1);
  } else if (event.key == 'ArrowUp') {
    snake.setDirection(2);
  } else if (event.key == 'ArrowLeft') {
    snake.setDirection(3);
  }

  if (!gameStarted) {
    gameStarted = 1;
    updateScreen = setInterval(move, 150);
  }
});

/**
 * Moves the snake on the screen
 */
function move() {
  const snakeCoord = snake.move();

  if (
    table.inTable(snakeCoord[0], snakeCoord[1]) &&
    table.occupiedCell(snakeCoord[0], snakeCoord[1]) != 1
  ) {
    document.getElementById(
      snakeCoord[0] + '-' + snakeCoord[1]
    ).style.backgroundColor = snake.color();

    if (table.occupiedCell(snakeCoord[0], snakeCoord[1]) != 2) {
      const tail = snake.pop();
      table.setCell(tail[0], tail[1], 0);
      document.getElementById(tail[0] + '-' + tail[1]).style.backgroundColor =
        table.getColor(tail[0], tail[1]);
    } else {
      table.genRandomApple();
    }

    table.setCell(snakeCoord[0], snakeCoord[1], 1);
  } else {
    endGame();
  }

  document.getElementById('currScore').innerHTML =
    'Current score: ' + (snake.getSize() - 1);
}

function updateHighScore(score) {
  if (score > highScore) {
    document.getElementById('highScore').innerHTML = 'Highscore: ' + score;
    highScore = score;
  }
}

function endGame() {
  gameStarted = 0;
  clearInterval(updateScreen);
  updateHighScore(snake.getSize() - 1);
  table.clear();
  start();
}

start();
