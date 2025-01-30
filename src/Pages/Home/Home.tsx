// Style
import "./Home.css";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Reducer
import { SetPlayerNum } from "../../Store/AboutGame.ts";

// Components
import NumOfPlayers from "./components/buttons/NumOfPlayers.tsx";
import NextButton from "../../Tools/NextButton/NextButton.tsx";

const Home = () => {
  const [playerCount, SetPlayerCount] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NoOfPlayers = useSelector((v) => v.About.NoOfPlayers);

  const isOk = NoOfPlayers === 0;

  useEffect(() => {
    if (!isOk) {
      navigate("/PlayerNameing");
    }
  }, []);

  function NextButtonHandler() {
    dispatch(SetPlayerNum(playerCount));
    navigate("/PlayerNameing");
  }

  function handlestate(val: number) {
    SetPlayerCount(val);
  }
  return (
    <div className="HomeContainer">
      <span className="Title">Brain Buster</span>
      <div className="MultiPlayerSec">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <NumOfPlayers
              key={i}
              value={i + 1}
              isInput={i + 1 == 4}
              playerCount={playerCount}
              clickhandler={handlestate}
            />
          ))}
      </div>
      <NextButton
        value={"Next"}
        buttonHandler={NextButtonHandler}
        isactive={playerCount !== 0}
      />
    </div>
  );
};

export default Home;
