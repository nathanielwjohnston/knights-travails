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

  console.log(calculateMoves([0, 1]));
}
