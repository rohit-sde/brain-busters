import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  gamestate,
  SetCurrentTurn,
  SetIsPlayStart,
  SetIsResetGame,
  SetPlayerDetails,
  SetPlayerNum,
} from "../../../../Store/AboutGame";
import { useNavigate } from "react-router";

const Reseter = () => {
  const isPlayStart = useSelector((v: gamestate) => v.Board.isPlayStart);
  const players = useSelector((v: gamestate) => v.About.PlayersDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function buttonHandler(v: object) {
    const text = v.target.innerText;
    if (text == "Reset") {
      dispatch(
        SetPlayerDetails(
          players.map((val) => ({
            ...val,
            Score: 0,
            time: { min: 5, sec: 30 },
          }))
        )
      );
      dispatch(SetCurrentTurn(1));
      dispatch(SetIsResetGame());
    }
    if (text == "Play") dispatch(SetIsPlayStart());
    if (text == "🏠") {
      dispatch(SetPlayerNum(0));
      dispatch(SetPlayerDetails([]));
      dispatch(SetCurrentTurn(1));
      navigate("/");
    }
  }
  return (
    <WrapperDiv>
      <StylButton
        onClick={buttonHandler}
        style={{ zIndex: isPlayStart ? 2 : 0 }}
        disabled={!isPlayStart}
      >
        Reset
      </StylButton>
      <StylButton onClick={buttonHandler} disabled={isPlayStart}>
        Play
      </StylButton>
      <HomeButton onClick={buttonHandler} disabled={isPlayStart}>
        🏠
      </HomeButton>
    </WrapperDiv>
  );
};

export default Reseter;

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  // border: 1px solid rgb(252, 58, 90);
  height: 40%;
  width: 100%;
`;

const StylButton = styled.button`
  background-color: transparent;
  border: 0.2px solid var(--secondary-20);
  box-shadow: 0px 1px 10px -2px var(--secondary-20);
  cursor: pointer;
  color: var(--text-color);
  border-radius: 8px;
  width: 75%;
  aspect-ratio: 4/1;
  transition: all 0.3s;
  &:hover {
    // transform: scale(1.1);
    background-color: var(--secondary-20);
  }
`;

const HomeButton = styled.button`
  background-color: transparent;
  border: none;
  box-shadow: 0px 0px 0.5px 1.8px var(--secondary-20);
  cursor: pointer;
  color: var(--text-color);
  border-radius: 40px;
  width: 35%;
  min-width: 40px;
  aspect-ratio: 2/1;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.15);
    background-color: var(--secondary-20);
  }
`;
