import { useEffect, useState } from "react";
import value from "../../Store/Store";
import "./GridCards.css";
import handleCardsDetails from "../../funcs/CardsGenerator";

const GridCards = () => {
  const [grid, setgrid] = useState<{
    TypeOfCards: string;
    GridSize: number;
  }>(value.getState().Board.Cards);
  const [cardsArray, setCardsArray] = useState<string[] | number[]>([]);
  useEffect(() => {
    const unsubscribe = value.subscribe(() => {
      const updatedGrid = value.getState().Board.Cards;
      setgrid({ ...updatedGrid });
    });
    setgrid({ ...value.getState().Board.Cards });

    setCardsArray(() => handleCardsDetails(grid?.TypeOfCards, grid?.GridSize));
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div
      className="CardsGrid"
      style={{
        gridTemplateColumns: `repeat(${grid.GridSize / 2},minmax(0,1fr))`,
      }}
    >
      {cardsArray.map((val, i) => {
        return <span key={i}>{val}</span>;
      })}
    </div>
  );
};

export default GridCards;
