import { useEffect, useState } from "react";
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
      // const playerDetails = useSelector((state) => state.products.playerDetails);
      const updatedScore = value.getState().About.PlayersDetails;
      const current = value.getState().About.CurrentTurn;
      // console.log(updatedScore);
      setCurrentTurn(current);
      setPlayerDetails([...updatedScore]);
    });
    setPlayerDetails([...value.getState().About.PlayersDetails]);

    return () => {
      unsubscribe();
    };
  }, []);

  // For debugging purposes, let's log the playerDetails
  // console.log("-------------------");
  playerDetails.forEach((player, i) => {
    // console.log(`Player ${i}:`, player.Score);
  });
  function handleTurn(id: number) {
    if (currentTurn == id) {
      return "current";
    }
  }
  return (
    <div className="LeaderBoard">
      {playerDetails?.map((player: object, i: number) => {
        const isthisturn = handleTurn(i);
        return (
          <>
            <div className={isthisturn} key={i}>
              <span>{player.playerName}</span>
              {player.Score < Number(10) && Number(0)}
              {player.Score}
            </div>
            {!(playerDetails.length == i + 1) && <span className="line"></span>}
          </>
        );
      })}
    </div>
  );
};

export default PlayerDetails;
