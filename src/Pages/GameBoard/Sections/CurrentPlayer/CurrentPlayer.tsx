import Timer from "../../../../Components/smallcomponents/Timer/Timer";
import CurrentCard from "../../Components/CurrentPlayerCard/CurrentCard";
import "./CurrentPlayer.css";

const CurrentPlayer = () => {
  return (
    <div className="currentPlayerWrapper">
      <CurrentCard />
      <Timer />
    </div>
  );
};

export default CurrentPlayer;
