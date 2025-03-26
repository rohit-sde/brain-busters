import React, { ReactNode, useEffect, useState } from "react";
import "./NumOfPlayers.css";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import { toast } from "react-toastify";

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
  // useEffect(() => {
  //   clickhandler?.(inputvalue);
  // }, [inputvalue]);
  function handleInput(val: InputEvent) {
    const currentValue = val?.target?.value;
    if (currentValue >= 4 && currentValue <= 8) {
      setInputvalue(Number(currentValue));
      clickhandler?.(Number(currentValue));
      return;
    }
    toast.error("Please type number B/W 4 & 8");
    // setInputvalue((prev) => prev);
    const defltval = currentValue < 4 ? 4 : 8;
    setInputvalue(defltval);
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
        <span className="increDecre">
          <button
            onClick={() => setInputvalue((prev) => prev + 1)}
            disabled={inputvalue >= 8}
          >
            <FaCircleChevronUp />
          </button>
          <button
            onClick={() => setInputvalue((prev) => prev - 1)}
            disabled={inputvalue <= 4}
          >
            <FaCircleChevronDown />
          </button>
        </span>
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
