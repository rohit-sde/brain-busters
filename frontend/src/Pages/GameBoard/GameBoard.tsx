import { gamestate, SetPlayerDetails } from "../../Store/AboutGame.ts";
import { useDispatch, useSelector } from "react-redux";
import "./GameBoard.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import CurrentPlayer from "./Sections/CurrentPlayer/CurrentPlayer.tsx";
import BoardSetter from "./Sections/BoardSetter/BoardSetter.tsx";
import LiveRanking from "./Sections/LiveRanking/LiveRanking.tsx";
import GridCards from "./Sections/GridCards/GridCards.tsx";
import { fetchr } from "../../funcs & conts/fetcher.ts";
import Backdrop from "../../Components/Backdrop/Backdrop.tsx";
import Modal from "../../Components/Modal/Modal.tsx";
import { ToastContainer } from "react-toastify";

const GameBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playersDetail = useSelector(
    (val: gamestate) => val.About.PlayersDetails
  );
  const isPlayStart = useSelector((val: gamestate) => val.Board.isPlayStart);
  const winnerDetails = useSelector((val: gamestate) => val.Winner);

  useEffect(() => {
    if (playersDetail.length === 0) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchPlayerImages = async () => {
      const updatedPlayer = await Promise.all(
        playersDetail.map(async (player) => {
          const image = await fetchr(player);
          return { ...player, character: image };
        })
      );
      dispatch(SetPlayerDetails(updatedPlayer));
    };
    fetchPlayerImages();
  }, []);

  return (
    <>
      <ToastContainer />
      {!isPlayStart && (
        <Backdrop>
          <div className="instructions-box">
            {/* <div className="instructions-box"> */}
            <h2>Customize Your Game</h2>
            <p className="subheading">
              Follow these steps to set up your game!
            </p>
            <ul className="instructions-list">
              <li>Select Your Card Type</li>
              <li>Choose Your Grid Size</li>
              <li>Set Your Time Limit</li>
              <li>Click "Set Game" to Apply Your Time Settings</li>
              <li>Use "Reset Game" to Start Over</li>
              <li>Click "Play Game" to Begin!</li>
            </ul>
            {/* </div> */}
          </div>
        </Backdrop>
      )}
      {winnerDetails.Winner && (
        <Modal
          WinnerName={winnerDetails.WinnerPlayer.WinnerName}
          WinnerPic={winnerDetails.WinnerPlayer.WinnerPic}
        />
      )}
      <div className="GameBoard">
        {/* <LeaderBoard /> */}
        <CurrentPlayer />
        <div className="Lowerpart">
          <LiveRanking />
          <GridCards />
          <BoardSetter />
        </div>
      </div>
    </>
  );
};

export default GameBoard;
