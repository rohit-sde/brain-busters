import { getWinnerMsg } from "../../funcs & conts/getWinnerMsg";
import "./Modal.css";

const Modal = ({ WinnerName = "", WinnerPic = "" }) => {
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
          <button className="Exitbtn">Exit</button>
          <button className="Playbtn">Play Again</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
