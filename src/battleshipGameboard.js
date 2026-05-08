import Ship from './battleshipModel';

class Gameboard {
  #ships = [];

  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
  }

  addShip(X, Y, ship, isVertical = false) {
    if (!this.checkShipSpace(X, Y, ship.length, isVertical)) {
      return false;
    }

    this.#ships.push(ship); // Has to BE edited to make possitioning your ship elsewhere possible

    for (let i = 0; i < ship.length; i += 1) {
      const targetX = isVertical ? X : X + i;
      const targetY = isVertical ? Y + i : Y;

      this.board[targetX][targetY] = ship;
    }
    return true;
  }

  checkShipSpace(X, Y, length, isVertical) {
    const endShipX = isVertical ? X : X + length - 1;
    const endShipY = isVertical ? Y + length - 1 : Y;

    if (X < 0 || Y < 0 || endShipX > 9 || endShipY > 9) {
      return false;
    }

    const startX = Math.max(0, X - 1);
    const endX = Math.min(9, X + length);
    const startY = Math.max(0, Y - 1);
    const endY = Math.min(9, Y + 1);

    for (let yPos = startY; yPos <= endY; yPos += 1) {
      for (let xPos = startX; xPos <= endX; xPos += 1) {
        if (this.board[xPos][yPos] !== 0) {
          return false;
        }
      }
    }

    return true;
  }

  receiveAttack(X, Y) {
    const target = this.board[X][Y];

    if (target === 'Hit' || target === 'Miss') {
      return 'Already Hit';
    }

    if (target instanceof Ship) {
      target.hit();
      this.board[X][Y] = 'Hit';
      return 'Hit';
    }

    if (target === 0) {
      this.board[X][Y] = 'Miss';
      return 'Miss';
    }

    return 'Broken';
  }

  checkIfAllShipsSunken() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
