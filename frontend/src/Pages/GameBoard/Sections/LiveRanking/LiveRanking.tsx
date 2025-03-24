import "./LiveRanking.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "../../Components/PlayerCard/PlayerCard";
import {
  gamestate,
  playerobject,
  SetWinnerDetail,
} from "../../../../Store/AboutGame";

const LiveRanking = () => {
  const [playersDetail, setPlayersDetail] = useState<playerobject[]>([]);
  const [WindowSize, setWindowSize] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const CurrentDetails = useSelector(
    (val: gamestate) => val.About.PlayersDetails
  );
  const isWin = useSelector((value: gamestate) => value.Winner.Winner);

  useEffect(() => {
    setPlayersDetail([...CurrentDetails]);
  }, [CurrentDetails]);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sortedPlayers = playersDetail?.sort((a, b) => b.Score - a.Score);

  useEffect(() => {
    if (isWin) {
      const Winner = sortedPlayers[0];
      // console.log(Winner);
      dispatch(
        SetWinnerDetail({
          WinnerName: Winner?.playerName,
          WinnerPic: Winner?.character,
        })
      );
    }
  }, [isWin]);

  return (
    <div
      className="container"
      style={{ width: `${WindowSize < 800 ? "fit-content" : ""}` }}
    >
      <div className="ranker">
        {sortedPlayers?.map((player, i) => {
          const position = i + 1;
          return (
            <PlayerCard
              key={i}
              WindowSize={WindowSize}
              sortedPlayers={sortedPlayers}
              position={position}
              player={player}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LiveRanking;
