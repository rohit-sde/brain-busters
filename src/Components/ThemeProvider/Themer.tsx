import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTheme } from "../../Store/AboutGame";

const Themer = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const value = useSelector((state) => state.Theme);
  console.log(value);
  // const style = {};
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          setChecked((p) => !p);
          console.log(checked);
          dispatch(SetTheme(checked));
        }}
      />
    </>
  );
};

export default Themer;
