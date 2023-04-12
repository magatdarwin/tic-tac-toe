const gameBoard = (doc => {
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
})(document);