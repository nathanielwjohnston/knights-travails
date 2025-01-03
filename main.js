import { chessboard } from "./chessboard.mjs";

chessboard.addBoardPositions(
  [0, 0],
  [
    [1, 1],
    [2, 1],
  ]
);

chessboard.addBoardPositions(
  [4, 4],
  [
    [1, 1],
    [2, 1],
  ]
);

console.log(chessboard.getBoard());

chessboard.clearBoard();

console.log(chessboard.getBoard());
