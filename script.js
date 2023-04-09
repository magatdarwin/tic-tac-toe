const gameBoard = (doc => {
  const draw = () => {
    const body = doc.querySelector('body');
    const outerBox = doc.createElement('div');
    outerBox.classList.add('outer-box');

    let box;
    for (let i = 0; i < 9; i++) {
      box = doc.createElement('div');
      box.classList.add('box');

      if (i >= 3 && i <= 5) {
        box.classList.add('row-2');
      }

      if (i === 1 || i === 4 | i === 7) {
        box.classList.add('col-2');
      }

      outerBox.appendChild(box);
    }

    body.appendChild(outerBox);
  }

  return {
    draw,
  }
})(document);

gameBoard.draw();