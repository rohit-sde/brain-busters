import { Fragment, useState } from "react";
import "./InfoForm.css";
import { useDispatch, useSelector } from "react-redux";
import { SetPlayerDetails } from "../../../../Store/AboutGame.ts";
import { useNavigate } from "react-router";
import EditorSlip from "../EditorSlip/EditorSlip.tsx";
import NextButton from "../../../../Components/NextButton/NextButton.tsx";

interface Player {
  playerName: string;
  isInput: boolean;
  character: string | null;
  gender: "M" | "F";
  isLoading: boolean;
}

const InfoForm = () => {
  const PlayersDetails: Player[] = useSelector((v) => v.About.PlayersDetails);
  const [playersinfo, setPlayersinfo] = useState<Player[]>(PlayersDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNextPage() {
    dispatch(SetPlayerDetails(playersinfo));
    navigate("/PlayerNameing/GameBoard");
  }

  return (
    <Fragment>
      <div className="nameingContainer">
        {playersinfo?.map((player: Player, i: number) => {
          return (
            <EditorSlip
              key={i}
              index={i}
              value={player}
              setPlayersinfo={setPlayersinfo}
            />
          );
        })}
      </div>
      <NextButton
        isactive={true}
        value="Let's Go   ➤"
        buttonHandler={handleNextPage}
      />
    </Fragment>
  );
};
{
  /* <button className="LetGoBtn" onClick={handleNextPage}>
  Let's Go <span>➙</span>
</button> */
}

export default InfoForm;
