import { useEffect, useState } from "react";
import "./CardsEle.css";
import { useDispatch, useSelector } from "react-redux";
import { gamestate, SetCards } from "../../../../Store/AboutGame";
import CateBtn from "../CategoryBtn/CateBtn";
import { CardTypes } from "../../../../funcs & conts/conts";

const CardsEle = () => {
  const isPlayStart = useSelector((val: gamestate) => val.Board.isPlayStart);

  const [currentType, setCurrentType] = useState<{
    id: number;
    val: string;
    type: string;
  }>(CardTypes[0]);

  const typeOfCards = useSelector((v: gamestate) => v.Board.Cards.TypeOfCards);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentType(typeOfCards);
  }, [typeOfCards]);

  function typeChager() {
    dispatch(SetCards(CardTypes[(currentType.id + 1) % CardTypes.length]));
  }

  return (
    <div className="CardsEleWrapper">
      <p>Choose your cardsType</p>
      <CateBtn act={isPlayStart} func={typeChager}>
        {currentType.val}
      </CateBtn>
    </div>
  );
};

export default CardsEle;
