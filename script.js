const gameBoard = (() => {
  let boxes = [];

  const populateBoxes = () => {
    for (let row = 0; row < 3; row++) {
      boxes.push([]);
      for (let column = 0; column < 3; column++) {
        boxes[row].push('');
      }
    }
  }

  const getSymbol = (row, column) => boxes[row][column];

  const setSymbol = (row, column, symbol) => {
    boxes[row][column] = symbol;
  }

  return {
    populateBoxes,
    getSymbol,
    setSymbol,
  }
})();

const displayController = (doc => {
  const drawBoard = () => {
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

  return {
    drawBoard,
    drawSymbol,
  }
})(document);

const player = (symbol) => {
  return { symbol }
};