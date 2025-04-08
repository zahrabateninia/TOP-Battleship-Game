import React, { useState } from "react";

const ShipPlacement = ({ onStartGame }) => {
  const [selectedShip, setSelectedShip] = useState(null);
  const [shipPositions, setShipPositions] = useState([]);
  const [orientation, setOrientation] = useState("horizontal");
  const [shipsUsed, setShipsUsed] = useState([]);
  const [board, setBoard] = useState(
    Array(10)
      .fill(null)
      .map(() => Array(10).fill(null)) // Create a 10x10 board
  );

  const ships = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
  ];

  const handleCellClick = (row, col) => {
    if (selectedShip && !shipsUsed.includes(selectedShip.name)) {
      const shipLength = selectedShip.length;
      let positions = [];

      for (let i = 0; i < shipLength; i++) {
        if (orientation === "horizontal") {
          if (col + i >= 10) return; // Prevent overflow
          positions.push([row, col + i]);
        } else if (orientation === "vertical") {
          if (row + i >= 10) return; // Prevent overflow
          positions.push([row + i, col]);
        }
      }

      // Check if the positions overlap with any existing ships
      for (let pos of positions) {
        if (board[pos[0]][pos[1]] !== null) {
          return; // Cell is already occupied
        }
      }

      // Place the ship
      const newBoard = [...board];
      for (let pos of positions) {
        newBoard[pos[0]][pos[1]] = selectedShip.name;
      }

      setBoard(newBoard);
      setShipPositions([...shipPositions, positions]);
      setShipsUsed([...shipsUsed, selectedShip.name]);
      setSelectedShip(null); // Deselect ship
    }
  };

  const handleShipSelect = (ship) => {
    if (!shipsUsed.includes(ship.name)) {
      setSelectedShip(ship);
    }
  };

  const handleOrientationToggle = () => {
    setOrientation(orientation === "horizontal" ? "vertical" : "horizontal");
  };

  const handleStartGame = () => {
    if (shipsUsed.length === 5) {
      const structuredShips = shipPositions.map((positions, idx) => ({
        name: shipsUsed[idx],
        position: positions,
      }));
      onStartGame(structuredShips); // Send ship info to the game
    } else {
      alert("Please place all 5 ships before starting the game!");
    }
  };
  

  return (
    <div className="app-container">
      <h2>Ship Placement</h2>
      <div className="ship-selection">
        <h3>Select a ship</h3>
        {ships.map((ship) => (
          <button
            key={ship.name}
            onClick={() => handleShipSelect(ship)}
            disabled={shipsUsed.includes(ship.name)}
            className={`ship-button ${shipsUsed.includes(ship.name) ? 'disabled' : ''}`}
          >
            {ship.name} ({ship.length} spaces)
          </button>
        ))}
      </div>
      <div className="orientation-toggle">
        <h3>Orientation: {orientation}</h3>
        <button onClick={handleOrientationToggle} className="ship-button">
          Toggle Orientation
        </button>
      </div>
      <div className="boards-container">
        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`cell ${cell ? 'ship-cell' : ''}`}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <button
          onClick={handleStartGame}
          disabled={shipsUsed.length !== 5}
          className="start-game-button"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default ShipPlacement;
