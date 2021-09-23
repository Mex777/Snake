const size = 20;
let headI = size / 2;
let headJ = size / 2;
const dirI = [1, 0, -1, 0];
const dirJ = [0, 1, 0, -1];
let dirType;
let gameStarted = 0;

/**
 * 
 */
function drawtable() {
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      const el = document.createElement('div');
      el.style.gridRowStart = i + 1;
      el.style.gridColumnStart = j + 1;
      el.className = 'cell';
      el.id = '' + i + j;
      el.style.backgroundColor = getColor(i, j);

      document.getElementById('grid').appendChild(el);
    }
  }
}

/**
 * 
 */
document.addEventListener('keydown', function(event) {
  if (event.key == 'ArrowLeft') {
    dirType = 3;
    console.log(1);
  }

  if (event.key == 'ArrowUp') {
    dirType = 2;
    console.log(2);
  }

  if (event.key == 'ArrowRight') {
    dirType = 1;
    console.log(3);
  }

  if (event.key == 'ArrowDown') {
    console.log(4);
    dirType = 0;
  }

  if (!gameStarted) {
    gameStarted = 1;
    startGame();
  }
});

/**
 * 
 */
setInterval(function startGame() {
  updateTable(0, 0, headI, headJ);
  // while (gameStarted) {
    if (headI + dirI[dirType] >= 0 && headI + dirI[dirType] < size &&
        headJ + dirJ[dirType] >= 0 && headJ + dirJ[dirType] < size) {
      updateTable(headI, headJ, headI + dirI[dirType], headJ + dirJ[dirType]);
      headI += dirI[dirType];
      headJ += dirJ[dirType];
    }
      // gameStarted = false;
  // }
}, 500);

/**
 *  
 */
function updateTable(oldI, oldJ, currI, currJ) {
  document.getElementById('' + oldI + oldJ).style.backgroundColor =
      getColor(oldI, oldJ);
  document.getElementById('' + currI + currJ).style.backgroundColor = 'red';
}

/**
 * 
 * @param {*} i 
 * @param {*} j 
 * @returns 
 */
function getColor(i, j) {
  if ((i + j) % 2 == 0) {
    return '#32a852';
  }
  return '#4ef27a';
}

drawtable();


