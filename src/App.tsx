import "./App.css";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import PlayerNames from "./Pages/PlayerNames/PlayerNames.tsx";
import GameBoard from "./Pages/Maze/GameBoard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PlayerNameing" element={<PlayerNames />} />
        <Route path="/GameBoard" element={<GameBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
