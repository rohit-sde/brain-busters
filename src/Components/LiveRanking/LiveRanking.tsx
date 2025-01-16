import "./LiveRanking.css";
import value from "../../Store/Store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetScore } from "../../Store/AboutGame";
import Timer from "../smallcomponents/Timer/Timer";

const LiveRanking = () => {
  const [playersDetail, setPlayersDetail] = useState<object[]>([]);
  const [WindowSize, setWindowSize] = useState(window.innerWidth);
  const dispatch = useDispatch();
  // console.log(WindowSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    const unsubscribe = value.subscribe(() => {
      const updatedDetails = value.getState().About.PlayersDetails;
      setPlayersDetail([...updatedDetails]);
    });
    setPlayersDetail([...value.getState().About.PlayersDetails]);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(playersDetail, "playersDetail");
  const sortedPlayers = [...playersDetail].sort((a, b) => b.Score - a.Score);
  function getRank(position) {
    if (position == 1) return "st";
    if (position == 2) return "nd";
    if (position == 3) return "rd";
    return "th";
  }
  // console.log(sortedPlayers, "sortedPlayers");

  // console.log("-------------------");
  // console.log(sortedPlayers[0]?.Score, "Player 0");
  // console.log(sortedPlayers[1]?.Score, "Player 1");
  // console.log(sortedPlayers[2]?.Score, "Player 2");
  // console.log(sortedPlayers[3]?.Score, "Player 3");
  return (
    <div
      className="container"
      style={{ width: `${WindowSize < 800 ? "fit-content" : ""}` }}
    >
      <div className="ranker">
        {sortedPlayers?.map((player, i) => {
          const position = i + 1;
          return (
            <div className="playerCard" key={i}>
              {WindowSize > 1000 &&
                (sortedPlayers.length == 1
                  ? "Solo"
                  : `${position}${getRank(position)}`)}
              <span
                className={`num${sortedPlayers.length == 1 ? "" : position}`}
                onClick={() => dispatch(SetScore(player.id))}
              >
                <img src={`${player.character}`} />
              </span>
              {WindowSize > 800 && player.playerName}
            </div>
          );
        })}
      </div>
      <Timer Size={WindowSize} />
    </div>
  );
};

export default LiveRanking;
