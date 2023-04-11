const gameBoard = (doc => {
  let boxes = [];

  const draw = () => {
    const body = doc.querySelector('body');
    const outerBox = doc.createElement('div');
    outerBox.classList.add('outer-box');

    let box;
    for (let row = 0; row < 3; row++) {
      boxes.push([]);
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

        boxes[row].push('');
        outerBox.appendChild(box);
      }
    }

    body.appendChild(outerBox);
  }

  return {
    boxes,
    draw,
  }
})(document);

const gameController = (doc => {
  let activePlayer;
  let winner;  

  const executeGame = () => {
    let boxes = document.querySelectorAll('.box');

    boxes.forEach(box => box.addEventListener('click', e => {
      box.textContent = 'O';
      gameBoard.boxes[box.dataset.row][box.dataset.column] = 'O';
    }));
  }

  return {
    executeGame,
  }
})(document);

gameBoard.draw();
gameController.executeGame();