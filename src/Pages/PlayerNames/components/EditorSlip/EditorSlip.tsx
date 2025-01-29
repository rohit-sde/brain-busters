import { useEffect, useRef } from "react";
import Loader from "../../../../Components/smallcomponents/loader/Loader";
import "./EditorSlip.css";
import { isNameOfGirl } from "../../../../funcs & conts/checkfuncs";
import { emojis } from "../../conts/conts";

interface Player {
  playerName: string;
  isInput: boolean;
  character: string | null;
  gender: "M" | "F";
  isLoading: boolean;
}

interface argument {
  value: Player;
  setPlayersinfo: React.Dispatch<React.SetStateAction<Player[]>>;
  index: number;
}

const EditorSlip = ({ value, setPlayersinfo, index }: argument) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (value.isInput) {
      inputRef.current?.focus(); // Focus the input if it's in editing mode
    }
  }, [value.isInput]);

  async function setImageFromUrl(Url: string) {
    setPlayersinfo((prev: Player[]) =>
      prev.map((player, k) =>
        k === index ? { ...player, isLoading: true } : player
      )
    );

    try {
      const response = await fetch(Url);
      if (!response.ok)
        throw new Error(`Failed to fetch image: ${response.status}`);

      const data = await response.blob();
      const imageUrl = URL.createObjectURL(data);

      setPlayersinfo((prev: Player[]) =>
        prev.map((player, k) =>
          k === index
            ? { ...player, character: imageUrl, isLoading: false }
            : player
        )
      );
    } catch (error) {
      const uniqueNo = Math.floor(Math.random() * emojis.length);
      emojis.filter((_, i) => uniqueNo !== i);
      setPlayersinfo((prev: Player[]) =>
        prev.map((player, k) =>
          k === index
            ? {
                ...player,
                character: emojis[uniqueNo],
                isLoading: false,
              }
            : player
        )
      );
      console.error("Error fetching image:", error);
    }
  }

  function handleEditBtn() {
    console.log("hello");
    const currentvalue = inputRef.current?.value;

    if (currentvalue) {
      const isGirl = isNameOfGirl(currentvalue);
      const gender = isGirl ? "F" : "M";
      const imageUrl = `https://avatar.iran.liara.run/public/${
        isGirl ? "girl" : "boy"
      }?username=${currentvalue}

`;

      // Update player state
      setPlayersinfo((prev: Player[]) => {
        const updatedPlayer = {
          ...value,
          gender,
          playerName: currentvalue,
          isInput: !value.isInput,
        };
        if (currentvalue !== value.playerName) {
          setImageFromUrl(imageUrl); // fetch image based on new gender
        }
        return prev.map((player, k) =>
          k === index ? { ...updatedPlayer } : player
        );
      });
      return;
    }

    // If no value, just toggle input state
    setPlayersinfo((prev: Player[]) => {
      const updatedPlayer = { ...value, isInput: !value.isInput };
      return prev.map((player, k) =>
        k === index ? { ...updatedPlayer } : { ...player, isInput: false }
      );
    });
  }
  function handleGender(gen: string) {
    setPlayersinfo((prev: Player[]) => {
      return prev.map((player: Player, k: number) => {
        if (index === k) {
          const updatedPlayer = { ...player, gender: gen };
          const URL = `https://avatar.iran.liara.run/public/${
            gen === "M" ? "boy" : "girl"
          }?username=${updatedPlayer.playerName}`;
          setImageFromUrl(URL);
          return updatedPlayer;
        }
        return player;
      });
    });
  }
  useEffect(() => {
    setImageFromUrl(
      `https://avatar.iran.liara.run/public/${
        value.gender == "M" ? "boy" : "girl"
      }`
    );
  }, []);
  return (
    <div className="editorSlip">
      <span className="emojiFace">
        {value.isLoading ? (
          <Loader />
        ) : emojis.includes(value.character) ? (
          <span>{value.character}</span>
        ) : (
          <img src={`${value.character}`} />
        )}
      </span>
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
