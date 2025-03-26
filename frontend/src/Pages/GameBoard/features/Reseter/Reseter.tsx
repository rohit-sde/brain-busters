import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  gamestate,
  SetCurrentTurn,
  SetIsPlayStart,
  SetIsResetGame,
  SetPlayerDetails,
  SetPlayerNum,
} from "../../../../Store/AboutGame";
import "./Reseter.css";
import { useNavigate } from "react-router";

const Reseter = () => {
  const isPlayStart = useSelector((v: gamestate) => v.Board.isPlayStart);
  const players = useSelector((v: gamestate) => v.About.PlayersDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function buttonHandler(v: Event) {
    const targeted = v.target as HTMLElement;
    const text = targeted.innerText;
    if (text == "Reset") {
      dispatch(
        SetPlayerDetails(
          players.map((val) => ({
            ...val,
            Score: 0,
            time: { min: 5, sec: 30 },
          }))
        )
      );
      dispatch(SetCurrentTurn(1));
      dispatch(SetIsResetGame());
    }
    if (text == "Play") dispatch(SetIsPlayStart());
    if (text == "🏠") {
      dispatch(SetPlayerNum(0));
      dispatch(SetPlayerDetails([]));
      dispatch(SetCurrentTurn(1));
      navigate("/");
    }
  }
  return (
    <div className="BtnsWrapper">
      <button
        className="StyledBtns"
        onClick={buttonHandler}
        style={{ zIndex: isPlayStart ? 2 : 0 }}
        disabled={!isPlayStart}
      >
        Reset
      </button>
      <button
        className="StyledBtns"
        onClick={buttonHandler}
        disabled={isPlayStart}
      >
        Play
      </button>
      <button
        className="homeBtn"
        onClick={buttonHandler}
        disabled={isPlayStart}
      >
        🏠
      </button>
    </div>
  );
};

export default Reseter;
