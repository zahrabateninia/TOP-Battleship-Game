// Allows the player to place their ships manually. It has a "Start Game" button to move to the game phase.

// Main Component
// Handles game state (whether we are in "Setup" or "Playing").
// Switches between SetupBoard and GameBoard.

import React, { useState } from "react";
import Gameboard from "../modules/gameboard"; // Using our module
import "../styles/SetupBoard.css";

const SetupBoard = ({ onStartGame }) => {
  const [playerBoard] = useState(new Gameboard()); // Create player board
  const [shipsPlaced, setShipsPlaced] = useState([]);
  const [currentShip, setCurrentShip] = useState({ length: 3, direction: "horizontal" });

  const handleCellClick = (row, col) => {
    const result = playerBoard.placeShip(currentShip.length, [row, col], currentShip.direction);
    if (typeof result !== "string") {
      setShipsPlaced([...shipsPlaced, { length: currentShip.length, position: [row, col] }]);
    } else {
      alert(result); // Show error message if placement is invalid
    }
  };

  const handleStartGame = () => {
    if (shipsPlaced.length === 5) { //Ensure 5 ships placed
      onStartGame(playerBoard);
    } else {
      alert("Place all ships before starting the game!");
    }
  };

  return (
    <div className="setup-board">

      <h2>Place Your Ships</h2>
      <div className="grid">
        {[...Array(10)].map((_, row) => (
          <div key={row} className="row">
            {[...Array(10)].map((_, col) => (
              <div
                key={col}
                className="cell"
                onClick={() => handleCellClick(row, col)}
              >
                {/* Highlight placed ships */}
                {shipsPlaced.some(ship => ship.position[0] === row && ship.position[1] === col) ? "🚢" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleStartGame} disabled={shipsPlaced.length < 5}>Start Game</button>
    </div>
  );
};

export default SetupBoard;
