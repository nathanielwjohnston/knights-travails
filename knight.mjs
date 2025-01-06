import { chessboard } from "./chessboard.mjs";

export function knightMoves(startCoordinates, endCoordinates) {
  function calculateMoves(coordinates) {
    const x = coordinates[0];
    const y = coordinates[1];
    const moves = [];
    const operands = [-1, 1, -2, 2];

    for (let operand of operands) {
      for (let secondOperand of operands) {
        if (Math.abs(operand) === Math.abs(secondOperand)) {
          continue;
        }

        const newX = x + operand;
        const newY = y + secondOperand;
        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
          moves.push([newX, newY]);
        }
      }
    }

    return moves;
  }

  function populateBoard(startCoordinates, endCoordinates) {
    let movesTaken = 0;
    let coordinatesArray = [startCoordinates];
    while (true) {
      movesTaken += 1;
      const coordArrayCopy = coordinatesArray;
      coordinatesArray = [];
      for (let coordinates of coordArrayCopy) {
        let moves = calculateMoves(coordinates);
        coordinatesArray.push(...moves);
        chessboard.addBoardPositions(coordinates, moves);
      }

      // Can this be put in for loop or will it cut short the necessary moves?
      if (
        coordinatesArray.find(
          (element) =>
            element[0] === endCoordinates[0] && element[1] === endCoordinates[1]
        )
      ) {
        break;
      }
    }

    return movesTaken;
  }

  const movesTaken = populateBoard(startCoordinates, endCoordinates);
  console.log(movesTaken);
  const board = chessboard.getBoard();
  console.log(board);
}
