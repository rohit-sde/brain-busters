import LeaderBoard from "../../Components/leaderBoard/LeaderBoard.tsx";
import { SetLeaderBoard } from "../../Store/AboutGame.ts";
import { useDispatch } from "react-redux";
import value from "../../Store/Store.ts";
import "./GameBoard.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import LiveRanking from "../../Components/LiveRanking/LiveRanking.tsx";
import GridCards from "../../Components/GridCards/GridCards.tsx";
import BoardSetter from "../../Components/BoardSetter/BoardSetter.tsx";

const GameBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playersDetail = value.getState().About.PlayersDetails;
  const leaderBoard = value.getState().products.LeaderBoard;
  console.log(playersDetail);
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
      <LeaderBoard />
      <div className="Lowerpart">
        <LiveRanking />
        <GridCards />
        <BoardSetter />
      </div>
    </div>
  );
};

export default GameBoard;
