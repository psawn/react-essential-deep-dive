export function GameOver({
  winner,
  handleRestart,
}: {
  winner: string | undefined;
  handleRestart: () => void;
}) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{winner ? `${winner} won` : "It's a draw"}</p>
      <button onClick={handleRestart}>Rematch</button>
    </div>
  );
}
