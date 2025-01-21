import CardsEle from "../smallcomponents/CardsEle/CardsEle";
import InputSection from "../smallcomponents/InputSection/InputSection";
import Reseter from "../smallcomponents/Reseter/Reseter";
import "./BoardSetter.css";

const BoardSetter = () => {
  return (
    <div className="boardSetter">
      <CardsEle />
      <InputSection />
      <Reseter />
    </div>
  );
};

export default BoardSetter;
