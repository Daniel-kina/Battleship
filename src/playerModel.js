import Gameboard from './battleshipGameboard';

class Player {
  #board = new Gameboard();

  #name;

  #type;

  constructor(name, type) {
    this.#name = name;
    this.#type = type;
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }

  get board() {
    return this.#board;
  }
}

export default Player;
