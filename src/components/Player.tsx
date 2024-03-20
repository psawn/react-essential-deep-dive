import { ChangeEvent, useState } from "react";

export function Player({
  initialName,
  symbol,
  isActive,
}: {
  initialName: string;
  symbol: string;
  isActive: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    // setIsEditting(isEditting ? false : true); // not use this
    // setIsEditting(!isEditting); // not use this
    setIsEditing((editing) => !editing);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleChange}
      ></input>
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
