export default class Table {
  #size;
  #isUsed;

  constructor(size) {
    this.#size = size;
    this.#isUsed = Array.from(Array(size), () => new Array(size));
  }

  getSize() {
    return this.#size;
  }

  getColor(row, col) {
    if ((row + col) % 2 == 0) {
      return '#32a852';
    }
    return '#4ef27a';
  }

  genTable() {
    for (let row = 0; row < this.#size; ++row) {
      for (let col = 0; col < this.#size; ++col) {
        const el = document.createElement('div');
        el.className = 'cell';
        el.id = row + '-' + col;

        el.style.backgroundColor = this.getColor(row, col);
        el.style.gridRowStart = row + 1;
        el.style.gridColumnStart = col + 1;

        document.getElementById('grid').appendChild(el);
        this.#isUsed[row][col] = 0;
      }
    }
  }

  genRandomApple() {
    let appleRow = Math.floor(Math.random() * this.#size);
    let appleCol = Math.floor(Math.random() * this.#size);

    while (this.#isUsed[appleRow][appleCol]) {
      appleRow = Math.floor(Math.random() * this.#size);
      appleCol = Math.floor(Math.random() * this.#size);
    }

    this.setCell(appleRow, appleCol, 2);
    document.getElementById(appleRow + '-' + appleCol).style.backgroundColor =
      'red';
  }

  occupiedCell(row, col) {
    return this.#isUsed[row][col];
  }

  setCell(row, col, val) {
    this.#isUsed[row][col] = val;
  }

  inTable(row, col) {
    return row >= 0 && row < this.#size && col >= 0 && col < this.#size;
  }

  clear() {
    for (let row = 0; row < this.#size; ++row) {
      for (let col = 0; col < this.#size; ++col) {
        document.getElementById(row + '-' + col).style.backgroundColor =
          this.getColor(row, col);
        this.setCell(row, col, 0);
      }
    }
  }
}
