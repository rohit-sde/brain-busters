import "./App.css";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import PlayerNames from "./Pages/PlayerNames/PlayerNames.tsx";
import GameBoard from "./Pages/Maze/GameBoard.tsx";
import Themer from "./Components/ThemeProvider/Themer.tsx";

function App() {
  return (
    <>
      <Themer />
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PlayerNameing" element={<PlayerNames />} />
            <Route path="/GameBoard" element={<GameBoard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
