import { useState } from "react";
import "./App.css";
import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

export type Turn = {
  square: {
    row: number;
    column: number;
  };
  player: string;
};

export type GameBoardType = (null | string)[][];

const initialGameBoard: GameBoardType = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: Turn[]) {
  let currentPlayer = "X";

  if (gameTurns.length && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  // const [activePlayerer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex: number, columnIndex: number) {
    // setActivePlayer((currentActivePlayer) =>
    //   currentActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            column: columnIndex,
            // player: activePlayerer, // not optimal because it is merging 2 states
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName="Player 1"
              symbol="X"
              isActive={activePlayer === "X"}
            ></Player>
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlayer === "O"}
            ></Player>
          </ol>
          {winner && <p>{winner} won</p>}
          <GameBoard
            // activePlayererSymbol={activePlayerer}
            onSelectSquare={handleSelectSquare}
            board={gameBoard}
          ></GameBoard>
        </div>
        <Log turns={gameTurns}></Log>
      </main>
    </>
  );
}

export default App;
