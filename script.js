const gameBoard = (doc => {
  let gameBoxes = [];

  const draw = () => {
    const body = doc.querySelector('body');
    const outerBox = doc.createElement('div');
    outerBox.classList.add('outer-box');

    let box;
    for (let row = 0; row < 3; row++) {
      gameBoxes.push([]);
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

        gameBoxes[row].push('');
        outerBox.appendChild(box);
      }
    }

    body.appendChild(outerBox);
  }

  return {
    gameBoxes,
    draw,
  }
})(document);

gameBoard.draw();