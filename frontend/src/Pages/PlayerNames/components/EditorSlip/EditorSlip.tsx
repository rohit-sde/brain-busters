import { useEffect, useRef } from "react";
// import Loader from "../../../../Components/loader/Loader";
import "./EditorSlip.css";
import { isNameOfGirl } from "../../../../funcs & conts/checkfuncs";
import { playerobject } from "../../../../Store/AboutGame";

interface argument {
  value: playerobject;
  setPlayersinfo: React.Dispatch<React.SetStateAction<playerobject[]>>;
  index: number;
}

const EditorSlip = ({ value, setPlayersinfo, index }: argument) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (value.isInput) {
      inputRef.current?.focus(); // Focus the input if it's in editing mode
    }
  }, [value.isInput]);

  function handleEditBtn() {
    const currentvalue = inputRef.current?.value;

    if (currentvalue) {
      const isGirl = isNameOfGirl(currentvalue);
      const gender = isGirl ? "F" : "M";
      const imageUrl = `https://avatar.iran.liara.run/public/${
        isGirl ? "girl" : "boy"
      }?username=${currentvalue}`;

      // Update player state
      setPlayersinfo((prev: playerobject[]) => {
        const updatedPlayer = {
          ...value,
          gender,
          playerName: currentvalue,
          isInput: !value.isInput,
        };
        if (currentvalue !== value.playerName) {
          // setImageFromUrl(imageUrl); // fetch image based on new gender
        }
        return prev.map((player, k) =>
          k === index ? { ...updatedPlayer } : player
        );
      });
      return;
    }

    // If no value, just toggle input state
    setPlayersinfo((prev: playerobject[]) => {
      const updatedPlayer = { ...value, isInput: !value.isInput };
      return prev.map((player, k) =>
        k === index ? { ...updatedPlayer } : { ...player, isInput: false }
      );
    });
  }
  function handleGender(gen: string) {
    setPlayersinfo((prev: playerobject[]) => {
      return prev.map((player: playerobject, k: number) => {
        if (index === k) {
          const updatedPlayer = { ...player, gender: gen };
          const URL = `https://avatar.iran.liara.run/public/${
            gen === "M" ? "boy" : "girl"
          }?username=${updatedPlayer.playerName}`;
          // setImageFromUrl(URL);
          return updatedPlayer;
        }
        return player;
      });
    });
  }
  return (
    <div className="editorSlip">
      {value?.isInput ? (
        <input
          className="nameInput"
          type="text"
          defaultValue={value?.playerName}
          ref={inputRef}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              handleEditBtn();
            }
          }}
        />
      ) : (
        <span className="editedName">{value?.playerName}</span>
      )}
      <span className="tools">
        <button
          className="editButton"
          onClick={() => {
            handleEditBtn();
          }}
          type="submit"
        >
          {value.isInput ? "✔️" : "✏️"}
        </button>
        <button
          className={`genderBtn ${value.gender === "M" && "Active"}`}
          onClick={() => {
            handleGender("M");
          }}
        >
          M
        </button>
        <button
          className={`genderBtn ${value.gender === "F" && "Active"}`}
          onClick={() => {
            handleGender("F");
          }}
        >
          F
        </button>
      </span>
    </div>
  );
};

export default EditorSlip;
