class Ship {
  #hits = 0;

  #length;

  constructor(length) {
    this.#length = length;
  }

  hit() {
    this.#hits += 1;
  }

  isSunk() {
    if (this.#hits >= this.length) {
      return true;
    }
    return false;
  }

  get hits() {
    return this.#hits;
  }

  get length() {
    return this.#length;
  }
}

export default Ship;
