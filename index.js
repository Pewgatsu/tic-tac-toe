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
      board[i] = "";
    }
  };

  return { getBoard, setCell, getCell, resetBoard };
})();

const displayController = (() => {
  const boardCell = document.querySelectorAll(".boardCell");

  boardCell.forEach((cell) => {
    const cellIndex = cell.getAttribute("data-index");
    cell.addEventListener("click", () => {
      gameController.playerMove(cellIndex);
      updateGameBoard();
    });
  });

  const updateGameBoard = () => {
    for (let i = 0; i < boardCell.length; i++) {
      boardCell[i].textContent = gameBoard.getCell(i);
    }
  };

  return { updateGameBoard };
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
      round += 1;
    }
    if (round === 9) {
      gameOver = true;
    }
  };

  const checkRows = () => {

    for (let row = 0; row < 3; row++) {
      const rows = [];
      for (let col = row * 3; col < row * 3 + 3; col++) {
        rows.push(gameBoard.getCell(col));
      }

      if (rows.every((cell) => cell === "X") || rows.every((cell) => cell === "O")){
        return true;
      }
    }
    return false;
  };

  const checkColumns = () => {

    for (let col = 0; col < 3; col++) {
      const columns = [];
      for (let row = 0; row < 3; row++ ){
        columns.push(gameBoard.getCell(col + row * 3));

        if (columns.every((cell) => cell === "X") || columns.every((cell) => cell === "O")){
          return true;
        }
      }
      
      
    }
    return false;
  }

  const getPlayerSign = () =>
    round % 2 === 1 ? playerX.getSign() : playerO.getSign();

  const getGameStatus = () => gameOver;

  const checkWinner = () => {
    if (getGameStatus() || checkRows() || checkColumns()) {
      return true;
    }
    return false;
  };

  return { playerMove, getPlayerSign, getGameStatus, checkWinner };
})();
