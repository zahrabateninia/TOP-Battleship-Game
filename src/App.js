import React, { useState } from "react";
import ShipPlacement from "./components/ShipPlacement";
import Game from "./components/Game";
import "./App.css";  // ✅ Import App.css at the top of App.js


function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerBoard, setPlayerBoard] = useState(null);

  const handleStartGame = (board) => {
    setPlayerBoard(board);
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <ShipPlacement onShipsPlaced={handleStartGame} />
      ) : (
        <Game playerBoard={playerBoard} />
      )}
    </div>
  );
}

export default App;
