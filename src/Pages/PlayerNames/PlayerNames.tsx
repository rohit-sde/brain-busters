import "./PlayerNames.css";
import value from "../../Store/Store.ts";
import InfoForm from "../../Components/InfoCollectform/InfoForm.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const PlayerNames = () => {
  // console.log(value.getState().About.NoOfPlayers);
  // console.log(value.getState().Theme);
  const NoOfPlayer = value.getState().About.NoOfPlayers;
  const navigate = useNavigate();
  useEffect(() => {
    if (NoOfPlayer === 0) {
      navigate(-1);
    }
  }, []);
  return (
    <div className="outterLayer">
      <InfoForm />
    </div>
  );
};

export default PlayerNames;
