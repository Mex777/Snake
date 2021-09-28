export default class Queue {
  #arr = [];
  #start = 0;

  push(el) {
    this.#arr.push(el);
  }

  pop() {
    return this.#arr.shift();
  }

  getSize() {
    return this.#arr.length;
  }

  getFront() {
    return this.#arr[0];
  }
}
