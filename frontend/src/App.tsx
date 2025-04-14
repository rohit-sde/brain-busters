import "./App.css";
import Home from "./Pages/Home/Home.tsx";
import { BrowserRouter, data, Route, Routes } from "react-router";
import PlayerNames from "./Pages/PlayerNames/PlayerNames.tsx";
import GameBoard from "./Pages/GameBoard/GameBoard.tsx";
import Themer from "./Theme/ThemeProvider/Themer.tsx";
import CustomTheme from "./Theme/customThemer/CustomTheme.tsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.address);
        })
        .catch(() => {
          console.log("Error to getting location");
        });
    });
  }, []);
  return (
    <>
      <span className="themesWrapper">
        <Themer />
        <CustomTheme />
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
