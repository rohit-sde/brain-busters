// Style
import { useState } from "react";
import "./Home.css";

import { SetPlayerNum } from "../../Store/AboutGame.ts";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Home = () => {
  const [playerCount, SetPlayerCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function NextButtonHandler() {
    dispatch(SetPlayerNum(playerCount));
    navigate("/PlayerNameing");
  }

  return (
    <div className="HomeContainer">
      <span className="Title">Brain Buster</span>
      <div className="MultiPlayerSec">
        <span>
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <button
                className={`NoOfPlayers${
                  playerCount === i + 1 ? "active" : ""
                }`}
                onClick={() => SetPlayerCount(i + 1)}
                key={i}
              >
                {i === 0 ? "1 Player" : "2 Players"}
              </button>
            ))}
        </span>
        <span>
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <button
                className={`NoOfPlayers${
                  playerCount === i + 3 ? "active" : ""
                }`}
                onClick={() => SetPlayerCount(i + 3)}
                key={i}
              >
                {i + 3} Players
              </button>
            ))}
        </span>
      </div>
      <button
        className={`NextButton${playerCount !== 0 ? "active" : ""}`}
        onClick={NextButtonHandler}
        disabled={playerCount === 0}
      >
        Next
      </button>
    </div>
  );
};

export default Home;
