import createCells from './createElements';

const playerTurnElem = document.querySelector('.player-turn');

const playerArea = document.querySelector('#player');
const opponentArea = document.querySelector('#opponent');

const playerBoardElem = playerArea.querySelector('.game-board');
const opponentBoardElem = opponentArea.querySelector('.game-board');

function ViewCells() {
  const cellsPlayer = createCells();
  const cellsOpponent = createCells();
  cellsPlayer.forEach((element) => {
    playerBoardElem.appendChild(element);
  });

  cellsOpponent.forEach((element) => {
    opponentBoardElem.appendChild(element);
  });
}

function UpdateCells(playerBoard, opponentBoard) {
  for (let i = 0; i < playerBoard.length; i += 1) {
    for (let j = 0; j < playerBoard.length; j += 1) {
      if (playerBoard[i][j] === 'Hit') {
        const cell = playerBoardElem.querySelector(
          `[data-x="${i}"][data-y="${j}"]`,
        );

        cell.classList.add('ship-hit');
      } else if (playerBoard[i][j] === 'Miss') {
        const cell = playerBoardElem.querySelector(
          `[data-x="${i}"][data-y="${j}"]`,
        );

        cell.classList.add('miss');
      }

      if (opponentBoard[i][j] === 'Hit') {
        const cell = opponentBoardElem.querySelector(
          `[data-x="${i}"][data-y="${j}"]`,
        );

        cell.classList.add('ship-hit');
      } else if (opponentBoard[i][j] === 'Miss') {
        const cell = opponentBoardElem.querySelector(
          `[data-x="${i}"][data-y="${j}"]`,
        );

        cell.classList.add('miss');
      } else if (
        typeof playerBoard[i][j] === 'object' &&
        playerBoard[i][j] !== null
      ) {
        // ✅ NEW: If it's a ship object, color it blue!
        const cell = playerBoardElem.querySelector(
          `[data-x="${i}"][data-y="${j}"]`,
        );
        cell.classList.add('ship');
      }
    }
  }
}

function bindAttackListener(handlerFunction) {
  opponentBoardElem.addEventListener('click', (event) => {
    if (!event.target.classList.contains('cell')) {
      return;
    }

    const X = parseInt(event.target.dataset.x, 10);
    const Y = parseInt(event.target.dataset.y, 10);
    handlerFunction(X, Y, 'p2');
  });

  playerBoardElem.addEventListener('click', (event) => {
    if (!event.target.classList.contains('cell')) {
      return;
    }

    const X = parseInt(event.target.dataset.x, 10);
    const Y = parseInt(event.target.dataset.y, 10);
    handlerFunction(X, Y, 'p1');
  });
}

function bindPlacementListener(handlerFunction) {
  playerBoardElem.addEventListener('click', (event) => {
    if (!event.target.classList.contains('cell')) {
      return;
    }

    const X = parseInt(event.target.dataset.x, 10);
    const Y = parseInt(event.target.dataset.y, 10);

    handlerFunction(X, Y);
  });
}

function viewPlayerTurn(player) {
  playerTurnElem.textContent = `It's ${player.name}'s turn!`;
}

function viewEndgame(player) {
  playerTurnElem.textContent = `${player.name} WON!!!!`;
}

export {
  ViewCells,
  bindAttackListener,
  UpdateCells,
  viewPlayerTurn,
  viewEndgame,
  bindPlacementListener,
};
