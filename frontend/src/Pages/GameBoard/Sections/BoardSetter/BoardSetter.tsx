import Reseter from "../../features/Reseter/Reseter";
import CardsEle from "../../Components/CardsEle/CardsEle";
import InputSection from "../../features/InputSection/InputSection";
import { useSelector } from "react-redux";
import { gamestate } from "../../../../Store/AboutGame";
import Backdrop from "../../../../Components/Backdrop/Backdrop";

const BoardSetter = () => {
  const isPlayStart = useSelector((v: gamestate) => v.Board.isPlayStart);

  return (
    <div className="boardSetter">
      {isPlayStart && <Backdrop>{""}</Backdrop>}
      <CardsEle />
      <InputSection />
      <Reseter />
    </div>
  );
};

export default BoardSetter;
