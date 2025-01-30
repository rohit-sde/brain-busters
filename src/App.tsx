import "./App.css";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import PlayerNames from "./Pages/PlayerNames/PlayerNames.tsx";
import GameBoard from "./Pages/GameBoard/GameBoard.tsx";
import Themer from "./Components/smallcomponents/ThemeProvider/Themer.tsx";
// import CustomTheme from "./Components/smallcomponents/customThemer/CustomTheme.tsx";

function App() {
  return (
    <>
      <span className="themesWrapper">
        <Themer />
        {/* <CustomTheme /> */}
      </span>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PlayerNameing" element={<PlayerNames />} />
            <Route path="/PlayerNameing/GameBoard" element={<GameBoard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
