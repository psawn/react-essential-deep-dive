import { Turn } from "../App";

export function Log({ turns }: { turns: Turn[] }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}:${turn.square.column}`}>
          {turn.player} selected {turn.square.row}, {turn.square.column}
        </li>
      ))}
    </ol>
  );
}
