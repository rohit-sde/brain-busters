import { useEffect, useState } from "react";
import value from "../../Store/Store";
import "./GridCards.css";
import handleCardsDetails from "../../funcs/CardsGenerator";
import { SetCurrentTurn, SetScore } from "../../Store/AboutGame";
import { useDispatch } from "react-redux";

interface grid {
  TypeOfCards: string;
  GridSize: number;
}

const GridCards = () => {
  const [grid, setgrid] = useState<grid>(value.getState().Board.Cards);
  const [isFlipped, setFlipped] = useState<number[]>([]);
  const [isMatched, setIsMatched] = useState<number[]>([]);
  const [cardsArray, setCardsArray] = useState<{ id: number; value: string }[]>(
    []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = value.subscribe(() => {
      const updatedGrid = value.getState().Board.Cards;
      setgrid({ ...updatedGrid });
    });
    setgrid({ ...value.getState().Board.Cards });

    setCardsArray(() => {
      const cards: { id: number; value: string }[] = handleCardsDetails(
        grid?.TypeOfCards,
        grid?.GridSize
      );
      return cards;
    });
    return () => {
      unsubscribe();
    };
  }, []);
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
  function handleFlippedCards(id: number) {
    if (isFlipped.length == 0 && !isMatched.includes(id)) {
      setFlipped([id]);
    }
    if (isFlipped.length == 1 && !isMatched.includes(id)) {
      // console.log(id);
      if (cardMatched(id)) {
        const id2 = isFlipped[0];
        const currentPlayer = value.getState().About.CurrentTurn;
        setIsMatched((prev) => [...prev, id, id2]);
        dispatch(SetScore(currentPlayer));
      }
      setFlipped((prev) => [...prev, id]);
      setTimeout(() => {
        setFlipped([]);
        dispatch(SetCurrentTurn());
      }, 400);
    }
  }
  return (
    <div
      className="CardsGrid"
      style={{
        gridTemplateColumns: `repeat(${grid.GridSize / 2},minmax(0,1fr))`,
      }}
    >
      {cardsArray.map((val) => {
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
            onClick={() => handleFlippedCards(id)}
          >
            {checkisFlipped(id) || checkisMacthed(id) ? val.value : "?"}
          </span>
        );
      })}
    </div>
  );
};

export default GridCards;
