import styled from "styled-components";
import CurrentCard from "../../Components/CurrentPlayerCard/CurrentCard";
// import "./CurrentPlayer.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { gamestate } from "../../../../Store/AboutGame";
import Timer from "../../../../Components/Timer/Timer";

interface IPlayersArray {
  id: number;
  playerName: string;
  character: string;
  gender: string;
  Score: number;
  isInput: boolean;
  isLoading: boolean;
}

const CurrentPlayer = () => {
  const [PlayersArray, SetPlayersArray] = useState<IPlayersArray[]>([]);
  const PlayersDetail = useSelector(
    (val: gamestate) => val.About.PlayersDetails
  );
  const PlayersDetails = PlayersDetail.map((plyr) => ({
    ...plyr,
    isLoading: false,
  }));
  const CurrentTurn = useSelector(
    (val: gamestate) => val.About.CurrentTurn - 1
  );

  useEffect(() => {
    SetPlayersArray([...PlayersDetails]);
  }, [PlayersDetail, CurrentTurn]);
  const SortedList = [...PlayersArray]?.sort(
    (a: { Score: number }, b: { Score: number }) => b.Score - a.Score
  );
  // console.log("PlayersArray", PlayersArray);
  // console.log("CurrentTurn", CurrentTurn);
  const currentPlayer: IPlayersArray = PlayersArray?.[CurrentTurn];
  const position = SortedList.findIndex((val) => val == currentPlayer);
  // console.l:og("PlayersArray?.[CurrentTurn]", PlayersArray?.[CurrentTurn].playerName);
  return (
    <StyledWrapper>
      <CurrentCard
        CurrentPlayer={PlayersArray?.[CurrentTurn]}
        position={position + 1}
      />
      <Timer />
    </StyledWrapper>
  );
};

export default CurrentPlayer;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 6px;
  // border: 1px solid white;
  border-radius: 10px;
  margin-bottom: 2rem;
  height: 14%;
  min-height: 100px;
`;
