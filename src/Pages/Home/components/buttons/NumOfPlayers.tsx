import { useEffect, useState } from "react";
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
  playerCount = 0,
  clickhandler,
}: arguments) => {
  const [inputvalue, setInputvalue] = useState(4);
  // console.log(playerCount);
  useEffect(() => {
    clickhandler?.(inputvalue);
  }, [inputvalue]);
  function handleInput(val: object) {
    const currentValue = val?.target?.value;
    if (currentValue >= 4 && currentValue <= 8) {
      setInputvalue(Number(currentValue));
      // console.log("val.target.value", currentValue);
      // console.log("inputvalue", inputvalue);
      return;
    }
    setInputvalue((prev) => prev);
  }
  if (isInput) {
    return (
      <div
        className={`noOfPlayers ${playerCount > 3 ? "active" : ""}`}
        onClick={() => clickhandler?.(inputvalue)}
      >
        Custom no.
        <input
          className="playerNumInput"
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
      onClick={() => clickhandler?.(value)}
    >
      Player{value == 1 ? " " : "s "}
      {value}
    </div>
  );
};

export default NumOfPlayers;
