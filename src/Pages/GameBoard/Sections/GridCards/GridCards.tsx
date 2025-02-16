import { useCallback, useEffect, useState } from "react";
import "./GridCards.css";
import handleCardsDetails from "../../funcs & conts/CardsGenerator";
import { SetCurrentTurn, SetScore } from "../../Store/AboutGame";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

interface grid {
  TypeOfCards: string;
  GridSize: number;
}

const GridCards = () => {
  const updatedCardSetting = useSelector((state) => state.Board.Cards);
  const currentPlayer = useSelector((state) => state.About.CurrentTurn);
  const isPlayStart = useSelector((state) => state.Board.isPlayStart);
  const isResetGame = useSelector((state) => state.Board.isResetGame);

  const [grid, setgrid] = useState<grid>(updatedCardSetting);
  const [isFlipped, setFlipped] = useState<number[]>([]);
  const [isMatched, setIsMatched] = useState<number[]>([]);
  const [cardsArray, setCardsArray] = useState<{ id: number; value: string }[]>(
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (updatedCardSetting !== grid) {
      setgrid(updatedCardSetting);
    }
    setIsMatched([]);
    setFlipped([]);
    setCardsArray(() => {
      const cards: { id: number; value: string }[] = handleCardsDetails(
        grid?.TypeOfCards,
        grid?.GridSize
      );
      return cards;
    });
  }, [updatedCardSetting, grid]);
  function checkisFlipped(id: number) {
    return isFlipped.includes(id);
  }
  function checkisMacthed(id: number) {
    return isMatched.includes(id);
  }
  function cardMatched(id: number) {
    const index = cardsArray.findIndex((ele) => ele.id == id);
    const index2 = cardsArray.findIndex((ele) => ele.id == isFlipped[0]);
    if (cardsArray[index].value === cardsArray[index2].value) return true;
    return false;
  }
  const handleFlippedCards = useCallback(
    function handleFlippedCard(id: number) {
      if (isFlipped.length == 0 && !isMatched.includes(id)) {
        setFlipped([id]);
      }
      if (isFlipped.length == 1 && !isMatched.includes(id)) {
        // console.log(id);
        if (cardMatched(id)) {
          const id2 = isFlipped[0];
          setIsMatched((prev) => [...prev, id, id2]);
          dispatch(SetScore(currentPlayer));
        }
        setFlipped((prev) => [...prev, id]);
        setTimeout(() => {
          setFlipped([]);
          dispatch(SetCurrentTurn());
        }, 400);
      }
    },
    [isFlipped]
  );

  useEffect(() => {
    setFlipped([]);
    setIsMatched([]);
  }, [isResetGame]);

  return (
    <div
      className="CardsGrid"
      style={{
        gridTemplateColumns: `repeat(${grid?.GridSize},minmax(0,1fr))`,
        gridTemplateRows: `repeat(${grid?.GridSize},minmax(0,1fr))`,
      }}
    >
      {cardsArray?.map((val) => {
        // console.log(val);
        const id = val.id;
        return (
          <span
            key={val.id}
            className={`card ${
              checkisFlipped(id)
                ? "flipped"
                : checkisMacthed(id)
                ? "macthed"
                : ""
            }`}
            // aria-disabled={isPlayStart}
            onClick={() => {
              if (isFlipped[0] !== id || !isMatched.find(id))
                handleFlippedCards(id);
            }}
          >
            {checkisFlipped(id) || checkisMacthed(id) ? val.value : "?"}
          </span>
        );
      })}
      {grid.GridSize == 3 || grid.GridSize == 5 || grid.GridSize == 7 ? (
        <BoxSpan>o</BoxSpan>
      ) : (
        ""
      )}
    </div>
  );
};

export default GridCards;

const BoxSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  /* border: 1px solid white; */
  background-color: var(--primary-30);
  border: none;
  width: 100%;
  font-size: 1.5rem;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
`;
