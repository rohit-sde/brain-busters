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
import NextButton from "../../Components/NextButton/NextButton.tsx";
import { toast, ToastContainer } from "react-toastify";

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
    if (playerCount == 0) {
      hello();
      return;
    }
    dispatch(SetPlayerNum(playerCount));
    navigate("/PlayerNameing");
  }

  function handlestate(val: number) {
    SetPlayerCount(val);
  }

  function hello() {
    toast.error("Select Number of Players");
  }
  return (
    <div className="HomeContainer">
      <ToastContainer />
      <span className="Title">Brain Buster</span>
      <h4 className="subTitle">Select Number Of Players</h4>
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
