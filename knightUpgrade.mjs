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

  function getPath(coordinatesArray) {
    const nextMoves = [];
    const coordinatesObject = [];

    for (let coordinates of coordinatesArray) {
      if (
        coordinates[0] === endCoordinates[0] &&
        coordinates[1] === endCoordinates[1]
      ) {
        return [coordinates];
      }
      const moves = calculateMoves(coordinates);

      nextMoves.push(...moves);

      coordinatesObject[coordinates] = moves;
    }

    const path = getPath(nextMoves);

    console.log(path);

    // Check which coordinates in coordinatesArray has a child in this path
    // - should be the first child

    for (let coordinates in coordinatesObject) {
      for (let nextMove of coordinatesObject[coordinates]) {
        if (path[0][0] === nextMove[0] && path[0][1] === nextMove[1]) {
          const move = coordinates.split(",");
          const intMove = move.map((str) => parseInt(str));
          return [intMove, ...path];
        }
      }
    }
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

  const path = getPath([startCoordinates]);
  outputPath(path.length - 1, path);
}
