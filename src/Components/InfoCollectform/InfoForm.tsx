import { createRef, useEffect, useRef, useState } from "react";
import { isNameOfGirl } from "../../funcs/checkfuncs.ts";
import value from "../../Store/Store.ts";
import "./InfoForm.css";
import Loader from "../loader/loader.tsx";

interface Player {
  playerName: string;
  isInput: boolean;
  character: string | null;
  gender: "M" | "F";
  isLoading: boolean;
}

const InfoForm = () => {
  const [playersinfo, setPlayersinfo] = useState<Player[]>(
    value.getState().About.PlayersDetails as Player[]
  );
  const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>(
    playersinfo.map(() => createRef())
  );
  useEffect(() => {
    playersinfo.map((player, i) => {
      const URL = `https://avatar.iran.liara.run/public/${
        player.gender === "M" ? "boy" : "girl"
      }?username=${player.playerName}`;
      setImageFromUrl(URL, i);
    });
  }, []);

  useEffect(() => {
    const inputToFocus = playersinfo.findIndex((player) => player.isInput);
    if (inputToFocus >= 0 && inputRefs.current[inputToFocus]?.current) {
      inputRefs.current[inputToFocus]?.current?.focus();
    }
  }, [playersinfo]);

  function handleEditBtn(i: number) {
    const currentvalue = inputRefs?.current[i]?.current?.value;

    setPlayersinfo((prev) => {
      return prev.map((player: object, k: number) => {
        if (k === i && currentvalue && isNameOfGirl(currentvalue)) {
          const updatedPlayer = {
            ...player,
            gender: "F",
            playerName: currentvalue,
            isInput: !player.isInput,
            // isLoading: true,
          };
          const URL = `https://avatar.iran.liara.run/public/girl?username=${updatedPlayer.playerName}`;
          setImageFromUrl(URL, i);
          return updatedPlayer;
        }
        if (k === i && currentvalue) {
          const updatedPlayer = {
            ...player,
            gender: "M",
            playerName: currentvalue,
            isInput: !player.isInput,
            // isLoading: true,
          };
          const URL = `https://avatar.iran.liara.run/public/boy?username=${updatedPlayer.playerName}`;
          setImageFromUrl(URL, i);
          return updatedPlayer;
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
  function handleGender(gen: string, i: number) {
    setPlayersinfo((prev: Array) => {
      return prev.map((player: object, k: number) => {
        if (i === k) {
          const updatedPlayer = { ...player, gender: gen };
          const URL = `https://avatar.iran.liara.run/public/${
            gen === "M" ? "boy" : "girl"
          }?username=${updatedPlayer.playerName}`;
          setImageFromUrl(URL, i);
          return updatedPlayer;
        }
        return player;
      });
    });
  }

  async function setImageFromUrl(Url: string, i: number) {
    setPlayersinfo((prev) => {
      return prev.map((player, k) => {
        if (i === k) {
          return { ...player, isLoading: true };
        }
        return player;
      });
    });
    try {
      // Fetch the image as a blob
      const response = await fetch(Url);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      // Convert the response into a Blob
      const imageBlob = await response.blob();

      // Create an object URL from the Blob
      const imageObjectURL = URL.createObjectURL(imageBlob);

      setPlayersinfo((prev) => {
        return prev.map((player, k) => {
          if (i === k) {
            return { ...player, character: imageObjectURL };
          }
          return player;
        });
      });
    } catch (error) {
      console.error("Error downloading image:", error);
    }
    setPlayersinfo((prev) => {
      return prev.map((player, k) => {
        if (i === k) {
          return { ...player, isLoading: false };
        }
        return player;
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
                    handleEditBtn(i);
                  }
                }}
              />
            ) : (
              <span className="editedName">{player?.playerName}</span>
            )}
            <button
              className="editButton"
              onClick={() => {
                handleEditBtn(i);
              }}
              type="submit"
            >
              {player.isInput ? "✔️" : "✏️"}
            </button>
            <span className="emojiFace">
              {player.isLoading ? <Loader /> : <img src={player.character} />}
            </span>
            <button
              className={`genderBtn ${player.gender === "M" && "Active"}`}
              onClick={() => {
                handleGender("M", i);
              }}
            >
              M
            </button>
            <button
              className={`genderBtn ${player.gender === "F" && "Active"}`}
              onClick={() => {
                handleGender("F", i);
              }}
            >
              F
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default InfoForm;
