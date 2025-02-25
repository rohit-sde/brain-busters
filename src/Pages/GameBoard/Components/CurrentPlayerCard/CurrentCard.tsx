import styled from "styled-components";
import "./CurrentCard.css";
import Loader from "../../../../Components/loader/Loader";

interface IPlayersDetails {
  id: number;
  playerName: string;
  character: string;
  gender: string;
  Score: number;
  isInput: boolean;
  isLoading: boolean;
}

interface Iprops {
  CurrentPlayer: IPlayersDetails;
  position: number;
}

const CurrentCard = ({ CurrentPlayer, position }: Iprops) => {
  return (
    <StyledContainer>
      <ImageSpan>
        {CurrentPlayer?.character.length == 0 ? (
          <Loader />
        ) : (
          <PlayerImage src={CurrentPlayer?.character} />
        )}
      </ImageSpan>
      <WrapperDeatails>
        <NameSpan>{CurrentPlayer?.playerName}</NameSpan>
        <NumericSpan>
          Position. {position}
          {position == 1
            ? "st"
            : position == 2
            ? "nd"
            : position == 3
            ? "rd"
            : ""}
        </NumericSpan>
        <NumericSpan>Score. {CurrentPlayer?.Score}</NumericSpan>
      </WrapperDeatails>
    </StyledContainer>
  );
};

export default CurrentCard;

const StyledContainer = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: space-evenly;
  // border: 1px solid aquamarine;
  border-radius: 20px;
  width: 28%;
  height: 100%;
  // overflow: hidden;
`;

const ImageSpan = styled.span`
  // border: 1px solid var(--secondary-20);
  box-shadow: 0px 0px 8px 0.7px var(--secondary-20);
  height: 80px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  margin: auto;
  border-radius: 80px;
`;

const PlayerImage = styled.img`
  // object-fit: cover;
  height: 100%;
  width: 100%;
`;

const WrapperDeatails = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 0.9;
`;

const NameSpan = styled.span`
  display: inline-block;
  text-align: center;
  margin: 5px 0px;
  padding: 2px 5px;
  border-radius: 20px;
  background-color: var(--secondary-20);
  width: 100%;
`;

const NumericSpan = styled.span`
  text-align: center;
  // border: 1px solid white;
`;
