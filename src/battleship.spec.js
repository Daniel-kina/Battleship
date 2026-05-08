import Ship from './battleshipModel';
import Gameboard from './battleshipGameboard';

describe('Battleship object testing', () => {
  test('Ship with 3 length is sunk after 3 hits', () => {
    const battleship = new Ship(3);
    battleship.hit();
    battleship.hit();
    battleship.hit();
    expect(battleship.isSunk()).toBe(true);
  });

  test('Ship with 3 length is NOT sunk after 2 hits', () => {
    const battleship = new Ship(3);
    battleship.hit();
    battleship.hit();
    expect(battleship.isSunk()).toBe(false);
  });
});

describe('Gameboard testing', () => {
  test('adding ship of length 3 that stay inside of bounds', () => {
    const ship = new Ship(3);
    const board = new Gameboard();
    expect(board.addShip(5, 5, ship, true)).toBe(true);
  });

  test('adding ship of length 3 that goes outside of Y bounds', () => {
    const ship = new Ship(3);
    const board = new Gameboard();
    expect(board.addShip(8, 10, ship, true)).toBe(false);
  });

  test('adding ship of length 3 that goes outside of X bounds', () => {
    const ship = new Ship(3);
    const board = new Gameboard();
    expect(board.addShip(10, 8, ship, false)).toBe(false);
  });

  test('adding ship of length 3 right next to other ship with length 3', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    const board = new Gameboard();
    board.addShip(5, 5, ship1, true);
    expect(board.addShip(5, 8, ship2, true)).toBe(false);
  });

  test('ships cant overlap', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    const board = new Gameboard();
    board.addShip(5, 5, ship1, true);
    expect(board.addShip(5, 5, ship2, true)).toBe(false);
  });

  test('ships can receive attacks', () => {
    const ship1 = new Ship(3);
    const board = new Gameboard();
    board.addShip(5, 5, ship1, false);
    expect(board.receiveAttack(6, 5)).toBe(true);
  });

  test('attack empty area', () => {
    const ship1 = new Ship(3);
    const board = new Gameboard();
    board.addShip(5, 5, ship1, false);
    expect(board.receiveAttack(0, 0)).toBe(false);
  });
});
