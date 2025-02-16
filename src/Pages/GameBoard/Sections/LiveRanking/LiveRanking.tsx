import "./LiveRanking.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "../../Components/PlayerCard/PlayerCard";
import {
  gamestate,
  playerobject,
  SetPlayerDetails,
} from "../../../../Store/AboutGame";
import { emojis } from "../../../PlayerNames/const/const";
import { isNameOfGirl } from "../../../../funcs & conts/checkfuncs";

const LiveRanking = () => {
  const [playersDetail, setPlayersDetail] = useState<playerobject[]>([]);
  const [WindowSize, setWindowSize] = useState(window.innerWidth);
  const CurrentDetails = useSelector(
    (val: gamestate) => val.About.PlayersDetails
  );
  const isResetGame = useSelector((val: gamestate) => val.Board.isResetGame);

  const dispatch = useDispatch();

  useEffect(() => {
    const newDetails = playersDetail.map((val) => ({ ...val, Score: 0 }));
    dispatch(SetPlayerDetails(newDetails));
  }, [isResetGame]);

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

  // console.log(playersDetail, "playersDetail");
  const sortedPlayers = playersDetail?.sort((a, b) => b.Score - a.Score);
  function getRank(position: number) {
    if (position == 1) return "st";
    if (position == 2) return "nd";
    if (position == 3) return "rd";
    return "th";
  }
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
            /> // <div className="playerCard" key={i}>
            //   {WindowSize > 1000 &&
            //     (sortedPlayers.length == 1
            //       ? "Solo"
            //       : `${position}${getRank(position)}`)}
            //   <span
            //     className={`playerImage num${
            //       sortedPlayers.length == 1 ? "" : position
            //     }`}
            //   >
            //     {emojis.includes(player.character) ? (
            //       <span>{player.character}</span>
            //     ) : (
            //       <img src={`${player.character}`} />
            //     )}
            //   </span>
            //   <NameWrapper>{WindowSize > 860 && player.playerName}</NameWrapper>
            // </div>
          );
        })}
      </div>
      {/* <Timer Size={WindowSize} /> */}
    </div>
  );
};

export default LiveRanking;

// console.log(sortedPlayers, "sortedPlayers");

// console.log("-------------------");
// console.log(sortedPlayers[0]?.Score, "Player 0");
// console.log(sortedPlayers[1]?.Score, "Player 1");
// console.log(sortedPlayers[2]?.Score, "Player 2");
// console.log(sortedPlayers[3]?.Score, "Player 3");

// console.log(WindowSize);

// useEffect(() => {
//   function handleResize() {
//     setWindowSize(window.innerWidth);
//   }
//   window.addEventListener("resize", handleResize);
//   const unsubscribe = value.subscribe(() => {
//     const updatedDetails = value.getState().About.PlayersDetails;
//     setPlayersDetail([...updatedDetails]);
//   });
//   setPlayersDetail([...value.getState().About.PlayersDetails]);

//   return () => {
//     unsubscribe();
//     window.removeEventListener("resize", handleResize);
//   };
// }, []);
