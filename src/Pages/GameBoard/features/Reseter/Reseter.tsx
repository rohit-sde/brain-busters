import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  gamestate,
  SetIsPlayStart,
  SetIsResetGame,
  SetPlayerDetails,
  SetPlayerNum,
} from "../../../../Store/AboutGame";
import { useNavigate } from "react-router";

const Reseter = () => {
  const isPlayStart = useSelector((v: gamestate) => v.Board.isPlayStart);

  console.log(isPlayStart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function buttonHandler(v: object) {
    const text = v.target.innerText;
    if (text == "Reset") dispatch(SetIsResetGame());
    if (text == "Play") dispatch(SetIsPlayStart());
    if (text == "🏠") {
      dispatch(SetPlayerNum(0));
      dispatch(SetPlayerDetails([]));
      navigate("/");
    }
  }
  return (
    <WrapperDiv>
      <StylButton onClick={buttonHandler} disabled={!isPlayStart}>
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
  border: none;
  box-shadow: 0px 0px 0.5px 0.5px var(--secondary-20);
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
