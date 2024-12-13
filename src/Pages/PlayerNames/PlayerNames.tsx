import value from "../../Store/Store.ts";
import Themer from "../../Components/ThemeProvider/Themer.tsx";

const PlayerNames = () => {
  console.log(value.getState().About.NoOfPlayers);
  console.log(value.getState().Theme);
  return (
    <>
      <div>Hello, There is Nameing Section</div>
      <Themer></Themer>
    </>
  );
};

export default PlayerNames;
