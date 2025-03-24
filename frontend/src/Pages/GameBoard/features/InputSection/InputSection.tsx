import { useDispatch, useSelector } from "react-redux";
import "./InputSection.css";
import { useEffect, useState } from "react";
import {
  gamestate,
  SetCards,
  SetPlayerDetails,
} from "../../../../Store/AboutGame";

const InputSection = () => {
  const playersDetails = useSelector((v: gamestate) => v.About.PlayersDetails);
  const GridNum = useSelector((v: gamestate) => v.Board.Cards.GridSize);
  const isPlayStart = useSelector((v: gamestate) => v.Board.isPlayStart);

  const [playersArray, SetPlayersArray] = useState([...playersDetails]);
  const playerstime = playersArray.map((ele) => ele.time);
  const [time, setTime] = useState(playerstime);
  const dispatch = useDispatch();

  function handleInputs(e: React.ChangeEvent<HTMLInputElement>, type: string) {
    // const targeted = e.target as HTMLInputElement;
    const value = parseFloat(e.target.value);
    const min = parseFloat(e.target.getAttribute("min") ?? "");
    const max = parseFloat(e.target.getAttribute("max") ?? "");

    if (value < min) {
      e.target.value = String(min);
    } else if (value > max) {
      e.target.value = String(max);
    }

    if (type == "grid") {
      dispatch(SetCards(value));
    } else if (type == "min") {
      setTime((prev) => prev.map((val) => ({ ...val, min: value })));
    } else if (type == "sec") {
      setTime((prev) => prev.map((val) => ({ ...val, sec: value })));
    }
  }
  // console.log("min", time[0].min);
  // console.log("sec", time[0].sec);

  function handleSetButton() {
    SetPlayersArray((prev) =>
      prev.map((val, i) => ({ ...val, time: time[i] }))
    );
  }

  useEffect(() => {
    dispatch(
      SetPlayerDetails(
        playersDetails.map((val, i) => ({ ...val, time: playersArray[i].time }))
      )
    );
  }, [playersArray]);
  return (
    <div className="InputSectionWrapper">
      <span className="GridSize">
        <label htmlFor="GridSize">Grid Size :</label>
        <input
          className="minSecGridInput"
          type="number"
          name="GridSize"
          value={GridNum}
          disabled={isPlayStart}
          onChange={(e) => handleInputs(e, "grid")}
          max={7}
          min={2}
        />
      </span>
      <h4 className="subHeading">Fair Time Allocation</h4>
      <span className="SetTime">
        <span>
          <label htmlFor="minutes">Min :</label>
          <input
            className="minSecGridInput"
            name="minutes"
            type="number"
            defaultValue={time[0]?.min}
            disabled={isPlayStart}
            onChange={(e) => handleInputs(e, "min")}
            min={0}
            max={10}
          />
        </span>
        <span>
          <label htmlFor="seconds">Sec :</label>
          <input
            className="minSecGridInput"
            name="seconds"
            type="number"
            defaultValue={time[0]?.sec}
            onChange={(e) => handleInputs(e, "sec")}
            disabled={isPlayStart}
            min={0}
            max={59}
          />
        </span>
      </span>
      <button onClick={handleSetButton} disabled={isPlayStart}>
        Set
      </button>
    </div>
  );
};

export default InputSection;
