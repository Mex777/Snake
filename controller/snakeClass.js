import Queue from '../controller/queueClass.js';

export default class Snake {
  #headRow;
  #headCol;
  #color;
  #bodyRow = new Queue();
  #bodyCol = new Queue();
  #dirRow = [1, 0, -1, 0, 0];
  #dirCol = [0, 1, 0, -1, 0];
  #direction = 4;

  constructor(headRow, headCol, color) {
    this.#headCol = headCol;
    this.#headRow = headRow;
    this.#color = color;

    this.#bodyRow.push(headCol);
    this.#bodyCol.push(headRow);
  }

  setDirection(direction) {
    if (this.#direction == 4 || this.#direction % 2 != direction % 2) {
      this.#direction = direction;
    }
  }

  move() {
    this.#headRow += this.#dirRow[this.#direction];
    this.#headCol += this.#dirCol[this.#direction];
    this.#bodyRow.push(this.#headRow);
    this.#bodyCol.push(this.#headCol);

    return [this.#headRow, this.#headCol];
  }

  pop() {
    return [this.#bodyRow.pop(), this.#bodyCol.pop()];
  }

  color() {
    return this.#color;
  }

  getSize() {
    return this.#bodyCol.getSize();
  }
}
