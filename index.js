const Player = (sign) => {
  this.sign = sign;

  const getSign = () => sign;

  return { getSign };
};

const gameBoard = (() => {
  /*
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]; 
    */
  const board = new Array(9);

  const getBoard = () => board;

  const setCell = (index, sign) => {
    board[index] = sign;
  };

  const getCell = (index) => board[index];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = undefined;
    }
  };

  return { getBoard, setCell, getCell, resetBoard };
})();

const displayController = (() => {
  const boardCell = document.querySelectorAll(".boardCell");
  const turnBanner = document.querySelector(".turnBanner");
  const restartButton = document.querySelector('.restart');

  boardCell.forEach((cell) => {
    const cellIndex = cell.getAttribute("data-index");
    cell.addEventListener("click", (e) => {
      if (gameController.getGameStatus() || e.target.textContent !== "") return
      gameController.playerMove(cellIndex);
      updateGameBoard();
    });
  });

  restartButton.addEventListener('click', () => {
    gameBoard.resetBoard();
    gameController.reset();
    updateGameBoard();
    turnBanner.textContent = ("Player X's turn");
  })

  const updateGameBoard = () => {
    for (let i = 0; i < boardCell.length; i++) {
      boardCell[i].textContent = gameBoard.getCell(i);
    }
  };

  const updateTurnBanner = () => {
    turnBanner.textContent = `Player ${gameController.getPlayerSign()}'s turn`;
  };

  const displayWinner = (winner) => {
    if (winner === "draw"){
      turnBanner.textContent = "Draw";
    }else {
      turnBanner.textContent = `Player ${winner} has won!`;
    } 
  }

 
  return { updateGameBoard, updateTurnBanner, displayWinner };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let gameOver = false;

  const playerMove = (index) => {
    const boardCell = gameBoard.getCell(index);
    if (boardCell === undefined) {
      gameBoard.setCell(index, getPlayerSign());
    }
    if (checkDraw()) {
      gameOver = true;
      displayController.displayWinner("draw");
      return;
    }
    if (checkWinner()) {
      gameOver = true;
      displayController.displayWinner(getPlayerSign());
      return;
    }
  
    round += 1;
    displayController.updateTurnBanner();
  };

  const checkDraw = () => {
    if (round === 9) {
      return true;
    }
    return false;
  };

  /**
   * Checks if a row has been filled.
   * If someone filled a row, returns true otherwise it returns false
   *
   */
  const checkRows = () => {
    for (let row = 0; row < 3; row++) {
      const rows = [];
      for (let col = row * 3; col < row * 3 + 3; col++) {
        rows.push(gameBoard.getCell(col));
      }

      if (
        rows.every((cell) => cell === "X") ||
        rows.every((cell) => cell === "O")
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * Checks if a column has been filled.
   * If someone filled a column, returns true otherwise it returns false
   *
   */

  const checkColumns = () => {
    for (let col = 0; col < 3; col++) {
      const columns = [];
      for (let row = 0; row < 3; row++) {
        columns.push(gameBoard.getCell(col + 3 * row));
      }

      if (
        columns.every((cell) => cell === "X") ||
        columns.every((cell) => cell === "O")
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * Checks if a diagonal has been filled.
   * If someone filled a diagonal, returns true otherwise it returns false
   *
   */

  const checkDiagonals = () => {
    const leftDiagonal = [
      gameBoard.getCell(0),
      gameBoard.getCell(4),
      gameBoard.getCell(8),
    ];
    const rightDiagonal = [
      gameBoard.getCell(6),
      gameBoard.getCell(4),
      gameBoard.getCell(2),
    ];

    if (
      leftDiagonal.every((cell) => cell === "X") ||
      leftDiagonal.every((cell) => cell === "O")
    ) {
      return true;
    }

    if (
      rightDiagonal.every((cell) => cell === "X") ||
      rightDiagonal.every((cell) => cell === "O")
    ) {
      return true;
    }

    return false;
  };

  const getPlayerSign = () =>
    round % 2 === 1 ? playerX.getSign() : playerO.getSign();

  const getGameStatus = () => gameOver;

  const checkWinner = () => {
    if (
      getGameStatus() ||
      checkRows() ||
      checkColumns() ||
      checkDiagonals() ||
      checkDraw()
    ) {
      return true;
    }
    return false;
  };

  const reset = () => {
    round = 1;
    gameOver = false;
  }

  return {
    playerMove,
    getPlayerSign,
    getGameStatus,
    checkWinner,
    reset
  };
})();
