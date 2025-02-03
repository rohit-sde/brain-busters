import { useSelector } from "react-redux";
import "./Timer.css";

const Timer = ({ Size = 801 }: { Size?: number }) => {
  const CurrentPlayer = useSelector((val) => val.About.CurrentTurn - 1);
  const Time = useSelector(
    (val) => val.About.PlayersDetails[CurrentPlayer].time
  );
  console.log(Time);
  return (
    <div className="timer">
      {Size > 800 && (
        <span>
          0{Time?.min} : {Time?.sec}
        </span>
      )}
      {Size < 800 && (
        <span>
          <div>0{Time?.min}</div>
          <div>{Time?.sec}</div>
        </span>
      )}
    </div>
  );
};

export default Timer;
