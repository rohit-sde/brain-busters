import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./Themer.css";
import { SetTheme } from "../../../Store/AboutGame";

const Themer = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  // const value = useSelector((state) => state.Theme);
  // console.log(value);
  useEffect(() => {
    document
      .getElementById("root")
      ?.setAttribute("data-theme", `${checked ? "Dark" : "Light"}`);
    return () => document.getElementById("root")?.removeAttribute("data-theme");
  }, [checked]);
  return (
    <>
      <label className="inputHolder">
        <input
          type="checkbox"
          checked={checked}
          style={{ display: "hidden" }}
          onChange={() => {
            setChecked((p) => !p);
            console.log(checked);
            dispatch(SetTheme(checked));
          }}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Themer;
