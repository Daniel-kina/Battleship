import Ship from './battleshipModel';
import Player from './playerModel';
import {
  ViewCells,
  bindAttackListener,
  UpdateCells,
  viewPlayerTurn,
  viewEndgame,
  bindPlacementListener,
} from './battleshipView';

class GameController {
  #player;

  #opponent;

  #activePlayer;

  #gameState = 'PLACING';

  #shipsToPlace = [5, 4, 3, 3, 2];

  createPlayers(playerName, opponentName, opponentType) {
    this.#player = new Player(playerName, 'player');
    this.#opponent = new Player(opponentName, opponentType);
    this.#activePlayer = this.#player;
  }

  startGame(playerName, opponentName, opponentType) {
    this.createPlayers(playerName, opponentName, opponentType);
    viewPlayerTurn(this.#activePlayer);
    ViewCells();
    bindAttackListener(this.playRound.bind(this));

    bindPlacementListener(this.handlePlacement.bind(this));
  }

  handlePlacement(X, Y) {
    if (this.#gameState !== 'PLACING') return;

    const currentShipLength = this.#shipsToPlace[0];
    const ship = new Ship(currentShipLength);

    // Try to place it (defaulting to horizontal for now)
    const success = this.#player.board.addShip(X, Y, ship, false);

    if (success) {
      // Remove that ship from the to-do list
      this.#shipsToPlace.shift();

      // Update the screen!
      UpdateCells(this.#player.board.board, this.#opponent.board.board);

      // If the list is empty, start the game!
      if (this.#shipsToPlace.length === 0) {
        this.#gameState = 'PLAYING';
        console.log('All ships placed! Let the battle begin!');
      }
    }
  }

  playRound(X, Y, user) {
    if (this.#gameState === 'PLACING') return;

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
