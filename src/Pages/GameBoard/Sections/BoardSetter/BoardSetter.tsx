import Reseter from "../../features/Reseter/Reseter";
import CardsEle from "../../Components/CardsEle/CardsEle";
import "./BoardSetter.css";
import InputSection from "../../features/InputSection/InputSection";

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
