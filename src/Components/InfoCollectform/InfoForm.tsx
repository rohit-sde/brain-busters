import value from "../../Store/Store.ts";
import "./InfoForm.css";

const InfoForm = () => {
  const NoOfPlayer = value.getState().About.NoOfPlayers;
  return (
    <div className="nameingContainer">
      {Array(NoOfPlayer)
        .fill(null)
        .map((_, i) => {
          return (
            <div className="playerInfo" key={i}>
              <input className="nameInput" placeholder={`Player ${i}`} />
              <button className="EditButton">✏️</button>
              <span></span>
              <button>M</button>
              <button>F</button>
            </div>
          );
        })}
    </div>
  );
};

export default InfoForm;
