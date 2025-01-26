import { useDispatch, useSelector } from "react-redux";
import "./InputSection.css";
import { SetCards } from "../../../Store/AboutGame";
import { useState } from "react";

const InputSection = () => {
  const timeforplayers = useSelector((v) =>
    v.About.PlayersDetails.map((ele: object) => ele.time)
  );
  const GridNum = useSelector((v) => v.Board.Cards.GridSize);
  const [time, setTime] = useState(timeforplayers);
  const dispatch = useDispatch();

  function handleGridSize(e: any) {
    dispatch(SetCards(Number(e.target.value)));
  }

  function handleMin(e: object) {
    setTime((prev) => ({ ...prev, min: e.target.value }));
  }

  function handleSec(e: object) {
    setTime((prev) => ({ ...prev, sec: e.target.value }));
  }

  return (
    <div className="InputSectionWrapper">
      <span className="GridSize">
        <label htmlFor="GridSize">Grid Size :- </label>
        <input
          type="number"
          name="GridSize"
          value={GridNum}
          max={7}
          min={2}
          onChange={handleGridSize}
        />
      </span>
      <span className="SetTime">
        <span>
          <label htmlFor="minutes">Min :</label>
          <input
            type="number"
            value={time[0].min}
            onChange={handleMin}
            min={0}
            max={10}
          />
        </span>
        <span>
          <label htmlFor="seconds">Sec :</label>
          <input
            type="number"
            value={time[0].sec}
            onChange={handleSec}
            min={0}
            max={60}
          />
        </span>
      </span>
      <button>Set</button>
    </div>
  );
};

export default InputSection;
