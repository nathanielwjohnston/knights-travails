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
  const movesTaken = populateBoard();
  const path = [startCoordinates, ...getPath(movesTaken, startCoordinates)];

  outputPath(movesTaken, path);
}

// This definitely doesn't work at the moment - look at diagram in book

// I think I need to restart this - would having a visited attribute for nodes help?s
// function getPath(moves, startCoordinates) {
//   console.log(startCoordinates);
//   const nextMoves = chessboard.getBoardPositions(
//     startCoordinates[0],
//     startCoordinates[1]
//   );

//   let path;

//   console.log(nextMoves);

//   for (let nextMove of nextMoves) {
//     if (nextMove[0] === undefined) {
//       break;
//     }
//     console.log(nextMove);
//     path = [nextMove];

//     // ie if next move is the last one
//     if (
//       moves === 1 &&
//       nextMove[0] === endCoordinates[0] &&
//       nextMove[1] === endCoordinates[1]
//     )
//       break;

//     const followingPath = getPath(moves - 1, nextMove);
//     if (followingPath) {
//       path.push(followingPath);
//       break;
//     }
//   }

//   console.log(`Path: ${path}`);

//   return path;
// }
