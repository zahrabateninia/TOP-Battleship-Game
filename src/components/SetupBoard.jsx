// Allows the player to place their ships manually. It has a "Start Game" button to move to the game phase.

// Main Component
// Handles game state (whether we are in "Setup" or "Playing").
// Switches between SetupBoard and GameBoard.

import React, { useState } from "react";
import Gameboard from "../modules/gameboard"; // Your gameboard logic
import "../styles/SetupBoard.css";

const ships = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Cruiser", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Destroyer", length: 2 },
];

const SetupBoard = ({ onStartGame }) => {
  const [playerBoard] = useState(new Gameboard());
  const [shipsPlaced, setShipsPlaced] = useState([]);
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [direction, setDirection] = useState("horizontal");

  const handleCellClick = (row, col) => {
    if (currentShipIndex >= ships.length) {
      alert("All ships are already placed!");
      return;
    }

    const ship = ships[currentShipIndex]; // Get the current ship
    let shipCoordinates = [];

    // Ensure the ship fits within the grid before placing
    if (direction === "horizontal") {
      if (col + ship.length > 10) {
        alert("Ship doesn't fit horizontally!");
        return;
      }
      shipCoordinates = Array.from({ length: ship.length }, (_, i) => [row, col + i]);
    } else {
      if (row + ship.length > 10) {
        alert("Ship doesn't fit vertically!");
        return;
      }
      shipCoordinates = Array.from({ length: ship.length }, (_, i) => [row + i, col]);
    }

    // Try placing the ship on the board
    const result = playerBoard.placeShip(ship.length, [row, col], direction);
    if (typeof result !== "string") {
      setShipsPlaced([...shipsPlaced, { ...ship, coordinates: shipCoordinates }]);
      setCurrentShipIndex(currentShipIndex + 1); // Move to the next ship
    } else {
      alert(result); // Show error message if placement is invalid
    }
  };

  const handleStartGame = () => {
    if (shipsPlaced.length === ships.length) {
      onStartGame(playerBoard);
    } else {
      alert(`Place all ${ships.length} ships before starting!`);
    }
  };

  return (
    <div className="setup-board">
      <h2>Place Your Ships</h2>
      {currentShipIndex < ships.length && <h3>Placing: {ships[currentShipIndex].name} ({ships[currentShipIndex].length})</h3>}
      
      {/* Grid */}
      <div className="grid">
        {[...Array(10)].map((_, row) => (
          <div key={row} className="row">
            {[...Array(10)].map((_, col) => (
              <div
                key={col}
                className={`cell ${shipsPlaced.some(ship => ship.coordinates.some(([r, c]) => r === row && c === col)) ? "ship" : ""}`}
                onClick={() => handleCellClick(row, col)}
              >
                {/* Show placed ships */}
                {shipsPlaced.some(ship => ship.coordinates.some(([r, c]) => r === row && c === col)) ? "🚢" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Direction Toggle */}
      <button onClick={() => setDirection(direction === "horizontal" ? "vertical" : "horizontal")}>
        Direction: {direction}
      </button>

      {/* Start Game Button */}
      <button onClick={handleStartGame} disabled={shipsPlaced.length < ships.length}>
        Start Game
      </button>
    </div>
  );
};

export default SetupBoard;
