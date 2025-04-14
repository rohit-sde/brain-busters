import { ReactNode } from "react";
import "../CardsEle/CardsEle.css";

interface prop {
  children: ReactNode;
  func: () => void;
  act: boolean;
}

const CateBtn = ({ children, func, act }: prop) => {
  return (
    <button disabled={act} onClick={func} className="SelectorBtn">
      {children}
    </button>
  );
};

export default CateBtn;
