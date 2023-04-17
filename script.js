const gameBoard = (() => {
  let boxes;

  const populateBoxes = () => {
    boxes = [];
    for (let row = 0; row < 3; row++) {
      boxes.push([]);
      for (let column = 0; column < 3; column++) {
        boxes[row].push('');
      }
    }
  }

  const getSymbol = (row, column) => boxes[row][column];

  const getRow = row => {
    let line = boxes[row];
    let coordinates = [];

    for (let column = 0; column < boxes.length; column++) {
      coordinates.push([row, column]);
    }

    return { line, coordinates };
  }

  const getColumn = column => {
    let line = [];
    let coordinates = [];

    for (let row = 0; row < boxes.length; row++) {
      line.push(boxes[row][column]);
      coordinates.push([row, column]);
    }

    return { line, coordinates };
  }

  const getDiagonalLeft = () => {
    let line = [];
    let coordinates = [];

    // Get boxes [0,0], [1,1], [2,2]
    for (let row = 0; row < boxes.length; row++) {
      line.push(boxes[row][row]);
      coordinates.push([row, row]);
    }

    return { line, coordinates };
  }

  const getDiagonalRight = () => {
    let line = [];
    let coordinates = [];
    let column;

    // Get boxes  [0,2], [1,1], [2,0]
    for (let row = 0; row < boxes.length; row++) {
      column = boxes.length - 1 - row;
      line.push(boxes[row][column]);
      coordinates.push([row, column]);
    }

    return { line, coordinates };
  }

  const setSymbol = (row, column, symbol) => {
    boxes[row][column] = symbol;
  }

  return {
    populateBoxes,
    getSymbol,
    setSymbol,
    getRow,
    getColumn,
    getDiagonalLeft,
    getDiagonalRight,
  }
})();

const displayController = (doc => {
  const updateActivePlayer = activePlayer => {
    const text = doc.querySelector('.player-turn');
    text.innerText = `Player ${activePlayer.symbol}'s Turn`;
  }

  const drawBoard = () => {
    const tempOuterBox = doc.querySelector('.outer-box');
    if (tempOuterBox !== null) {
      tempOuterBox.remove();
    }

    const body = doc.querySelector('body');
    const outerBox = doc.createElement('div');
    outerBox.classList.add('outer-box');

    let box;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        box = doc.createElement('div');
        box.classList.add('box');

        box.dataset.row = row;
        box.dataset.column = column;

        if (row === 1) {
          box.classList.add('row-2');
        }

        if (column === 1) {
          box.classList.add('col-2');
        }

        outerBox.appendChild(box);
      }
    }

    body.appendChild(outerBox);
  }

  const drawSymbol = (symbol, target) => {
    target.innerText = symbol;
  }

  const shadeWinner = coordinates => {
    let box;
    coordinates.forEach(coordinate => {
      box = doc.querySelector(`[data-row="${coordinate[0]}"][data-column="${coordinate[1]}"]`);
      box.classList.add('winner');
    });
  }

  const endMessage = winner => {
    const message = doc.querySelector('#end-message');
    // const endContainer = doc.querySelector('#end-game-container');
    let endCondition;

    if (winner !== 'none') {
      endCondition = `Player ${winner} wins!`;
    }
    else {
      endCondition = "It's a Draw!";
    }

    message.innerText = `Game Over! ${endCondition}`;
    // endContainer.style.display = 'flex';

    toggleEndMessage();
    toggleActivePlayer();
  }

  const toggleActivePlayer = () => {
    const playerTurn = doc.querySelector('.player-turn');
    playerTurn.style.display = window.getComputedStyle(playerTurn).getPropertyValue('display') === 'none' ? 'block' : 'none';
  }

  const toggleEndMessage = () => {
    const endContainer = doc.querySelector('#end-game-container');
    endContainer.style.display = window.getComputedStyle(endContainer).getPropertyValue('display') === 'none' ? 'flex' : 'none';
  }

  return {
    drawBoard,
    drawSymbol,
    shadeWinner,
    updateActivePlayer,
    endMessage,
    toggleActivePlayer,
    toggleEndMessage,
  }
})(document);

const player = (symbol) => {
  return { symbol }
};

const gameController = (doc => {
  let player1;
  let player2;
  let activePlayer;
  let winningLine;

  const swapActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    displayController.updateActivePlayer(activePlayer);
  }

  // Returns array of rows and columns
  const getWinningLine = () => {
    let row;
    let column;

    const allEqual = (arr, symbol) => arr.every(val => val === symbol);

    // Check rows and columns
    for (let line = 0; line < 3; line++) {
      row = gameBoard.getRow(line);
      column = gameBoard.getColumn(line);

      if (allEqual(row.line, activePlayer.symbol)) {
        return row;
      }

      if (allEqual(column.line, activePlayer.symbol)) {
        return column;
      }
    }

    // Check diagonals
    for (let diagonal of [gameBoard.getDiagonalLeft(), gameBoard.getDiagonalRight()]) {
      if (allEqual(diagonal.line, activePlayer.symbol)) {
        return diagonal;
      }
    }
  }

  const isGameboardFilled = () => {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (gameBoard.getSymbol(row, column) === '') {
          return false;
        }
      }
    }
    return true;
  }

  const gameOver = winner => {
    displayController.endMessage(winner);
    // to-do: disable tic tac toe boxes event listener
  }

  const playRound = box => {
    const row = box.dataset.row;
    const column = box.dataset.column;

    if (box.innerText === '' && gameBoard.getSymbol(row, column) === '') {
      gameBoard.setSymbol(row, column, activePlayer.symbol);
      displayController.drawSymbol(activePlayer.symbol, box);

      return getWinningLine();
    }
  }

  const resetGame = () => {
    displayController.toggleEndMessage();
    displayController.toggleActivePlayer();

    const resetButton = doc.querySelector('#reset-btn');
    resetButton.removeEventListener('click', resetGame);

    executeGame();
  }

  const executeGame = () => {
    player1 = player('X');
    player2 = player('O');
    activePlayer = player1;
    winningLine = [];

    gameBoard.populateBoxes();
    displayController.drawBoard();
    displayController.updateActivePlayer(activePlayer);

    const resetButton = doc.querySelector('#reset-btn');
    resetButton.addEventListener('click', resetGame);

    let boxes = doc.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('click', event => {
      winningLine = playRound(event.target);

      if (winningLine !== undefined) {
        gameOver(activePlayer.symbol);
        displayController.shadeWinner(winningLine.coordinates);
      }
      else if (winningLine === undefined && isGameboardFilled()) {
        gameOver('none');
      }
      else {
        swapActivePlayer();
      }
    }));
  }

  return {
    executeGame,
    winningLine,
  }
})(document);

gameController.executeGame();