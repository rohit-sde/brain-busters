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
};

export default CustomTheme;

// Colors Combinations provided by chatgpt

// i want diffrent color combinations 5 for each dark and light theme . here's is a variables which i used [data-theme="Light"] {
//   --primary-30: #a89e47;
//   --secondary-20: #c99b50;
//   --bg-color: #f5f5dc;
//   --text-color: black;
//   --font-weight: 600;
// }

// [data-theme="Dark"] {
//   --primary-30: #8a8a60;
//   --secondary-20: #d0a15d;
//   --bg-color: #2c2f2b;
//   --text-color: #f0f0f0;
//   --font-weight: 500;
// }
// ChatGPT said:
// ChatGPT
// Here are five different color combinations for both light and dark themes, with variations on primary and secondary colors to create different moods:

// Light Theme Variations:
// Soft Pastels

// css
// Copy
// [data-theme="Light"] {
//   --primary-30: #a89e47;  /* Olive Green */
//   --secondary-20: #f2a7b2; /* Light Pink */
//   --bg-color: #f5f5dc;     /* Beige */
//   --text-color: #4f4f4f;   /* Dark Grey */
//   --font-weight: 600;
// }
// Earthy Tones

// css
// Copy
// [data-theme="Light"] {
//   --primary-30: #7e702a;   /* Dark Olive Green */
//   --secondary-20: #9f9a6d;  /* Sage Green */
//   --bg-color: #f9f3d4;     /* Light Beige */
//   --text-color: #3d3d3d;    /* Charcoal Grey */
//   --font-weight: 600;
// }
// Vibrant Contrast

// css
// Copy
// [data-theme="Light"] {
//   --primary-30: #e96f35;  /* Vibrant Orange */
//   --secondary-20: #3e8e41; /* Rich Green */
//   --bg-color: #f5f5dc;     /* Beige */
//   --text-color: #2b2b2b;    /* Dark Grey */
//   --font-weight: 600;
// }
// Muted Blues

// css
// Copy
// [data-theme="Light"] {
//   --primary-30: #5979b1;  /* Muted Blue */
//   --secondary-20: #a2c8e3; /* Soft Sky Blue */
//   --bg-color: #f5f5dc;     /* Beige */
//   --text-color: #333333;   /* Dark Grey */
//   --font-weight: 600;
// }
// Warm Sunset

// css
// Copy
// [data-theme="Light"] {
//   --primary-30: #c49f68;   /* Warm Tan */
//   --secondary-20: #db5c4d;  /* Coral Red */
//   --bg-color: #f5f5dc;      /* Beige */
//   --text-color: #3c3c3c;    /* Charcoal Grey */
//   --font-weight: 600;
// }
// Dark Theme Variations:
// Classic Minimal

// css
// Copy
// [data-theme="Dark"] {
//   --primary-30: #8a8a60;   /* Olive Grey */
//   --secondary-20: #b8b07b;  /* Soft Olive Yellow */
//   --bg-color: #2c2f2b;      /* Dark Charcoal */
//   --text-color: #f0f0f0;    /* Off White */
//   --font-weight: 500;
// }
// Deep Ocean

// css
// Copy
// [data-theme="Dark"] {
//   --primary-30: #4c8a94;   /* Ocean Blue */
//   --secondary-20: #8d9d9f;  /* Dusty Grey */
//   --bg-color: #2c2f2b;      /* Dark Charcoal */
//   --text-color: #e0f0f3;    /* Light Cyan */
//   --font-weight: 500;
// }
// Rich Burgundy

// css
// Copy
// [data-theme="Dark"] {
//   --primary-30: #6e1f32;   /* Deep Burgundy */
//   --secondary-20: #9b6b4c;  /* Warm Brown */
//   --bg-color: #2c2f2b;      /* Dark Charcoal */
//   --text-color: #f0e0e0;    /* Light Beige */
//   --font-weight: 500;
// }
// Teal & Copper

// css
// Copy
// [data-theme="Dark"] {
//   --primary-30: #3b7373;   /* Deep Teal */
//   --secondary-20: #cf7e5e;  /* Copper Brown */
//   --bg-color: #2c2f2b;      /* Dark Charcoal */
//   --text-color: #d4e0d0;    /* Light Greenish */
//   --font-weight: 500;
// }
// Mystic Purple

// css
// Copy
// [data-theme="Dark"] {
//   --primary-30: #5e3f74;   /* Dark Purple */
//   --secondary-20: #9a7da6;  /* Soft Lavender */
//   --bg-color: #2c2f2b;      /* Dark Charcoal */
//   --text-color: #e6d8f4;    /* Light Lavender */
//   --font-weight: 500;
// }
// Each combination is designed to fit a different aesthetic, from earthy and natural tones to vibrant contrasts and more subdued, calming colors. Let me know if you need any adjustments or additional themes!
