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
    cell.addEventListener("click", (e) => {
      e.target.textContent = gameController.getPlayerSign();
      gameController.playerMove(cellIndex);
    });
  });
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;

  const playerMove = (index) => {
    if (gameBoard.getCell(index) === undefined) {
      gameBoard.setCell(index, getPlayerSign());
    } else {
      console.log("invalid");
    }

    console.log(round);
    round +=1;
  };

  const getPlayerSign = () =>
    round % 2 === 1 ? playerX.getSign() : playerO.getSign();

  return { playerMove, getPlayerSign };
})();
