import React, { useState } from "react";
import ShipPlacement from "./components/ShipPlacement";
import Game from "./components/Game";
import "./App.css";  

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerBoard, setPlayerBoard] = useState(null); // This will hold the player's board

  // This function will be triggered after the ships are placed
  const handleStartGame = (board) => {
    setPlayerBoard(board);  // Save the board when the player starts the game
    setGameStarted(true);    // Set the game to start
  };

  return (
    <div>
      {!gameStarted ? (
        <ShipPlacement onStartGame={handleStartGame} />  // Pass handleStartGame to ShipPlacement
      ) : (
        <Game playerBoard={playerBoard} />  // Pass the player's board to the Game component
      )}
    </div>
  );
}

export default App;


// Note:
// conditionally render ShipPlacement or GameComponent depending on whether the game has started or not. 
// When the ships are placed, the onStartGame callback will pass the board to the parent,
// which will trigger the game phase. (we have two phases: ship placement phase and game phase)