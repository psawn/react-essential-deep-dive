import { GameBoardType } from "../App";

export function GameBoard({
  onSelectSquare,
  board,
}: {
  onSelectSquare: (rowIndex: number, columnIndex: number) => void;
  board: GameBoardType;
}) {
  // const gameBoard = initialGameBoard; // computed value which is derived from some state

  // // this is deriving state
  // for (const turn of turns) {
  //   const { square, player } = turn;
  //   const { row, column } = square;
  //   gameBoard[row][column] = player;
  // }

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex: number, columnIndex: number) {
  //   setGameBoard((prevGameBoard) => {
  //     // const updatedGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];

  //     const updatedGameBoard = copyGameBoard(prevGameBoard);
  //     updatedGameBoard[rowIndex][columnIndex] = activePlayererSymbol;

  //     return updatedGameBoard;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, columnIndex)}
                  disabled={!!playerSymbol}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
