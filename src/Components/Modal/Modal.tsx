import { useDispatch, useSelector } from "react-redux";
import { getWinnerMsg } from "../../funcs & conts/getWinnerMsg";

import "./Modal.css";
import {
  gamestate,
  SetCurrentTurn,
  SetIsResetGame,
  SetPlayerDetails,
  SetPlayerNum,
  SetWinner,
  SetWinnerDetail,
} from "../../Store/AboutGame";
import { useNavigate } from "react-router";

const Modal = ({ WinnerName = "", WinnerPic = "" }) => {
  const players = useSelector((val: gamestate) => val.About.PlayersDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function resetGame() {
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
    dispatch(SetWinner(false));
  }
  return (
    <div className="Backdrop">
      <div className="Pop">
        <div className="Header">✘</div>
        <div className="Main">
          <span className="Image">
            <img className="Pic" src={WinnerPic} alt="Winner Pic" />
          </span>
          <span className="WinnerBoard">
            <h1>𝕎𝕚𝕟𝕟𝕖𝕣 !!</h1>
            <p>{getWinnerMsg(WinnerName)}</p>
          </span>
        </div>
        <div className="Footer">
          <button
            className="Exitbtn"
            onClick={() => {
              dispatch(SetPlayerNum(0));
              dispatch(SetPlayerDetails([]));
              dispatch(SetCurrentTurn(1));
              dispatch(SetWinner(false));
              dispatch(SetWinnerDetail({}));
              dispatch(SetIsResetGame());
              navigate("/");
            }}
          >
            Exit
          </button>
          <button className="Playbtn" onClick={resetGame}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
