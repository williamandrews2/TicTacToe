// There needs to be objects for the following:

// Gameboard - to store array
// Players
// displayController - to control the flow of the game

const container = document.querySelector("#gameboard");

// The gameboard is wrapped in an IIFE so it cannot be reused
// to make multiple instances.
const gameboard = function () {
  let gameboardArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // row, column, player number
  const updateGameboard = function (r, c, player) {
    gameboardArray[r][c] = player;
    checkWinner();
    displayArray();
  };

  const checkWinner = function () {
    const gridSize = 3;

    // Check rows
    for (let i = 0; i < gridSize; i++) {
      if (
        gameboardArray[i][0] &&
        gameboardArray[i][0] === gameboardArray[i][1] &&
        gameboardArray[i][0] === gameboardArray[i][2]
      ) {
        console.log("We have a winner in the rows!");
        return gameboardArray[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < gridSize; i++) {
      if (
        gameboardArray[0][i] &&
        gameboardArray[0][i] === gameboardArray[1][i] &&
        gameboardArray[0][i] === gameboardArray[2][i]
      ) {
        console.log("We have a winner in the columns!");
        return gameboardArray[0][i];
      }
    }

    // Check main diagonal
    if (
      gameboardArray[0][0] &&
      gameboardArray[0][0] === gameboardArray[1][1] &&
      gameboardArray[0][0] === gameboardArray[2][2]
    ) {
      console.log("We have a winner in the main diagonal!");
      return gameboardArray[0][0];
    }

    // Check anti-diagonal
    if (
      gameboardArray[0][2] &&
      gameboardArray[0][2] === gameboardArray[1][1] &&
      gameboardArray[0][2] === gameboardArray[2][0]
    ) {
      console.log("We have a winner in the anti-diagonal!");
      return gameboardArray[0][2];
    }

    // No winner
    return null;
  };

  // test functions, delete later
  const displayArray = function () {
    console.log(gameboardArray);
  };

  return { updateGameboard, checkWinner, displayArray };
};

// Create instance of a gameboard
const myGameboard = gameboard();

myGameboard.updateGameboard(1, 1, 1);
