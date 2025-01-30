import { useSelector } from "react-redux";
import "./CustomTheme.css";
import Circle from "./circleComponent/Circle";
import { useEffect, useState } from "react";
import { darkColors } from "./const/darkColors";
import { lightColors } from "./const/lightColors";

const CustomTheme = () => {
  const theme = useSelector((state) => state.Theme.state);
  const [isExpanded, setIsExpanded] = useState(false);
  const [colors, setColors] = useState(darkColors);
  useEffect(() => {
    // console.log(theme);
    // console.log(colors.theme);
    setColors((prev) => (prev.theme == "light" ? darkColors : lightColors));
  }, [theme]);
  return (
    <div className={`customThemer ${isExpanded ? "expand" : ""}`}>
      <button
        className={`arrow ${isExpanded ? "isExpanded" : ""}`}
        onClick={() => setIsExpanded((p) => !p)}
      >
        {"<"}
      </button>
      {colors.colors.map((colors) => (
        <Circle colors={colors} />
      ))}
    </div>
  );
  //   return <div className="customThemer">d</div>;
};

export default CustomTheme;
