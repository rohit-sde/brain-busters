import "./NextButton.css";

interface arguments {
  value: string;
  buttonHandler: () => void;
  isactive?: boolean;
}

const NextButton = ({ value, buttonHandler, isactive }: arguments) => {
  return (
    <button
      className={`NextButton${isactive ? "active" : ""}`}
      onClick={buttonHandler}
    >
      {value}
    </button>
  );
};

export default NextButton;
