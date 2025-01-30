import { useEffect, useState } from "react";
import {
  useDispatch,
  // useSelector
} from "react-redux";

import "./Themer.css";
import { SetTheme } from "../../Store/AboutGame";

const Themer = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  // const value = useSelector((state) => state.Theme.state);
  // console.log("value", value);
  // console.log("checked", checked);
  useEffect(() => {
    document
      .getElementById("root")
      ?.setAttribute("data-theme", `${checked ? "dark" : "light"}`);
    dispatch(SetTheme(checked ? "dark" : "light"));
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
          }}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Themer;
