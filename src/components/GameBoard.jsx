import React, { useState } from 'react';
import '../styles/GameBoard.css';


const ships = [
  { name: 'Destroyer', size: 2 },
  { name: 'Submarine', size: 3 },
  { name: 'Battleship', size: 4 },
  { name: 'Carrier', size: 5 },
];

const GameBoard = () => {
  const gridSize = 10; // 10x10 grid
  const [board, setBoard] = useState(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null)));
  const [selectedShip, setSelectedShip] = useState(ships[0]); // Default to first ship
  const [isHorizontal, setIsHorizontal] = useState(true); // Track ship orientation
  const [placedShips, setPlacedShips] = useState([]); // Track placed ships

  const isValidPlacement = (row, col, size) => {
    if (isHorizontal) {
      if (col + size > gridSize) return false; // Out of bounds
      for (let i = 0; i < size; i++) {
        if (board[row][col + i]) return false; // Overlapping check
      }
    } else {
      if (row + size > gridSize) return false; // Out of bounds
      for (let i = 0; i < size; i++) {
        if (board[row + i][col]) return false; // Overlapping check
      }
    }
    return true;
  };

  const placeShip = (row, col) => {
    if (!selectedShip) return; // No ship selected

    if (!isValidPlacement(row, col, selectedShip.size)) {
      alert("Invalid placement!");
      return;
    }

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]); // Create copy
      for (let i = 0; i < selectedShip.size; i++) {
        if (isHorizontal) newBoard[row][col + i] = selectedShip.name;
        else newBoard[row + i][col] = selectedShip.name;
      }
      return newBoard;
    });

    setPlacedShips([...placedShips, selectedShip]); // Add to placed ships
    setSelectedShip(ships[placedShips.length + 1] || null); // Move to next ship
  };

  const renderSquare = (row, col) => (
    <div
      key={`${row}-${col}`}
      className="square"
      onClick={() => placeShip(row, col)}
      style={{
        width: '30px',
        height: '30px',
        border: '1px solid #ccc',
        backgroundColor: board[row][col] ? 'gray' : 'white',
        cursor: 'pointer',
      }}
    />
  );

  return (
    <div>
      <h2>Game Board</h2>
      <p>Selected Ship: {selectedShip ? selectedShip.name : "All ships placed!"}</p>
      <button onClick={() => setIsHorizontal(!isHorizontal)}>
        Toggle Orientation ({isHorizontal ? 'Horizontal' : 'Vertical'})
      </button>
      <div className="game-board" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 30px)`, gap: '2px' }}>
        {board.flatMap((row, rowIndex) =>
          row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
