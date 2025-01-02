import { useRef, useState } from "react";
import value from "../../Store/Store.ts";
import "./InfoForm.css";
import { useDispatch } from "react-redux";
import { updatePlayerDetails } from "../../Store/AboutGame.ts";

const InfoForm = () => {
  const [isSelected, setisSelected] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const inputref = useRef("");
  const dispatch = useDispatch();
  const Playersinfo = value.getState().About.PlayersDetails;
  console.log(value.getState().About.PlayersDetails);
  function handleEditBtn(i: number) {
    if (isSelected[i]) {
      dispatch(
        updatePlayerDetails({ id: i, editedValue: inputref.current.value })
      );
      return setisSelected((prev) => ({ ...prev, [i]: !prev[i] }));
    }
    setisSelected((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === String(i);
        return acc;
      }, {});
      console.log(newState);
      return { ...newState };
    });
  }
  return (
    <div className="nameingContainer">
      {Playersinfo.map((player, i: number) => {
        console.log(player);
        return (
          <div className="playerInfo" key={i}>
            {isSelected[i] ? (
              <input
                className="nameInput"
                defaultValue={player?.playerName}
                ref={inputref}
              />
            ) : (
              <span className="editedName">{player?.playerName}</span>
            )}
            <button className="editButton" onClick={() => handleEditBtn(i)}>
              {isSelected[i] ? "✔️" : "✏️"}
            </button>
            <span className="emojiFace"></span>
            <button className="genderBtn">M</button>
            <button className="genderBtn">F</button>
          </div>
        );
      })}
    </div>
  );
};

export default InfoForm;
