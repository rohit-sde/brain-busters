import { useState } from "react";
import "./NumOfPlayers.css";

interface arguments {
  value: number;
  isInput?: boolean;
  playerCount?: number;
  clickhandler?: (val: number) => void;
}

const NumOfPlayers = ({
  value,
  isInput = false,
  playerCount,
  clickhandler,
}: arguments) => {
  const [inputvalue, setInputvalue] = useState(4);
  // console.log(playerCount);
  function handleInput(val: object) {
    if (val.target.value >= 4 && val.target.value <= 8) {
      setInputvalue(val.target.value);
      console.log("val.target.value", val.target.value);
      console.log("inputvalue", inputvalue);
      clickhandler(inputvalue);
      return;
    }
    setInputvalue((prev) => prev);
  }
  if (isInput) {
    return (
      <div
        className={`noOfPlayers ${playerCount > 3 ? "active" : ""}`}
        onClick={() => clickhandler(inputvalue)}
      >
        Custom no.
        <input
          type="number"
          max={8}
          min={4}
          value={inputvalue}
          onChange={handleInput}
        />
      </div>
    );
  }
  return (
    <div
      className={`noOfPlayers ${playerCount == value ? "active" : ""}`}
      onClick={() => clickhandler(value)}
    >
      Player{value == 1 ? " " : "s "}
      {value}
    </div>
  );
};

export default NumOfPlayers;
