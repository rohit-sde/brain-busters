import { useEffect, useState } from "react";
import value from "../../Store/Store";
import "./GridCards.css";

const GridCards = () => {
  const [grid, setgrid] = useState<{
    TypeOfCards: string;
    GridSize: number;
  }>();
  useEffect(() => {
    const unsubscribe = value.subscribe(() => {
      const updatedGrid = value.getState().Board.Cards;
      setgrid({ ...updatedGrid });
    });
    setgrid({ ...value.getState().Board.Cards });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="CardsGrid">
      {Array(grid?.GridSize)
        .fill("null")
        .map((card, i) => {
          return (
            <span key={i}>
              {Array(grid?.GridSize)
                .fill("null")
                .map((card, k) => {
                  return <span key={k}>{card}</span>;
                })}
            </span>
          );
        })}
    </div>
  );
};

export default GridCards;
