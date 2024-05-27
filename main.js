// Import components from HTML.
const container = document.querySelector("#gameboard");
const cells = document.querySelectorAll(".cell");
const playerX = document.querySelector("#player-x");
const playerO = document.querySelector("#player-o");

// Notification container that alerts the outcome of the game.
const notificationContainer = document.createElement("div");
notificationContainer.id = "notification-container";

// Play again button.
const playAgain = document.createElement("button");
playAgain.innerHTML = "Play again!";
playAgain.id = "play-again-button";

// The gameboard and gameController are wrapped in IIFEs.
const gameboard = function () {
  let gameboardArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const updateGameboard = function (r, c, playerID) {
    // Check if the cell is occupied.
    if (gameboardArray[r][c] === 0) {
      gameboardArray[r][c] = playerID;
      const winner = checkWinner();
      if (winner) {
        removeCellEventListeners();
        handleWinner(winner);
      } else if (isBoardFull(gameboardArray)) {
        handleDraw();
      }
      return true; // Move was successful.
    }
    return false; // Move was unsuccessful.
  };

  function handleWinner(winner) {
    notificationContainer.innerHTML = winner + " wins!";
    document
      .getElementById("main-container")
      .append(notificationContainer, playAgain);
  }

  function handleDraw() {
    notificationContainer.innerHTML = "It's a draw!";
    document
      .getElementById("main-container")
      .append(notificationContainer, playAgain);
  }

  function isBoardFull(board) {
    // Flatten the 2D array to a 1D array and check if there is any cell with the value 0
    return board.flat().every((cell) => cell !== 0);
  }

  const checkWinner = function () {
    const gridSize = 3;

    // Check rows
    for (let i = 0; i < gridSize; i++) {
      if (
        gameboardArray[i][0] &&
        gameboardArray[i][0] === gameboardArray[i][1] &&
        gameboardArray[i][0] === gameboardArray[i][2]
      ) {
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
        return gameboardArray[0][i];
      }
    }

    // Check main diagonal
    if (
      gameboardArray[0][0] &&
      gameboardArray[0][0] === gameboardArray[1][1] &&
      gameboardArray[0][0] === gameboardArray[2][2]
    ) {
      return gameboardArray[0][0];
    }

    // Check anti-diagonal
    if (
      gameboardArray[0][2] &&
      gameboardArray[0][2] === gameboardArray[1][1] &&
      gameboardArray[0][2] === gameboardArray[2][0]
    ) {
      return gameboardArray[0][2];
    }

    // No winner
    return null;
  };

  return { updateGameboard, checkWinner };
};

// Game controller to handle the logic of the game.
const gameController = function () {
  const players = [createPlayer("Player O"), createPlayer("Player X")];
  let currentPlayerIndex = 0;

  updatePlayerHighlight();

  const switchPlayer = function () {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updatePlayerHighlight();
  };

  const getCurrentPlayer = function () {
    return players[currentPlayerIndex].playerName;
  };

  const playRound = function (r, c) {
    const currentPlayer = getCurrentPlayer();
    const moveSuccessful = myGameboard.updateGameboard(r, c, currentPlayer);
    if (moveSuccessful) {
      switchPlayer();
    }
  };

  const updateCell = function (r, c) {
    if (currentPlayerIndex === 0) {
      return "X";
    } else {
      return "O";
    }
  };

  function updatePlayerHighlight() {
    if (currentPlayerIndex === 0) {
      playerO.classList.add("highlight");
      playerX.classList.remove("highlight");
    } else {
      playerX.classList.add("highlight");
      playerO.classList.remove("highlight");
    }
  }

  return { switchPlayer, getCurrentPlayer, playRound, updateCell };
};

// Function for creating the players.
function createPlayer(name) {
  const playerName = name;
  return { playerName };
}

const handleCellClick = function () {
  const row = parseInt(this.getAttribute("data-row"));
  const col = parseInt(this.getAttribute("data-col"));

  if (this.innerHTML !== "") {
    alert("This space is alrady taken! Please choose another space.");
    return;
  }

  controller.playRound(row, col);
  this.innerHTML = controller.updateCell();
};

// Event listeners for gameboard and play again button.
function removeCellEventListeners() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

playAgain.addEventListener("click", () => {
  location.reload();
});

// Create instances of the objects.
const myGameboard = gameboard();
const controller = gameController();
