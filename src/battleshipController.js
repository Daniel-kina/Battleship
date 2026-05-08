import Ship from './battleshipModel';
import Player from './playerModel';
import {
  ViewCells,
  bindAttackListener,
  UpdateCells,
  viewPlayerTurn,
  viewEndgame,
} from './battleshipView';

class GameController {
  #player;

  #opponent;

  #activePlayer;

  #gameState = 'PLACING';

  createPlayers(playerName, opponentName, opponentType) {
    this.#player = new Player(playerName, 'player');
    this.#opponent = new Player(opponentName, opponentType);
    this.#activePlayer = this.#player;
  }

  startGame(playerName, opponentName, opponentType) {
    this.createPlayers(playerName, opponentName, opponentType);
    this.setupGame();
    viewPlayerTurn(this.#activePlayer);
    ViewCells();
    bindAttackListener(this.playRound.bind(this));
  }

  setupGame() {
    const playerBoard = this.#player.board;
    const opponentBoard = this.#opponent.board;
    const ship = new Ship(3);
    const ship2 = new Ship(3);

    playerBoard.addShip(5, 5, ship, false);
    opponentBoard.addShip(5, 5, ship2, false);
  }

  playRound(X, Y, user) {
    if (this.#activePlayer === this.#player) {
      if (user === 'p1') {
        return;
      }
    }

    if (this.#activePlayer === this.#opponent) {
      if (user === 'p2') {
        return;
      }
    }

    const targetBoard =
      this.#activePlayer === this.#player
        ? this.#opponent.board
        : this.#player.board;

    const hitSuccess = targetBoard.receiveAttack(X, Y);
    if (hitSuccess === 'Already Hit') {
      return;
    }

    UpdateCells(this.#player.board.board, this.#opponent.board.board);

    if (targetBoard.checkIfAllShipsSunken()) {
      this.endGame();
    }

    if (hitSuccess === 'Miss' || hitSuccess === 'Broken') {
      this.#switchTurn();
    }
    viewPlayerTurn(this.#activePlayer);

    if (this.#activePlayer.type === 'computer') {
      this.#executeComputerTurn();
    }
  }

  #switchTurn() {
    this.#activePlayer =
      this.#activePlayer === this.#player ? this.#opponent : this.#player;
  }

  #executeComputerTurn() {
    const XGuess = Math.floor(Math.random() * 10);
    const YGuess = Math.floor(Math.random() * 10);

    setTimeout(() => this.playRound(XGuess, YGuess), 1000);
  }

  endGame() {
    viewEndgame(this.#activePlayer);
  }
}

export default GameController;
