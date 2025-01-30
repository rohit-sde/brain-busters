import { useEffect, useState } from "react";
import "./CardsEle.css";
import { useDispatch, useSelector } from "react-redux";
import { SetCards } from "../../../../Store/AboutGame";

const CardsEle = () => {
  const [cardType, setCardsType] = useState("ABC");
  const typeOfCards = useSelector((v) => v.Board.Cards.TypeOfCards);
  const dispatch = useDispatch();
  useEffect(() => {
    setCardsType(typeOfCards);
  }, [typeOfCards]);
  // useEffect(() => {
  //   const unsubscribe = value.subscribe(() => {
  //     const cardsType = value.getState().Board.Cards.TypeOfCards;
  //     // console.log(cardsType, "CardsEle");
  //     setCardsType(cardsType);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  function checkTypeOfCards(val: string) {
    if (cardType === val) return true;
  }
  return (
    <div className="CardsEleWrapper">
      <span>
        <button
          className={`${checkTypeOfCards("EMOJIS") && "currentType"}`}
          onClick={() => dispatch(SetCards("EMOJIS"))}
        >
          😁😉
        </button>
        <button
          className={`${checkTypeOfCards("ABC") && "currentType"}`}
          onClick={() => dispatch(SetCards("ABC"))}
        >
          ABC
        </button>
      </span>
      <span>
        <button
          className={`${checkTypeOfCards("NUM") && "currentType"}`}
          onClick={() => dispatch(SetCards("NUM"))}
        >
          123
        </button>
        <button
          className={`${checkTypeOfCards("SHAPES") && "currentType"}`}
          onClick={() => dispatch(SetCards("SHAPES"))}
        >
          ◯◼△
        </button>
      </span>
    </div>
  );
};

export default CardsEle;
