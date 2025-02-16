// import LeaderBoard from "../../Components/leaderBoard/LeaderBoard.tsx";
import { SetLeaderBoard, SetPlayerDetails } from "../../Store/AboutGame.ts";
import { useDispatch, useSelector } from "react-redux";
import "./GameBoard.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import CurrentPlayer from "./Sections/CurrentPlayer/CurrentPlayer.tsx";
import BoardSetter from "./Sections/BoardSetter/BoardSetter.tsx";
import LiveRanking from "./Sections/LiveRanking/LiveRanking.tsx";
import GridCards from "./Sections/GridCards/GridCards.tsx";
import { emojis } from "../PlayerNames/const/const.ts";

const GameBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playersDetail = useSelector((val) => val.About.PlayersDetails);
  const leaderBoard = useSelector((val) => val.products.LeaderBoard);

  // console.log(playersDetail);
  useEffect(() => {
    if (playersDetail.length === 0) {
      navigate("/");
    }
  });

  if (playersDetail.length !== leaderBoard.length) {
    for (let i = 0; i < playersDetail.length; i++) {
      const player = {
        PlayerName: playersDetail[i].playerName,
        Score: Number("0"),
      };
      dispatch(SetLeaderBoard(player));
    }
  }

  return (
    <div className="GameBoard">
      {/* <LeaderBoard /> */}
      <CurrentPlayer />
      <div className="Lowerpart">
        <LiveRanking />
        <GridCards />
        <BoardSetter />
      </div>
    </div>
  );
};

export default GameBoard;
