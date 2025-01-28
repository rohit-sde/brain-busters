import { useDispatch, useSelector } from "react-redux";
import "./InputSection.css";
import { SetCards, SetPlayerDetails } from "../../../Store/AboutGame";
import { useState } from "react";

const InputSection = () => {
  const playersarray = useSelector((v) => v.About.PlayersDetails);
  const playerstime = playersarray.map((ele: object) => ele.time);
  const GridNum = useSelector((v) => v.Board.Cards.GridSize);
  const [time, setTime] = useState(playerstime);
  const dispatch = useDispatch();

  function handleInputs(e: any, type) {
    let value = parseFloat(e.target.value);
    let min = parseFloat(e.target.getAttribute("min"));
    let max = parseFloat(e.target.getAttribute("max"));

    if (value < min) {
      e.target.value = min;
    } else if (value > max) {
      e.target.value = max;
    }

    if (type == "grid") {
      dispatch(SetCards(Number(e.target.value)));
    } else if (type == "min") {
      setTime((prev) => ({ ...prev, min: e.target.value }));
    } else if (type == "sec") {
      setTime((prev) => ({ ...prev, sec: e.target.value }));
    }
  }

  function handleSetButton() {
    playersarray.forEach((ele: object, i: number) => ({
      ...ele,
      time: time[i],
    }));
    dispatch(SetPlayerDetails(playersarray));
  }
  return (
    <div className="InputSectionWrapper">
      <span className="GridSize">
        <label htmlFor="GridSize">Grid Size :- </label>
        <input
          className="minSecGridInput"
          type="number"
          name="GridSize"
          value={GridNum}
          max={7}
          min={2}
          onChange={(e) => handleInputs(e, "grid")}
        />
      </span>
      <span className="SetTime">
        <span>
          <label htmlFor="minutes">Min :-</label>
          <input
            className="minSecGridInput"
            type="number"
            defaultValue={time[0]?.min}
            onChange={(e) => handleInputs(e, "min")}
            min={0}
            max={10}
          />
        </span>
        <span>
          <label htmlFor="seconds">Sec :-</label>
          <input
            className="minSecGridInput"
            type="number"
            defaultValue={time[0]?.sec}
            onChange={(e) => handleInputs(e, "sec")}
            min={0}
            max={60}
          />
        </span>
      </span>
      <button onClick={handleSetButton}>Set</button>
    </div>
  );
};

export default InputSection;
