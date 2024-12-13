import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import PlayerNames from "./Components/PlayerNames/PlayerNames.tsx";
import GameBoard from "./Components/Maze/GameBoard.tsx";

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
