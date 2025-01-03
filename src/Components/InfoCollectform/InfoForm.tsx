import { createRef, useRef, useState } from "react";
import value from "../../Store/Store.ts";
import "./InfoForm.css";

interface Player {
  playerName: string;
  isInput: boolean;
  character: string;
  gender: string;
}

const InfoForm = () => {
  const [playersinfo, setPlayersinfo] = useState<Player[]>(
    value.getState().About.PlayersDetails as Player[]
  );
  const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>(
    playersinfo.map(() => createRef())
  );
  function handleEditBtn(i: number) {
    setPlayersinfo((prev) => {
      return prev.map((player: object, k: number) => {
        if (k === i && inputRefs?.current[i]?.current?.value) {
          return {
            ...player,
            playerName: inputRefs?.current[i]?.current.value,
            isInput: !player.isInput,
          };
        }
        if (k === i) {
          return {
            ...player,
            isInput: !player.isInput,
          };
        }
        return { ...player, isInput: false };
      });
    });
  }
  return (
    <div className="nameingContainer">
      {playersinfo?.map((player: object, i: number) => {
        return (
          <div className="playerInfo" key={i}>
            {player?.isInput ? (
              <input
                className="nameInput"
                defaultValue={player?.playerName}
                ref={inputRefs.current[i]}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    handleEditBtn(i); // Save the player name when Enter is pressed
                  }
                }}
              />
            ) : (
              <span className="editedName">{player?.playerName}</span>
            )}
            <button
              className="editButton"
              onClick={() => handleEditBtn(i)}
              type="submit"
            >
              {player.isInput ? "✔️" : "✏️"}
            </button>
            <span className="emojiFace"></span>
            <button className="genderBtn">M</button>
            <button className="genderBtn">F</button>
          </div>
        );
      })}
    </div>
  );
};

export default InfoForm;
