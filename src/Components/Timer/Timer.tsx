import "./Timer.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gamestate,
  SetLeftTime,
  SetPlayerDetails,
} from "../../../Store/AboutGame";

const Timer = ({ Size = 801 }: { Size?: number }) => {
  const dispatch = useDispatch();

  const players = useSelector((state: gamestate) => state.About.PlayersDetails);
  const currentPlayerId = useSelector(
    (state: gamestate) => state.About.CurrentTurn
  );
  const isPlayStart = useSelector(
    (state: gamestate) => state.Board.isPlayStart
  );
  const isResetGame = useSelector(
    (state: gamestate) => state.Board.isResetGame
  );

  // console.log("render..", Math.floor(Math.random() * 100));
  const currentPlayer = players?.find(
    (player) => player.id === currentPlayerId
  );

  const [currentId, setCurrentId] = useState<number>(currentPlayerId);
  const [min, setMin] = useState<number>(currentPlayer?.time?.min); // Minutes for the current player
  const [sec, setSec] = useState<number>(currentPlayer?.time?.sec); // Seconds for the current player
  const [isRunning, setIsRunning] = useState(false);

  // console.log(isPlayStart);

  // Start the timer when the turn starts
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (sec === 0) {
          // If seconds reach 59, increment minute and reset seconds
          setMin((prevMin) => prevMin - 1);
          setSec(59);
        } else {
          // Otherwise just increment seconds
          setSec((prevSec) => prevSec - 1);
        }
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval when the component unmounts or turn changes
    }
  }, [isRunning, sec]);

  function nextTurn() {
    const Time = { min: min, sec: sec };
    // console.log("hi", Time, currentId);
    dispatch(SetLeftTime({ currentPlayerId: currentId, Time }));

    // Reset the timer for the next turn
    setIsRunning(false);
    setMin(0); // Reset minutes for the next player
    setSec(0); // Reset seconds for the next player
  }

  useEffect(() => {
    if (currentId !== currentPlayerId) {
      nextTurn();
      setCurrentId(currentPlayerId);
    }
  }, [currentPlayerId]);

  // Start the timer when the turn changes to the current player
  useEffect(() => {
    if (currentPlayerId !== null) {
      setMin(currentPlayer?.time.min); // Set the minutes to the current player's stored minutes
      setSec(currentPlayer?.time.sec); // Set the seconds to the current player's stored seconds
      if (isPlayStart) {
        setIsRunning(true); // Start the timer
        return;
      }
      setIsRunning(false); // Start the timer
    }
  }, [currentPlayerId, currentPlayer?.time, isPlayStart, isResetGame]);

  useEffect(() => {
    if (!isResetGame) {
      SetPlayerDetails(
        players.map((val, i) => ({ ...val, time: { min: 5, sec: 30 } }))
      );
    }
  }, [isResetGame]);

  function isClassAdd() {
    if (currentPlayer?.time.min === 0 && currentPlayer?.time.sec < 10)
      if (currentPlayer.time.sec < 3) {
        return "shake";
      } else {
        return "near-timeup";
      }
  }

  return (
    <div>
      <div className={`timer ${isClassAdd()}`}>
        {Size > 800 && (
          <span>
            0{min} : {sec < 10 && "0"}
            {sec}
          </span>
        )}
        {Size < 800 && (
          <span>
            <div>0{min}</div>
            <div>
              {sec < 10 && "0"}
              {sec}
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default Timer;
