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
        // If move on board
        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
          moves.push([newX, newY]);
        }
      }
    }

    return moves;
  }

  function outputPath(movesTaken, path) {
    console.log(`This path takes ${movesTaken} moves.`);
    console.log("This was the path taken:");

    for (let move of path) {
      console.log(move);
    }
  }

  if (
    startCoordinates[0] < 0 ||
    startCoordinates[0] > 7 ||
    startCoordinates[1] < 0 ||
    startCoordinates[1] > 7
  ) {
    console.log("Your starting coordinates fall outside the board!");
    return;
  }

  if (
    endCoordinates[0] < 0 ||
    endCoordinates[0] > 7 ||
    endCoordinates[1] < 0 ||
    endCoordinates[1] > 7
  ) {
    console.log("Your end coordinates fall outside the board!");
    return;
  }
}
