import "./PlayerNames.css";
import InfoForm from "./components/InfoCollectform/InfoCollectForm.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const PlayerNames = () => {
  const navigate = useNavigate();
  const NoOfPlayer = useSelector((v) => v.About.NoOfPlayers);
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
