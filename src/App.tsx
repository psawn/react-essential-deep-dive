import { useState } from "react";
import "./App.css";
import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import { GameOver } from "./components/GameOver";

export type Turn = {
  square: {
    row: number;
    column: number;
  };
  player: string;
};

export type GameBoardType = (null | string)[][];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD: GameBoardType = [
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

function deriveWinner(
  gameBoard: (string | null)[][],
  players: Record<string, string>
) {
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
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns: Turn[]) {
  const gameBoard = copyGameBoard(INITIAL_GAME_BOARD);
  // const gameBoard = [...initialGameBoard].map((innerArray) => [...innerArray]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }

  return gameBoard;
}

function copyGameBoard(gameBoard: GameBoardType) {
  return gameBoard.map((innerArray) => {
    if (Array.isArray(innerArray)) {
      return [...innerArray]; // Create a copy of the nested array
    } else {
      return innerArray; // Copy individual values
    }
  });
}

function App() {
  // const [activePlayerer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const [players, setPlayers] = useState<Record<string, string>>(PLAYERS);
  const [isEnableEditName, setIsEnableEditName] = useState(true);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, columnIndex: number) {
    // setActivePlayer((currentActivePlayer) =>
    //   currentActivePlayer === "X" ? "O" : "X"
    // );

    setIsEnableEditName(false);

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

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerChangeName(symbol: string, newName: string) {
    setPlayers((players) => ({
      ...players,
      [symbol]: newName,
    }));
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerChangeName}
              isEnableEditName={isEnableEditName}
            ></Player>
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerChangeName}
              isEnableEditName={isEnableEditName}
            ></Player>
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} handleRestart={handleRestart}></GameOver>
          )}
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
