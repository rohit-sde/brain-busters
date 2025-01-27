import "./NextButton.css";

interface arguments {
  value: string;
  buttonHandler: () => void;
  playerCount: number;
}

const NextButton = ({ value, buttonHandler, playerCount }: arguments) => {
  return (
    <button
      className={`NextButton${playerCount !== 0 ? "active" : ""}`}
      onClick={buttonHandler}
      disabled={playerCount === 0}
    >
      {value}
    </button>
  );
};

export default NextButton;
