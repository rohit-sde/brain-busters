import { Fragment, useEffect, useState } from "react";
import value from "../../Store/Store.ts";
import "./LeaderBoard.css";
interface playerobject {
  Score: number;
  character: string;
  gender: string;
  id: number;
  isInput: boolean;
  isLoading: boolean;
  playerName: string;
}

const PlayerDetails = () => {
  const [playerDetails, setPlayerDetails] = useState<playerobject[]>([]);
  const [currentTurn, setCurrentTurn] = useState<number>(1);
  // console.log(playerDetails);
  useEffect(() => {
    const unsubscribe = value.subscribe(() => {
      const updatedScore = value.getState().About.PlayersDetails;
      const current = value.getState().About.CurrentTurn;
      setCurrentTurn(current);
      setPlayerDetails([...updatedScore]);
    });
    setPlayerDetails([...value.getState().About.PlayersDetails]);

    return () => {
      unsubscribe();
    };
  }, []);
  function handleTurn(id: number) {
    if (currentTurn == id) {
      return "currentTurn";
    }
    return "";
  }
  return (
    <div className="LeaderBoard">
      {playerDetails?.map((player: playerobject, i: number) => {
        const isthisturn = handleTurn(i + 1);
        return (
          <Fragment key={i}>
            <div className={isthisturn}>
              <span>{player.playerName}</span>
              {player.Score < Number(10) && Number(0)}
              {player.Score}
            </div>
            {!(playerDetails.length == i + 1) && <span className="line"></span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default PlayerDetails;
