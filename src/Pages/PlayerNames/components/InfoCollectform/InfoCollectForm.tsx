import { createRef, Fragment, useEffect, useRef, useState } from "react";
import { isNameOfGirl } from "../../../../funcs & conts/checkfuncs.ts";
import "./InfoForm.css";
import Loader from "../../../../Components/smallcomponents/loader/Loader.tsx";
import { useDispatch, useSelector } from "react-redux";
import { SetPlayerDetails } from "../../../../Store/AboutGame.ts";
import { useNavigate } from "react-router";
import EditorSlip from "../EditorSlip/EditorSlip.tsx";

interface Player {
  playerName: string;
  isInput: boolean;
  character: string | null;
  gender: "M" | "F";
  isLoading: boolean;
}

const InfoForm = () => {
  const PlayersDetails: Player[] = useSelector((v) => v.About.PlayersDetails);
  const [playersinfo, setPlayersinfo] = useState<Player[]>(PlayersDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNextPage() {
    dispatch(SetPlayerDetails(playersinfo));
    navigate("/PlayerNameing/GameBoard");
  }

  return (
    <Fragment>
      <div className="nameingContainer">
        {playersinfo?.map((player: object, i: number) => {
          return (
            <EditorSlip
              key={i}
              index={i}
              value={player}
              setPlayersinfo={setPlayersinfo}
            />
          );
        })}
        {/* {playersinfo?.map((player: object, i: number) => {
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
        })} */}
      </div>
      <button className="LetGoBtn" onClick={handleNextPage}>
        Let's Go <span>➙</span>
      </button>
    </Fragment>
  );
};

export default InfoForm;
