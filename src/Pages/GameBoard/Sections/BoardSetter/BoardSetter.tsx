import InputSection from "../../../../Components/smallcomponents/InputSection/InputSection";
import Reseter from "../../../../Components/smallcomponents/Reseter/Reseter";
import CardsEle from "../../Components/CardsEle/CardsEle";
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
