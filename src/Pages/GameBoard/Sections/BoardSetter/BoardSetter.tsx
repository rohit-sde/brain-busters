import Reseter from "../../features/Reseter/Reseter";
import CardsEle from "../../Components/CardsEle/CardsEle";
import InputSection from "../../features/InputSection/InputSection";
import { useSelector } from "react-redux";
import { gamestate } from "../../../../Store/AboutGame";
import Backdrop from "../../../../Components/Backdrop/Backdrop";

const BoardSetter = () => {
  const isPlayStart = useSelector((v: gamestate) => v.Board.isPlayStart);

  const styles = {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "10px",
    alignItems: "center",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    zIndex: 3,
  };
  return (
    <div style={styles}>
      {isPlayStart && <Backdrop />}
      <CardsEle />
      <InputSection />
      <Reseter />
    </div>
  );
};

export default BoardSetter;
