function createCells() {
  const cellsArr = [];

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement('div');
      cell.dataset.x = j;
      cell.dataset.y = i;
      cell.classList.add('cell');

      cellsArr.push(cell);
    }
  }
  return cellsArr;
}

export default createCells;
