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

    return board[index];
  }

  function clearBoard() {
    board = new Array(64);
  }

  function addBoardPositions(lastCoordinates, newCoordinates) {
    const index = getIndex(lastCoordinates[0], lastCoordinates[1]);
    for (coordinate of newCoordinates) {
      const currentIndex = getIndex(coordinate[0], coordinate[1]);
      if (!board[index]) {
        board[index] = [];
      }

      board[index].push(currentIndex);
    }
  }

  return { getBoard, getBoardPositions, clearBoard, addBoardPositions };
})();
