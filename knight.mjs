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
        // If move on board
        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
          moves.push([newX, newY]);
        }
      }
    }

    return moves;
  }

  function populateBoard() {
    let movesTaken = 0;
    let coordinatesArray = [startCoordinates];
    while (true) {
      movesTaken += 1;
      const coordArrayCopy = coordinatesArray;
      coordinatesArray = [];
      for (let coordinates of coordArrayCopy) {
        if (chessboard.checkPositionsFilled(coordinates)) {
          continue;
        }
        let moves = calculateMoves(coordinates);
        coordinatesArray.push(...moves);
        chessboard.addBoardPositions(coordinates, moves);
      }

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

  function getPath(moves, startCoordinates) {
    const nextMoves = chessboard.getBoardPositions(
      startCoordinates[0],
      startCoordinates[1]
    );

    // Any way to prevent checking coordinates already checked earlier on in the path?
    for (let nextMove of nextMoves) {
      if (
        moves === 1 &&
        nextMove[0] === endCoordinates[0] &&
        nextMove[1] === endCoordinates[1]
      ) {
        return [nextMove];
      }

      // If this is the last move and it is not the end coord, skip to the next move
      if (moves === 1) continue;

      const path = getPath(moves - 1, nextMove);
      if (path) {
        const joinedPath = [nextMove].concat(path);
        return joinedPath;
      }
    }

    // End coordinates not on this path
    return false;
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

  const movesTaken = populateBoard();
  const path = [startCoordinates, ...getPath(movesTaken, startCoordinates)];

  outputPath(movesTaken, path);
}
