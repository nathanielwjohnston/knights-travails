export const chessboard = (function () {
  // Makes 8 x 8 board into one dimensional array
  const boardLength = 8;
  // 64 squares
  const board = new Array(boardLength ** 2);

  function getBoard() {
    return board;
  }

  function getIndex(column, row) {
    const index = column * boardLength + row;

    return index;
  }

  function getBoardPositions(column, row) {
    const index = getIndex(column, row);
    // Need to create shallow copy otherwise changing positions will also change board[index]
    // positions would just have a reference to the same object as board[index] and would
    // thus also change it.
    const positions = [...board[index]];

    for (let [index, position] of positions.entries()) {
      let positionColumn;
      let positionRow;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          // If spot is in this column
          if (position === i * boardLength + j) {
            positionColumn = i;
            positionRow = j;
          }
        }
      }

      positions[index] = [positionColumn, positionRow];
    }

    return positions;
  }

  function clearBoard() {
    board = new Array(64);
  }

  function addBoardPositions(lastCoordinates, newCoordinates) {
    const index = getIndex(lastCoordinates[0], lastCoordinates[1]);
    for (let coordinate of newCoordinates) {
      const currentIndex = getIndex(coordinate[0], coordinate[1]);
      if (!board[index]) {
        board[index] = [];
      }

      board[index].push(currentIndex);
    }
  }

  function checkPositionsFilled(coordinates) {
    const index = getIndex(coordinates[0], coordinates[1]);
    const positions = board[index];

    if (positions) return true;

    return false;
  }

  return {
    getBoard,
    getBoardPositions,
    clearBoard,
    addBoardPositions,
    checkPositionsFilled,
  };
})();

//TODO: need to add checks to make sure positions outside the board are not being added
